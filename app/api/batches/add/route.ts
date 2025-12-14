import { BatchStatus, BirdBreeds } from "@/app/generated/prisma/enums";
import { errorResponse, response } from "@/lib/apiResponse";
import { generateBatchId, getLastBatchNumber } from "@/lib/batch-utils";
import { throwError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server"; // Use NextResponse for proper response object
import { z } from "zod"; // Import Zod

// Define the expected shape of the BirdBreeds enum for Zod
// This creates a Zod Enum schema from your imported enum values.
const BirdBreedsSchema = z.enum(Object.values(BirdBreeds));

// This schema defines the structure for a single object within the suppliers array.
const SupplierSchema = z.object({
    id: z.uuid("Supplier ID must be a valid UUID."), // Assuming IDs are UUIDs

    quantity: z
        .number({
            message: "Supplier quantity must be a number.",
        })
        .int("Supplier quantity must be a whole number.")
        .positive("Supplier quantity must be greater than zero."),

    unitPrice: z
        .number({
            message: "Supplier unit price must be a number.",
        })
        .positive("Supplier unit price must be greater than zero."),
    deliveryDate: z
        .string()
        .datetime({
            message: "Delevery date must be a valid ISO 8601 date string.",
        })
        .pipe(z.coerce.date()), // Coerce the string into a Date object
    qualityScore: z
        .number({
            message: "Chicks quality score must be a number.",
        })
        .int("Chicks quality score must be a whole number.")
        .refine(
            (val) => val >= 0 && val <= 10,
            "Chicks quality score must be in between 0 to 10"
        ),
});

// --- Define the Zod Validation Schema ---
const BatchSchema = z.object({
    // 1. Initial Weight (Number)
    initChicksAvgWT: z
        .number()
        .catch(() => {
            throw new Error("Initial average weight must be a number.");
        })
        .refine(
            (val) => val > 0,
            "Initial average weight must be greater than zero."
        ),

    // 2. Initial Quantity (Integer)
    initialQuantity: z
        .number()
        .catch(() => {
            throw new Error("Initial quantity must be a number.");
        })
        .refine(
            (val) => Number.isInteger(val),
            "Initial quantity must be a whole number (integer)."
        )
        .refine(
            (val) => val > 0,
            "Initial quantity must be greater than zero."
        ),

    // 3. Breed (Enum)
    breed: BirdBreedsSchema.refine(
        (val) => Object.values(BirdBreeds).includes(val),
        {
            message: "Invalid 'breed' field. Must be a recognized bird breed.",
        }
    ),

    // 4. Starting Date (Date) - Strict ISO 8601 Check and Coercion
    // 4a. Ensures the input string is a valid ISO 8601 format.
    // 4b. .pipe(z.coerce.date()) converts the validated string into a JS Date object.
    startingDate: z
        .string()
        .datetime({
            message: "Starting date must be a valid ISO 8601 date string.",
        })
        .pipe(z.coerce.date()), // Coerce the string into a Date object
    // 5. suppliers (Array of SupplierSchema)
    suppliers: z
        .array(SupplierSchema)
        .min(
            1,
            "The 'suppliers' array cannot be empty. At least one supplier is required."
        ),
});

// Zod Type Inference (for type safety in the function body)
// type ValidBatchData = z.infer<typeof BatchSchema>;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        console.log(body);

        const runningBatches = await prisma.batches.findMany({
            where: {
                status: BatchStatus.RUNNING
            },
            select: {
                id: true
            }
        })
        if (runningBatches.length > 1){
            throwError({
                message: "Farm is running in full capacity. Can't add more batch",
                statusCode: 400
            })
        }

        // --- Execute Zod Validation ---
        // .parse() will throw a ZodError if validation fails.
        const validatedData = BatchSchema.parse(body);

        // Zod has coerced validatedData.starting_date into a Date object,
        // allowing direct comparison.
        if (validatedData.startingDate > new Date()) {
            // Zod's .superRefine() could also handle this, but an explicit check
            // here is fine for complex logic.
            throwError({
                message:
                    "Invalid 'starting_date'. Cannot start a batch in the future.",
                statusCode: 400,
            });
        }
        const startingDate = validatedData.startingDate;
        const EXPECTED_DAYS = 60; // Define the constant here
        // Create a *copy* of the startingDate object to manipulate
        const expectedSellingDate = new Date(startingDate);

        // Get the current day of the month, add 60 days to it, and set the new date.
        // JavaScript automatically handles month and year rollovers (e.g., adding 60 days to Dec 15 rolls over to Feb 13).
        expectedSellingDate.setDate(startingDate.getDate() + EXPECTED_DAYS);

        validatedData.suppliers.map(async (sup) => {
            const supplier = await prisma.suppliers.findFirst({
                where: {
                    id: sup.id,
                },
            });
            if (!supplier) {
                throwError({
                    message: "Invalid supplier id",
                    statusCode: 400,
                });
            }
        });

        const farmCode = "F01";
        const sectorCode = "POU";
        const productCode = validatedData.breed.slice(0, 3);
        const lastBatchNo = await getLastBatchNumber(farmCode, sectorCode);
        const batch_id = generateBatchId(
            farmCode,
            sectorCode,
            productCode,
            lastBatchNo
        );

        await prisma.$transaction(async (tx) => {
            const newBatch = await tx.batches.create({
                data: {
                    batch_id,
                    breed: validatedData.breed,
                    starting_date: new Date(validatedData.startingDate),
                    init_chicks_avg_wt: validatedData.initChicksAvgWT,
                    initial_quantity: validatedData.initialQuantity,
                    farm_code: farmCode,
                    product_code: productCode,
                    sector_code: sectorCode,
                    expected_selling_date: expectedSellingDate,
                },
            });

            await Promise.all(
                validatedData.suppliers.map((sup) =>
                    tx.batchSuppliers.create({
                        data: {
                            batch_id: newBatch.id,
                            supplier_id: sup.id,
                            quantity: sup.quantity,
                            price_per_chicks: sup.unitPrice,
                            quality_score: sup.qualityScore,
                            delivery_date: new Date(sup.deliveryDate),
                        },
                    })
                )
            );
        });

        return response({
            message: "Successfully batch created!",
        });
    } catch (error) {
        console.log(error);
        return errorResponse(error);
    }
}

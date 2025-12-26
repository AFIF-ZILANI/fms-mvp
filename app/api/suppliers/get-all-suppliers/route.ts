import { SupplierSupplyCategories } from "@/app/generated/prisma/enums";
import { errorResponse, response } from "@/lib/apiResponse";
import { throwError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    // 1. Get the URL object from the request
    const url = new URL(req.url);

    // 2. Access search parameters using the built-in 'searchParams' property
    try {
        const category = url.searchParams.get(
            "category"
        ) as keyof typeof SupplierSupplyCategories;
        if (!Object.values(SupplierSupplyCategories).includes(category)) {
            throwError({
                message: "Invalid supplier category",
                statusCode: 400,
            });
        }
        const suppliers = await prisma.suppliers.findMany({
            where: {
                type: {
                    hasSome: [SupplierSupplyCategories[category]],
                },
            },
            select: {
                id: true,
                profile: {
                    select: {
                        name: true,
                    },
                },
                company: true,
            },
        });
        console.log(suppliers);

        if (!suppliers.length) {
            throwError({
                message: "No suppliers Data found",
                statusCode: 404,
            });
        }

        const data: { id: string; name: string; company?: string }[] = [];
        suppliers.map((val) =>
            data.push({
                id: val.id,
                name: val.profile.name,
                company: val.company ? val.company : undefined,
            })
        );

        return response({
            message: "successfully fetch supplers data",
            data,
        });
    } catch (error) {
        return errorResponse(error);
    }
}

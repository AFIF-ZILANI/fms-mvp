import { errorResponse, response } from "@/lib/apiResponse";
import { throwError } from "@/lib/error";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const suppliers = await prisma.suppliers.findMany({
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

        if (!suppliers.length) {
            throwError({
                message: "No suppliers Data found",
                statusCode: 404,
            });
        }

        return response({
            message: "successfully fetch supplers data",
            data: suppliers,
        });
    } catch (error) {
        return errorResponse(error);
    }
}

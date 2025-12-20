import { errorResponse, response } from "@/lib/apiResponse";
import prisma from "@/lib/prisma";
import { addHouseSchema } from "@/schemas/house.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body)
        const data = addHouseSchema.parse(body);

        const newHouse = await prisma.houses.create({
            data: {
                type: data.type,
                name: data.name,
                number: data.houseNumber,
            },
        });

        return response({
            message: "House created successfully",
            data: newHouse,
        });
    } catch (error) {
        return errorResponse(error);
    }
}

import { UserRole } from "@/app/generated/prisma/enums";
import { errorResponse, response } from "@/lib/apiResponse";
import { throwError } from "@/lib/error";
import prisma from "@/lib/prisma";
import { addAdminProfileSchema } from "@/schemas/admin.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = addAdminProfileSchema.parse(body);

        await prisma.$transaction(async (tx) => {
            const isEmailAlreadyExist = await tx.profiles.findFirst({
                where: {
                    email: data.email,
                },
            });

            if (isEmailAlreadyExist) {
                throwError({
                    message: "Emaild already used",
                });
            }

            const profile = await tx.profiles.create({
                data: {
                    name: data.name,
                    mobile: data.mobile,
                    address: data.address,
                    email: data.email,
                    // avatar: {
                    //     connect: {
                    //         id: "",
                    //     },
                    // },
                    role: UserRole.ADMIN,
                },
            });

            await tx.admins.create({
                data: {
                    profile: {
                        connect: {
                            id: profile.id,
                        },
                    },
                },
            });
        });
        return response({
            message: "Admin added successfully!",
        });
    } catch (error) {
        return errorResponse(error);
    }
}

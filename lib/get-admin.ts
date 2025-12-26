import prisma from "./prisma";

export async function GetAdminID() {
    const data = await prisma.admins.findFirst({
        where: {
            profile: {
                name: "AFIF ZILANI",
            },
        },
        include: {
            profile: {
                select: {
                    id: true,
                },
            },
        },
    });

    return data?.profile.id;
}

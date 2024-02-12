import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'

export async function POST(request: Request) {
    const fields = await request.json();

    let errors: Record<string, string> = {};

    if (!fields.name || fields.name.trim() === '') {
        errors.name = 'Name cannot be empty.';
    }

    if (!fields.email || !/^\S+@\S+\.\S+$/.test(fields.email)) {
        errors.email = 'Invalid email address.';
    }

    const prisma = new PrismaClient();

    if (await prisma.users.findUnique({
        where: {
            email: fields.email,
        },
    })) {
        errors.email = "A user with that email already exists";
    }

    if (!fields.password || fields.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
    }

    if (fields.password !== fields.repassword) {
        errors.repassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
        const encodedErrors = JSON.stringify(errors);
        return new Response(encodedErrors, {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const newUser = await prisma.users.create({
        data: {
            email: fields.email,
            name: fields.name,
        },
    });

    const hash = bcrypt.hashSync(fields.password, 10);

    await prisma.credentials.create({
      data: {
        user_id: newUser.id,
        authtype: "password",
        passwordhash: hash,
      },
    });

    redirect("/login");
}

import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    // TODO enforce type safety with prisma or something
    const fields = await request.json();

    // Initialize an errors object
    let errors = {};

    // Validate name (e.g., must not be empty)
    if (!fields.name || fields.name.trim() === '') {
        errors.name = 'Name cannot be empty.';
    }

    // Validate email (basic validation for example purposes)
    if (!fields.email || !/^\S+@\S+\.\S+$/.test(fields.email)) {
        errors.email = 'Invalid email address.';
    }

    const userExists = (await sql`select * from users where email = ${fields.email}`)['rows'];
    

    if (userExists.length > 0) {
        errors.email = "A user with that email already exists";
    }

    // Validate password (e.g., length)
    if (!fields.password || fields.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
    }

    // Validate repassword (must match password)
    if (fields.password !== fields.repassword) {
        errors.repassword = 'Passwords do not match.';
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
        // Serialize and encode the errors object
        const encodedErrors = JSON.stringify(errors);

        // Return response with errors in headers
        return new Response(encodedErrors, {
            status: 400, // 400 Bad Request is more appropriate here
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    console.log("syntax error");
    const currentTimestamp = new Date().toISOString();

    const newUser = await sql`INSERT INTO users (email, name, AuthType, CreatedAt, UpdatedAt) VALUES
    (${fields.email}, ${fields.name}, ${"Credential"}, ${currentTimestamp}, ${currentTimestamp})
    RETURNING UserId`;

    const newUserId = newUser.rows[0]["userid"];
    const hash = bcrypt.hashSync(fields.password, 10);

    await sql`INSERT INTO credentials (UserId, passwordhash, CreatedAt) VALUES
    (${newUserId}, ${hash}, ${currentTimestamp})
    `

    console.log("second");

    redirect("/login");
}

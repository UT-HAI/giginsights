import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name cannot be empty."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    repassword: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match.",
    path: ["repassword"], // This shows which field the error is associated with
  });

export async function POST(request: Request) {
  const fields = await request.json();

  let validation = registerSchema.safeParse(fields);

  if (!validation.success) {
    // Convert ZodError into a more friendly format
    let errors: Record<string, string> = {};
    validation.error.errors.forEach((error) => {
      errors[error.path[0]] = error.message;
    });

    return new Response(JSON.stringify(errors), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const validatedData = validation.data;

  const prisma = new PrismaClient();

  // Check if user exists
  if (
    await prisma.users.findUnique({
      where: {
        email: validatedData.email,
      },
    })
  ) {
    return new Response(
      JSON.stringify({ email: "A user with that email already exists" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  // Create the user
  const newUser = await prisma.users.create({
    data: {
      email: validatedData.email,
      name: validatedData.name,
    },
  });

  // Hash the password
  const hash = bcrypt.hashSync(validatedData.password, 10);

  // Create credentials record
  await prisma.credentials.create({
    data: {
      user_id: newUser.id,
      authtype: "password",
      passwordhash: hash,
    },
  });

  // Redirect to login
  redirect("/login");
}

import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const surveySchema = z.object({
  age: z.coerce
    .number()
    .int()
    .min(18, "Must be over 18")
    .max(99, "Must be under 99"),
  gender: z.string(),
  race: z.string(),
  ethnicity: z.string(),
  income: z.string(),
});

export async function POST(request: Request) {
  // @ts-ignore
  const session = await getServerSession({ request });
  const email = session?.user?.email;
  const body = await request.json();
  const validation = surveySchema.safeParse(body);
  if (!validation.success) {
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

  if (!email) {
    throw new Error("Email not found");
  }

  const data = validation.data;

  const prisma = new PrismaClient();
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return new Response(null, {
      status: 500,
    });
  }

  await prisma.profiles.upsert({
    where: {
      user_id: user.id,
    },
    update: {
      age: data.age,
      gender: data.gender,
      race: data.race,
      ethnicity: data.ethnicity,
      income: data.income,
    },
    create: {
      user_id: user.id,
      age: data.age,
      gender: data.gender,
      race: data.race,
      ethnicity: data.ethnicity,
      income: data.income,
    },
  });

  return new Response(null, {
    status: 200,
  });
}

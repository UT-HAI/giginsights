import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  // @ts-ignore
  const session = await getServerSession({ request });
  const email = session?.user?.email;
  console.log("email", email);
  const body = await request.json();
  console.log(body);

  return new Response(null, {
    status: 200,
  });
}

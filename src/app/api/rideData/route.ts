import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const prisma = new PrismaClient();
  const bytes = await file.arrayBuffer();
  const path = `/rideData/${file.name}`;
  const blob = await put(path, bytes, { access: "public" });

  // @ts-ignore
  const session = await getServerSession({ request });
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ success: false });
  }

  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ success: false });
  }

  await prisma.files.upsert({
    where: {
      user_id: user.id,
    },
    update: {
      ride_data: blob.downloadUrl,
    },
    create: {
      user_id: user.id,
      ride_data: blob.downloadUrl,
    },
  });

  return NextResponse.json({ success: true });
}

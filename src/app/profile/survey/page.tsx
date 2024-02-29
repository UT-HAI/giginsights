import SurveyForm from "@/app/components/SurveyForm";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

async function getSurveyData() {
  // @ts-ignore
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) {
    throw new Error("Email not found");
  }

  const prisma = new PrismaClient();
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    console.error("User missing in get survey data, something is wrong here");
    return {};
  }

  const data =
    (await prisma.profiles.findFirst({
      where: {
        user_id: user.id,
      },
    })) ?? {};

  return data;
}

export default async function Page() {
  const data = await getSurveyData();
  return <SurveyForm prepopulatedData={data}></SurveyForm>;
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function status(request, response) {
  const result = await prisma.$queryRawUnsafe(`SELECT 1 + 1 as sum`);

  console.log(result);

  response
    .status(200)
    .json({ message: "Aprender no curso.dev me torna acima da média" });
}

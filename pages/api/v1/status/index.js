import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function status(request, response) {
  let varNotUsed;
  const updatedAt = new Date().toISOString();

  const databaseServerVersion =
    await prisma.$queryRawUnsafe(`SHOW server_version;`);

  const databaseMaxConnections = await prisma.$queryRawUnsafe(
    `SHOW max_connections;`,
  );

  const databaseOpenedConnections = await prisma.$queryRawUnsafe(
    `SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';`,
  );

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseServerVersion[0].server_version,
        max_connections: parseInt(databaseMaxConnections[0].max_connections),
        opened_connections: databaseOpenedConnections[0].count,
      },
    },
  });
}

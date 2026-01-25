import { PrismaClient } from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalPrismaClient = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalPrismaClient.prisma || new PrismaClient({
  adapter: new PrismaPg(new Pool({
    connectionString: process.env.DATABASE_URL,
  })),
});

if (process.env.NODE_ENV !== "production") {
  globalPrismaClient.prisma = prisma;
}

export default async function dbConfig(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Could not connect to database", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

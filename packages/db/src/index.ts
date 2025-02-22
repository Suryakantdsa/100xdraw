// // import { PrismaClient } from "@prisma/client";

// // export const prismaClient = new PrismaClient();
// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// // eslint-disable-next-line
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

// const prismaClient = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prismaClient;

// if (process.env.NODE_ENV !== "production")
//   globalForPrisma.prisma = prismaClient;
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient = globalThis.prisma ?? prismaClientSingleton();

export default prismaClient;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

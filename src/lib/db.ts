import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getTodos = async () => {
  return await prisma.todo.findMany();
}

const DBClient = {
  getTodos,
}

export {
  DBClient,
};

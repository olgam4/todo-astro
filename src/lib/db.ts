import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getTodos = async () => {
  return await prisma.todo.findMany();
}

const saveTodo = async (todo: any) => {
  return await prisma.todo.create({
    data: {
      content: todo,
    }
  })
}

const DBClient = {
  getTodos,
  saveTodo,
}

export {
  DBClient,
};

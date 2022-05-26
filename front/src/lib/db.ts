import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getTodos = async () => {
  return await prisma.todo.findMany();
}

const deleteTodo = async (id: number) => {
  const data = await prisma.todo.delete({
    where: {
      id
    }
  })
  return data
}

const saveTodo = async (todo: any) => {
  const data = await prisma.todo.create({
    data: {
      content: todo,
    }
  })
  return data
}

const DBClient = {
  getTodos,
  saveTodo,
  deleteTodo
}

export {
  DBClient,
};

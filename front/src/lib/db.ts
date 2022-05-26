import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const markTodo = async (id: number, status: boolean) => {
  return await prisma.todo.update({
    where: {
      id
    },
    data: {
      status
    }
  });
}

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
  deleteTodo,
  markTodo,
}

export {
  DBClient,
};

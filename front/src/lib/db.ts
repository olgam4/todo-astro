import { PrismaClient } from '@prisma/client';
import { update } from './update';

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
  update()
  return data
}

const saveTodo = async (todo: any) => {
  const data = await prisma.todo.create({
    data: {
      content: todo,
    }
  })
  update()
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

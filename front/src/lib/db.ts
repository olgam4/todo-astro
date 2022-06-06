import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (name: string) => {
  return await prisma.user.findMany({
    where: {
      name,
    },
  }).then(data => {
      return data[0].password
  }).catch(() => {
    throw new Error('User not found')
  })
}

const createUser = async (user: any) => {
  return await prisma.user.create({
    data: {
      ...user,
    },
  });
}

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

const createCategory = async (category: any) => {
  const data = await prisma.category.create({
    data: {
      ...category,
    }
  })
}

const getCategories = async () => {
  return await prisma.category.findMany();
}

const DBClient = {
  getTodos,
  saveTodo,
  deleteTodo,
  markTodo,
  getUser,
  createUser,
  createCategory,
  getCategories,
}

export {
  DBClient,
};

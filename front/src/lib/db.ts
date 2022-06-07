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
  // find all todos with their categories
  const todos = await prisma.todo.findMany({
    include: {
      categories: {
        include: {
          category: true,
        }
      }
    },
  });
  const result = todos.map((todo) => {
    return { ...todo, categories: todo.categories.map((category) => category.category) }
  })
  return result;
}

const deleteTodo = async (id: number) => {
  return await prisma.todo.delete({
    where: {
      id
    }
  })
}

const saveTodo = async (content: any, categories: string[]) => {
  const categoryIds = await Promise.all(categories.map(async (category: string) => {
    const categoryData = await prisma.category.findMany({
      where: {
        title: category
      }
    })
    if (categoryData.length === 0) {
      const newCategory = await prisma.category.create({
        data: {
          title: category,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        }
      })
      return newCategory
    }
    return categoryData[0]
  }
  ))
  const todo = await prisma.todo.create({
    data: {
      content,
      categories: {
        create: categoryIds.map(category => {
          return {
            category: {
              connect: {
                id: category.id,
              }
            }
          }
        }
        )
      }
    }
  })
  return todo
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

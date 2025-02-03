export const prismaMock = {
  quiz: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  notificacao: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export const createMockPrismaService = () => ({
  resultado: {
    upsert: jest.fn(),
    findMany: jest.fn(),
  },
  badge: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
});

export const mockPrismaService = {
  activity: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

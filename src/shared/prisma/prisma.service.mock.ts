export const createMockPrismaService = () => ({
  turma: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    findMany: jest.fn(),
  },
});

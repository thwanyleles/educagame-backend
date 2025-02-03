import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

describe('QuizzesController', () => {
  let controller: QuizzesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [
        {
          provide: QuizzesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<QuizzesController>(QuizzesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { prismaMock } from '../../mocks/prisma.mock';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should create a notification', async () => {
    const createNotificationDto = {
      title: 'New Notification',
      message: 'This is a test notification',
      destinatarioTipo: 'user',
      destinatarioId: 1,
    };

    prismaMock.notificacao.create.mockResolvedValue({
      id: 1,
      ...createNotificationDto,
    });

    const result = await service.create(createNotificationDto);

    expect(prismaMock.notificacao.create).toHaveBeenCalledWith({
      data: createNotificationDto,
    });

    expect(result).toEqual({
      id: 1,
      ...createNotificationDto,
    });
  });
});

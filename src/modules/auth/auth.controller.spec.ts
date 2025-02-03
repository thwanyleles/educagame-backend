import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      validateUser: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an access token when login is successful', async () => {
    const loginDto = { email: 'test@example.com', password: 'password' };
    const mockUser = { id: 1, email: 'test@example.com', role: 'user' };
    const mockToken = { access_token: 'mock_token' };

    authService.validateUser = jest.fn().mockResolvedValue(mockUser);
    authService.login = jest.fn().mockReturnValue(mockToken);

    const result = await controller.login(loginDto);
    expect(result).toEqual(mockToken);
  });

  it('should throw UnauthorizedException if credentials are invalid', async () => {
    const loginDto = { email: 'test@example.com', password: 'wrong_password' };

    authService.validateUser = jest.fn().mockResolvedValue(null);

    await expect(controller.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TurmasModule } from './modules/turmas/turmas.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [
    UsersModule,
    TurmasModule,
    QuizzesModule,
    GamificationModule,
    NotificationsModule,
    AuthModule,
    ActivitiesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

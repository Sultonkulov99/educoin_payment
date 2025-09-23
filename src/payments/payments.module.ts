import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from '../database/prisma.service';
import { RedisModule } from 'src/redis/redis.module';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports:[RedisModule,BotModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {}

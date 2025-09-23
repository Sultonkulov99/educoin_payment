import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
// import { BotUpdate } from './bot.update';

@Module({
  imports:[
    TelegrafModule.forRoot({
      token:process.env.BOT_TOKEN as string
    }),
  ],
  providers: [BotService],
  exports : [BotService]
})
export class BotModule {}

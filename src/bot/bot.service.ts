import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { PrismaService } from 'src/database/prisma.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit {
    constructor(@InjectBot() private readonly bot: Telegraf<any>, private prisma : PrismaService) { }

    async onModuleInit() {
        await this.bot.telegram.setMyCommands([
            { command: "start", description: "Botni ishga tushurish" },
        ])
    }

    async notifyPayment(centerId: number, amount: number, startDate : string, endDate : string) {
        const chatId = process.env.GROUP_ID as string;
        const center = await this.prisma.center.findUnique({
            where:{id:centerId}
        })
    
        const message = `Center Name : ${center?.name}\nAmount : ${amount}\nStartDate : ${startDate}\nEndDate : ${endDate}`;

        await this.bot.telegram.sendMessage(chatId, message);
    }
}

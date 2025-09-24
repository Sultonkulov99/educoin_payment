import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { PrismaService } from 'src/database/prisma.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit {
    constructor(@InjectBot() private readonly bot: Telegraf<any>, private prisma: PrismaService) { }

    async onModuleInit() {
        await this.bot.telegram.setMyCommands([
            { command: "start", description: "Botni ishga tushurish" },
        ])
    }

    async notifyPayment(centerId: number, amount: number, startDate: string, endDate: string, text: string) {
        const chatId = process.env.GROUP_ID as string;

        const center = await this.prisma.center.findUnique({
            where: { id: centerId }
        })
        function formatDate(dateStr: string) {
            if (!dateStr) return "-";

            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;

            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();

            return `${day}.${month}.${year}`;
        }


        const message = `${text}\n\n🏫 Markaz nomi : ${center?.name}\n🤑 To'lov miqdori : ${amount} so'm\n🕚 Boshlanish vaqti : ${formatDate(startDate)}\n🕚 Tugash vaqti : ${formatDate(endDate)}`;

        await this.bot.telegram.sendMessage(chatId, message);
    }
}

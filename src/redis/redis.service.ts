import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit{
    private client : Redis
    async onModuleInit() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || "redis"
        })
    }

    async set(key:string,value:string,second:number){
        await this.client.set(key,value,'EX',second)
    }

    async get(key:string){
        return await this.client.get(key) 
    }

    async del(key:string){
        await this.client.del(key)
    }
}

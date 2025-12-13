import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCenterDto } from './dto/create.center.dto';

@Controller("centers")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getAllCenters() {
    return this.appService.getCenters();
  }

  @Get(":id")
  getCenterById(@Param("id", ParseIntPipe) id: number) {
    return this.appService.getCenterById(id);
  } 
  @Get("search")
  searchCenters(@Query("name") name: string) {
    return this.appService.searchCentersByName(name);
  }
  @Post()
  createCenter(@Body() payload: CreateCenterDto) {
    return this.appService.createCenter(payload);
  }

  @Put(":id")
  updateCenter(@Param("id", ParseIntPipe) id: number, @Body() payload: any) {
    return this.appService.updateCenter(id, payload);
  }

  @Delete(":id")
  deleteCenter(@Param("id", ParseIntPipe) id: number) {
    return this.appService.deleteCenter(id);
  }
}

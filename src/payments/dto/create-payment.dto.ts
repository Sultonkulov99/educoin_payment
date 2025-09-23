import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsUUID()
  centerId: number

  @ApiProperty()
  @IsDateString()
  startDate:string

  @ApiProperty()
  @IsDateString()
  endDate:string

  @ApiProperty()
  @IsInt()
  @IsPositive()
  amount:number
}  

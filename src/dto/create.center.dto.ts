import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCenterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

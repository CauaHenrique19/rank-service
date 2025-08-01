import { IsNumber, IsString } from 'class-validator';

export class CreateActionDTO {
  @IsString()
  name: string;

  @IsNumber()
  pontuation: number;
}

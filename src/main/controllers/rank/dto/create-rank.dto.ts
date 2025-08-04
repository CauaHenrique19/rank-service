import { IsNumber, IsString } from 'class-validator';

export class CreateRankDTO {
  @IsString()
  name: string;

  @IsNumber()
  initialPontuation: number;

  @IsNumber()
  finalPontuation: number;

  @IsString()
  color: string;

  @IsString()
  icon: string;
}

import { IsString } from 'class-validator';

export class CreateRankDTO {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  icon: string;
}

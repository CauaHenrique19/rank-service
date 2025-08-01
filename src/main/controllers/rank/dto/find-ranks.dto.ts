import { IsOptional, IsString } from 'class-validator';

export class FindRanksDTO {
  @IsOptional()
  @IsString()
  name?: string;
}

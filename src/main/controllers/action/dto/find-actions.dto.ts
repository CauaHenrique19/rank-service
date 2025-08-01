import { IsOptional, IsString } from 'class-validator';

export class FindActionsDTO {
  @IsOptional()
  @IsString()
  name?: string;
}

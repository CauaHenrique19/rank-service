import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ActionKind } from '@rank-service/domain/enums';

export class CreateActionDTO {
  @IsString()
  name: string;

  @IsNumber()
  pontuation: number;

  @IsString()
  @IsEnum(ActionKind)
  kind: ActionKind;
}

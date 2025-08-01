import { ActionKind } from '@rank-service/domain/enums';

export interface ActionModel {
  id: string;
  name: string;
  kind: ActionKind;
  pontuation: number;
  createdAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { ActionModel } from '@rank-service/domain/entities';
import { ActionKind } from '@rank-service/domain/enums';
import { ColumnNumericTransformer } from '@rank-service/infra/orm/transformers';

@Entity({ name: 'tb_action' })
export class Action implements ActionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ActionKind,
  })
  kind: ActionKind;

  @Column('numeric', {
    precision: 4,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  pontuation: number;

  @Column({ name: 'created_at' })
  createdAt: Date;
}

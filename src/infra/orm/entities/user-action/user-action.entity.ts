import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserActionModel } from '@rank-service/domain/entities';
import { Action } from '@rank-service/infra/orm/entities';

@Entity({ name: 'tb_user_action' })
export class UserAction implements UserActionModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'action_id' })
  actionId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'action_created_at' })
  actionCreatedAt: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Action)
  @JoinColumn({ name: 'action_id' })
  action: Action;
}

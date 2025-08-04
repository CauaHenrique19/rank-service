import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserRankModel } from '@rank-service/domain/entities';
import { Rank } from '@rank-service/infra/orm/entities';
import { ColumnNumericTransformer } from '@rank-service/infra/orm/transformers';

@Entity({ name: 'tb_user_rank' })
export class UserRank implements UserRankModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'rank_id' })
  rankId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column('integer', { transformer: new ColumnNumericTransformer() })
  pontuation: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Rank)
  @JoinColumn({ name: 'rank_id' })
  rank: Rank;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { RankModel } from '@rank-service/domain/entities';

@Entity({ name: 'tb_rank' })
export class Rank implements RankModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  icon: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}

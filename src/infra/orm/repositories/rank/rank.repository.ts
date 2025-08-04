import { Inject } from '@nestjs/common';
import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';

import {
  CreateRankRepository,
  FindRankByPontuationRepository,
  FindRanksRepository,
} from '@rank-service/data/protocols/db';
import { Rank } from '@rank-service/infra/orm/entities';
import { RANK_REPOSITORY } from '@rank-service/infra/orm/typeorm/typeorm.repositories';
import { AppDataSource } from '@rank-service/infra/orm/typeorm/data-source';

export class RankRepository
  implements
    CreateRankRepository,
    FindRanksRepository,
    FindRankByPontuationRepository
{
  private readonly rankRepository: Repository<Rank>;

  constructor(
    @Inject(RANK_REPOSITORY)
    private readonly Rank: EntityTarget<Rank>,
  ) {
    this.rankRepository = AppDataSource.getRepository(this.Rank);
  }

  find(
    parameters?: FindRanksRepository.Parameters,
  ): Promise<FindRanksRepository.Result> {
    const where: FindOptionsWhere<Rank> = {};

    if (parameters?.name) {
      where.name = parameters.name;
    }

    return this.rankRepository.find({
      where,
    });
  }

  findByPontuation(
    parameters: FindRankByPontuationRepository.Parameters,
  ): Promise<FindRankByPontuationRepository.Result> {
    return this.rankRepository
      .createQueryBuilder('userRank')
      .where(
        ':pontuation BETWEEN userRank.initialPontuation AND userRank.finalPontuation',
        { pontuation: parameters.pontuation },
      )
      .getOne();
  }

  async create(
    parameters: CreateRankRepository.Parameters,
  ): Promise<CreateRankRepository.Result> {
    const rank = new Rank();
    Object.assign(rank, parameters);

    await this.rankRepository.save(rank);
    return rank;
  }
}

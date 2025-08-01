import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { controllerAdapter } from '@rank-service/main/adapters/controller.adpter';
import {
  BuildCreateRankController,
  BuildFindRanksController,
} from '@rank-service/main/factories/controllers';
import {
  CreateRankDTO,
  FindRanksDTO,
} from '@rank-service/main/controllers/rank/dto';

@Controller('rank')
export class RankController {
  constructor(
    private readonly buildCreateRankController: BuildCreateRankController,
    private readonly buildFindRanksController: BuildFindRanksController,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async find(
    @Query() query: FindRanksDTO,
    @Res() response: Response,
  ): Promise<void> {
    const result = await controllerAdapter(
      this.buildFindRanksController.build(),
      query,
    );
    response.status(result.statusCode).json(result);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() body: CreateRankDTO,
    @Res() response: Response,
  ): Promise<void> {
    const result = await controllerAdapter(
      this.buildCreateRankController.build(),
      body,
    );
    response.status(result.statusCode).json(result);
  }
}

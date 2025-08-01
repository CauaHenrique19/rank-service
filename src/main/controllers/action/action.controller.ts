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
  BuildCreateActionController,
  BuildFindActionsController,
} from '@rank-service/main/factories/controllers';
import {
  CreateActionDTO,
  FindActionsDTO,
} from '@rank-service/main/controllers/action/dto';

@Controller('action')
export class ActionController {
  constructor(
    private readonly buildCreateActionController: BuildCreateActionController,
    private readonly buildFindActionsController: BuildFindActionsController,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async find(
    @Query() query: FindActionsDTO,
    @Res() response: Response,
  ): Promise<void> {
    const result = await controllerAdapter(
      this.buildFindActionsController.build(),
      query,
    );
    response.status(result.statusCode).json(result);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() body: CreateActionDTO,
    @Res() response: Response,
  ): Promise<void> {
    const result = await controllerAdapter(
      this.buildCreateActionController.build(),
      body,
    );
    response.status(result.statusCode).json(result);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiImageFile, CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { ParseImage } from '../../common/pipes';
import { ImageCreateRequestDto } from '../image/models/dtos/request';
import { ImageResponseDto } from '../image/models/dtos/response';
import { ImageMapper } from '../image/services/image.mapper';
import { PortfolioId } from './models/constants';
import { PortfolioCreateRequestDto } from './models/dtos/request';
import {
  PortfolioListItemResponseDto,
  PortfolioResponseDto,
} from './models/dtos/response';
import { PortfolioMapper } from './services/portfolio.mapper';
import { PortfolioService } from './services/portfolio.service';

@ApiBearerAuth()
@ApiTags('Portfolio')
@Controller({ path: 'portfolios', version: '1' })
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @ApiOperation({ description: 'Get list of my portfolios' })
  @Get()
  public async getPortfolioList(
    @CurrentUser() user: IUserData,
  ): Promise<PortfolioListItemResponseDto[]> {
    const result = await this.portfolioService.getPortfolioList(user.userId);
    return PortfolioMapper.toResponseListDto(result);
  }

  @ApiOperation({ description: 'Create portfolio' })
  @Post()
  public async createPortfolio(
    @CurrentUser() user: IUserData,
    @Body() dto: PortfolioCreateRequestDto,
  ): Promise<PortfolioResponseDto> {
    const result = await this.portfolioService.createPortfolio(
      user.userId,
      dto,
    );
    return PortfolioMapper.toResponseDto(result);
  }

  @ApiOperation({ description: 'Delete portfolio' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${PortfolioId}`)
  public async deleteImage(
    @CurrentUser() user: IUserData,
    @Param(PortfolioId) portfolioId: string,
  ): Promise<void> {
    await this.portfolioService.deletePortfolio(user.userId, portfolioId);
  }

  @ApiOperation({ description: 'Add image to portfolio' })
  @ApiImageFile()
  @Post(`:${PortfolioId}/image`)
  public async addImageToPortfolio(
    @CurrentUser() user: IUserData,
    @Param(PortfolioId) portfolioId: string,
    @Body() dto: ImageCreateRequestDto,
    @UploadedFile(ParseImage) image: Express.Multer.File,
  ): Promise<ImageResponseDto> {
    const result = await this.portfolioService.addImageToPortfolio(
      user.userId,
      portfolioId,
      image,
      dto,
    );
    return ImageMapper.toResponseDto(result);
  }
}

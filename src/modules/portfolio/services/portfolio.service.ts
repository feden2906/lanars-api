import { Injectable } from '@nestjs/common';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { ImageEntity, PortfolioEntity } from '../../../database';
import { BaseImageRequestDto } from '../../image/models/dtos/request';
import { ImageRepository } from '../../image/services/image.repository';
import { ImageStorageService } from '../../image/services/image-storage.service';
import { PortfolioCreateRequestDto } from '../models/dtos/request';
import { PortfolioRepository } from './portfolio.repository';

@Injectable()
export class PortfolioService {
  constructor(
    private imageStorageService: ImageStorageService,
    private portfolioRepository: PortfolioRepository,
    private imageRepository: ImageRepository,
  ) {}

  public async getPortfolioList(userId: string): Promise<PortfolioEntity[]> {
    return await this.portfolioRepository.findBy({ user: { id: userId } });
  }

  public async createPortfolio(
    userId: string,
    dto: PortfolioCreateRequestDto,
  ): Promise<PortfolioEntity> {
    return await this.portfolioRepository.save(
      this.portfolioRepository.create({ ...dto, user: { id: userId } }),
    );
  }

  public async addImageToPortfolio(
    userId: string,
    portfolioId: string,
    image: Express.Multer.File,
    dto: BaseImageRequestDto,
  ): Promise<ImageEntity> {
    const url = await this.imageStorageService.upload(
      image,
      userId,
      portfolioId,
    );
    return await this.imageRepository.createImage(
      userId,
      portfolioId,
      dto,
      url,
    );
  }

  public async deletePortfolio(
    userId: string,
    portfolioId: string,
  ): Promise<void> {
    const portfolio = await this.checkAbilityToManage(userId, portfolioId);
    const images = await this.imageRepository.findUrlsBy({
      portfolio: { id: portfolioId },
    });
    await Promise.all([
      ...images.map((image) => this.imageStorageService.delete(image.url)),
      this.portfolioRepository.remove(portfolio),
    ]);
  }

  private async checkAbilityToManage(
    userId: string,
    portfolioId: string,
  ): Promise<PortfolioEntity> {
    const [isExist, portfolio] = await Promise.all([
      this.portfolioRepository.isExist(portfolioId),
      this.portfolioRepository.findOneByIdAndOwner(userId, portfolioId),
    ]);
    if (!isExist) throw new EntityNotFoundException();
    if (isExist && !portfolio) throw new NoPermissionException();
    return portfolio;
  }
}

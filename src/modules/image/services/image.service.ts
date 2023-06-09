import { Injectable } from '@nestjs/common';

import {
  EntityNotFoundException,
  NoPermissionException,
} from '../../../common/http';
import { ListEntityType } from '../../../common/types';
import { ImageEntity } from '../../../database';
import { ImageListQueryDto } from '../models/dtos/request';
import { ImageRepository } from './image.repository';
import { ImageStorageService } from './image-storage.service';

@Injectable()
export class ImageService {
  constructor(
    private imageStorageService: ImageStorageService,
    private imageRepository: ImageRepository,
  ) {}

  public async getImageList(
    query: ImageListQueryDto,
  ): Promise<ListEntityType<ImageEntity>> {
    return await this.imageRepository.getImageList(query);
  }

  public async deleteImage(userId: string, imageId: string): Promise<void> {
    const image = await this.checkAbilityToManage(userId, imageId);
    await Promise.all([
      this.imageStorageService.delete(image.url),
      this.imageRepository.delete(imageId),
    ]);
  }

  private async checkAbilityToManage(
    userId: string,
    imageId: string,
  ): Promise<ImageEntity> {
    const [isExist, image] = await Promise.all([
      this.imageRepository.isExist(imageId),
      this.imageRepository.findOneByIdAndOwner(userId, imageId),
    ]);
    if (!isExist) throw new EntityNotFoundException();
    if (isExist && !image) throw new NoPermissionException();
    return image;
  }
}

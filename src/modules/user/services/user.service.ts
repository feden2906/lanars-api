import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database';
import { ImageRepository } from '../../image/services/image.repository';
import { ImageStorageService } from '../../image/services/image-storage.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private imageStorageService: ImageStorageService,
    private userRepository: UserRepository,
    private imageRepository: ImageRepository,
  ) {}

  public async currentUser(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({
      where: { id: userId },
    });
  }

  public async deleteUser(userId: string): Promise<void> {
    const images = await this.imageRepository.findUrlsBy({
      portfolio: { user: { id: userId } },
    });
    await Promise.all([
      ...images.map((image) => this.imageStorageService.delete(image.url)),
      this.userRepository.delete(userId),
    ]);
  }
}

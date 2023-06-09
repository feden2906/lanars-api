import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { ImageController } from './image.controller';
import { ImageRepository } from './services/image.repository';
import { ImageService } from './services/image.service';
import { ImageStorageService } from './services/image-storage.service';

@Module({
  imports: [AWSConfigModule],
  controllers: [ImageController],
  providers: [ImageService, ImageStorageService, ImageRepository],
  exports: [ImageStorageService, ImageRepository],
})
export class ImageModule {}

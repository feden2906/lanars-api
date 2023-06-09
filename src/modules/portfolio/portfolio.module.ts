import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { ImageModule } from '../image/image.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from './services/portfolio.repository';
import { PortfolioService } from './services/portfolio.service';

@Module({
  imports: [AWSConfigModule, ImageModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository],
})
export class PortfolioModule {}

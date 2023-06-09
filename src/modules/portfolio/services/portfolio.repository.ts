import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PortfolioEntity } from '../../../database';

@Injectable()
export class PortfolioRepository extends Repository<PortfolioEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PortfolioEntity, dataSource.manager);
  }

  public async isExist(portfolioId: string): Promise<boolean> {
    return await this.exist({
      where: { id: portfolioId },
    });
  }

  public async findOneByIdAndOwner(
    userId: string,
    portfolioId: string,
  ): Promise<PortfolioEntity> {
    return await this.findOneBy({
      id: portfolioId,
      user: { id: userId },
    });
  }
}

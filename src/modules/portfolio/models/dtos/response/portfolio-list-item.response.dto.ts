import { PickType } from '@nestjs/swagger';

import { BasePortfolioResponseDto } from './base-portfolio.response.dto';

export class PortfolioListItemResponseDto extends PickType(
  BasePortfolioResponseDto,
  ['id', 'name'],
) {}

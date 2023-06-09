import { PickType } from '@nestjs/swagger';

import { BasePortfolioRequestDto } from './base-portfolio.request.dto';

export class PortfolioCreateRequestDto extends PickType(
  BasePortfolioRequestDto,
  ['name', 'description'],
) {}

import { PickType } from '@nestjs/swagger';

import { BasePortfolioResponseDto } from './base-portfolio.response.dto';

export class PortfolioResponseDto extends PickType(BasePortfolioResponseDto, [
  'id',
  'name',
  'description',
]) {}

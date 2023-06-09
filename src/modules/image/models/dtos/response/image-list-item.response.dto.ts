import { PickType } from '@nestjs/swagger';

import { PortfolioListItemResponseDto } from '../../../../portfolio/models/dtos/response';
import { BaseImageResponseDto } from './base-image.response.dto';

export class ImageListItemResponseDto extends PickType(BaseImageResponseDto, [
  'id',
  'url',
  'description',
]) {
  portfolio: PortfolioListItemResponseDto;
}

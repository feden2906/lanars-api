import { PortfolioEntity } from '../../../database';
import {
  PortfolioListItemResponseDto,
  PortfolioResponseDto,
} from '../models/dtos/response';

export class PortfolioMapper {
  public static toResponseDto(entity: PortfolioEntity): PortfolioResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }

  public static toResponseListDto(
    entities: PortfolioEntity[],
  ): PortfolioListItemResponseDto[] {
    return entities.map(this.toResponseListItemDto);
  }

  public static toResponseListItemDto(
    entity: PortfolioEntity,
  ): PortfolioListItemResponseDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}

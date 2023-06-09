import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BasePortfolioRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 500)
  description: string;
}

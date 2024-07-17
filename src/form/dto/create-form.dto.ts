import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormDto {
  @ApiProperty({
    description: 'Title of the form',
    example: 'Pesquisa de campo',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the form',
    example: 'Pesquisa de campo para pesquisa de campo',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Start date of the form',
    example: '2022-01-01T00:00:00.000Z',
    type: Date,
  })
  @IsNotEmpty()
  @IsISO8601()
  startDate: Date;

  @ApiPropertyOptional({
    description: 'End date of the form',
    example: '2022-01-01T00:00:00.000Z',
    type: Date,
  })
  @IsOptional()
  @IsISO8601()
  endDate: Date;
}

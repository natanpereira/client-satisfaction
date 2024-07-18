import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateFormDto {
  @ApiProperty({
    description: 'Title of the form',
    example: 'Pesquisa de campo',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty({
    description: 'Description of the form',
    example: 'Pesquisa de campo para pesquisa de campo',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    description: 'The target public of the form',
    example: 'Desenvolvedor',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  targetPublic: string;

  @ApiProperty({
    description: 'Start date of the form',
    example: '2022-01-01',
    type: Date,
  })
  @IsNotEmpty()
  @IsISO8601()
  startDate: Date;

  @ApiPropertyOptional({
    description: 'End date of the form',
    example: '2022-01-01',
    type: Date,
  })
  @IsOptional()
  @IsISO8601()
  endDate: Date;
}

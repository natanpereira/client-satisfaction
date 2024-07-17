import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TypeEnum } from '../../common/enums/types.enum';

export class CreateFormQuestionDto {
  @ApiProperty({
    description: 'Question name',
    example: 'Target Public',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Question type',
    example: TypeEnum.STRING,
    enum: TypeEnum,
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(TypeEnum)
  type: string;

  @ApiProperty({
    description: 'Question length',
    example: 10,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  length: number;

  @ApiProperty({
    description: 'Question required',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  required: boolean;
}

export class CreateManyQuestions {
  @ApiProperty({ description: 'Form questions', type: [CreateFormQuestionDto] })
  @Type(() => CreateFormQuestionDto)
  @ValidateNested({ each: true })
  questions: CreateFormQuestionDto[];
}

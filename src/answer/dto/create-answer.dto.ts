import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Form ID',
    example: 1,
    type: Number,
    deprecated: true,
  })
  @IsNotEmpty()
  @IsInt()
  formId: number;

  @ApiProperty({
    description: 'Form ID',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  formQuestionId: number;

  @ApiProperty({
    description: 'Answer',
    example: 'Yes',
  })
  @IsNotEmpty()
  answer: string | number | boolean;
}

export class CreateArrayAnswersDto {
  @ApiProperty({
    description: 'Answers',
    type: [CreateAnswerDto],
  })
  @Type(() => CreateAnswerDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  answers: CreateAnswerDto[];
}

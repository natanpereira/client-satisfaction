import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClientSatisfactionDto {
  @ApiProperty({
    description: 'The quantity of stars',
    type: Number,
    example: 4,
  })
  @IsNotEmpty()
  @IsIn([1, 2, 3, 4, 5])
  @IsInt()
  stars: number;

  @ApiProperty({
    description: 'The target public',
    type: String,
    example: 'Example public target',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  targetPublic: string;
}

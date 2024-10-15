import { IsString, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  rating?: number;

  @IsOptional()
  @IsString()
  review_text?: string;
  // Add other fields as needed
}

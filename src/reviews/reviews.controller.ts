import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { UpdateReviewDto } from './update-review.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { Reviews } from './reviews.model';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.User) // Only Admin and Editor can access this route
  findAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @Post('AddReview')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin) // Only Admin can create books
  async createReview(
    @Body('rating') rating: number,
    @Body('review_text') review_text: string,
    @Body('userId') userId: number,
  ): Promise<any> {
    const review = await this.reviewService.AddReview(
      rating,
      review_text,
      userId,
    );
    return {
      message: 'Review successfully Added!',
      userId: review.id,
    };
  }

  @Put(':id')
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin)
  async updateBook(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin)
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }

  @Get(':id')
  async getReview(@Param('id') id: string): Promise<Reviews> {
    return this.reviewService.getReview(id);
  }
}

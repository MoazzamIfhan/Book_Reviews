import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateReviewDto } from './update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reviews } from './reviews.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private reviewModel: typeof Reviews,
  ) {}

  async AddReview(
    rating: number,
    review_text: string,
    userId: any,
  ): Promise<Reviews> {
    return await this.reviewModel.create({
      rating,
      review_text,
      userId,
    });
  }

  async getAllReviews(): Promise<Reviews[]> {
    return this.reviewModel.findAll(); // Fetch all users
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Reviews> {
    const review = await Reviews.findByPk(id);
    if (!review) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Update user properties
    await review.update(updateReviewDto);
    return review;
  }

  async deleteReview(id: string): Promise<void> {
    const review = await Reviews.findByPk(id);
    if (!review) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await review.destroy(); // Delete the user
  }

  async getReview(id: string): Promise<Reviews> {
    const review = await Reviews.findByPk(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }
}

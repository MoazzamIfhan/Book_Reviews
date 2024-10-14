import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],  // Make sure to export the service so it can be used in other modules
})
export class UsersModule {}

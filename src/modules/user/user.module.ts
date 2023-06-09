import { Module } from '@nestjs/common';

import { ImageModule } from '../image/image.module';
import { UserRepository } from './services/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [ImageModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

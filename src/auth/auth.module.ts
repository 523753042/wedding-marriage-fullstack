import { HttpModule, HttpService, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

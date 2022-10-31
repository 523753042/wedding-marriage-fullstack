import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared-module/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AuthController]
})
export class AuthModule { }

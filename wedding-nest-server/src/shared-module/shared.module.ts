import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Manager]),
    ],
    exports: [ManagerService, AuthService],
    providers: [ManagerService, AuthService]
})
export class SharedModule { }

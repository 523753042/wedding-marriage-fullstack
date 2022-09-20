import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendModule } from './attend/attend.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { InfoModule } from './info/info.module';
import { SharedModule } from './shared-module/shared.module';
import { UploadModule } from './upload/upload.module';
import { EggModule } from './egg/egg.module';
import { RemarkModule } from './remark/remark.module';

@Module({
  imports: [ContactsModule, AttendModule, AuthModule, CommentModule,InfoModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SharedModule,
    UploadModule,
    EggModule,
    RemarkModule,
  ],
  controllers: [AppController],
})
export class AppModule { }

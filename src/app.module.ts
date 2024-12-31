import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), LoggerModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}

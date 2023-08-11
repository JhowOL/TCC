import { Module } from '@nestjs/common';
import { AppController } from './healthy/healthy.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

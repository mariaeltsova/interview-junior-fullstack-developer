import { Module } from '@nestjs/common';
import { CitiesModule } from 'src/cities/cities.module';
@Module({
  imports: [CitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

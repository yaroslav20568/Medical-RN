import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { TypeModule } from './type/type.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [LaboratoryModule, TypeModule, CountryModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

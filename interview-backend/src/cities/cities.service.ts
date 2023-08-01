import { Injectable } from '@nestjs/common';
import { CitiesModel } from './cities.interface';
import * as fs from 'fs';
import * as path from 'path';
import { PaginationResponseDto } from '../pagination/pagination-response.dto';
import { type } from 'os';

@Injectable()
export class CitiesService {
  cities: Array<CitiesModel> = [];

  constructor() {
    this.readCitiesFromJson();
  }
  private readCitiesFromJson(): void {
    try {
      const readJson = fs.readFileSync(
        path.join(__dirname, '../../../cities.json'),
        'utf8',
      );
      this.cities = JSON.parse(readJson);
      console.log('creating service');
    } catch (err) {
      console.log('Error when reading cities', err);
    }
  }

  public findAll(): Array<CitiesModel> {
    return this.cities;
  }

  public findBySearchString(search: string): Array<CitiesModel> {
    const matchingCities: CitiesModel[] = this.cities.filter(
      (city) =>
        city.uuid.includes(search.toLowerCase()) ||
        city.cityName.toLowerCase().includes(search.toLowerCase()),
    );
    return matchingCities;
  }

  public findAllPaginated(
    page: number,
    pageSize: number,
  ): PaginationResponseDto<CitiesModel> {
    const startIndex = (page - 1) * pageSize;
    const paginatedData = this.cities.slice(startIndex, startIndex + pageSize);
    const totalItems = this.cities.length;

    return {
      items: paginatedData,
      totalItems,
      currentPage: page,
      pageSize,
    };
  }

  public findBySearchStringPaginated(
    page: number,
    pageSize: number,
    search: string,
  ): PaginationResponseDto<CitiesModel> {
    const matchingCities: CitiesModel[] = this.cities.filter(
      (city) =>
        city.uuid.includes(search.toLowerCase()) ||
        city.cityName.toLowerCase().includes(search.toLowerCase()),
    );
    const startIndex = (page - 1) * pageSize;
    const paginatedData = matchingCities.slice(startIndex, startIndex + pageSize);
    const totalItems = matchingCities.length;
    if (startIndex < 0 || (startIndex >= totalItems && totalItems !== 0)) {
      return null;
    }
    const res:PaginationResponseDto<CitiesModel> = new PaginationResponseDto<CitiesModel> ({
      items: paginatedData,
      totalItems,
      currentPage: page,
      pageSize,
    });
    console.log(res)
    return res;
  }
}

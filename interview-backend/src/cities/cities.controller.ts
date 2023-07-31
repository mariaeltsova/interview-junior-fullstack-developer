import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesModel } from './cities.interface';
import { PaginationResponseDto } from '../pagination/pagination-response.dto';
import {BadRequestException} from '@nestjs/common';
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('search/')
  public findBySearchString(
    @Query('search') search: string,
  ): Array<CitiesModel> {
    console.log('find by search string', search);
    return this.citiesService.findBySearchString(search);
  }

  @Get()
  public findAll(): Array<CitiesModel> {
    console.log('find all---');
    return this.citiesService.findAll();
  }

  @Get('paginated')
  public findAllPaginated(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 5,
  ): PaginationResponseDto<CitiesModel> {
    return this.citiesService.findAllPaginated(page, pageSize);
  }

  @Get('search/paginated/')
  public findBySearchStringPaginated(
    @Query('page') page: string = '1',
    @Query('pagesize') pageSize: string = '5',
    @Query('search') search: string,
  ): PaginationResponseDto<CitiesModel> {
    const pageNumber: number = parseInt(page, 10); // Convert to number using parseInt
    const pageSizeNumber: number = parseInt(pageSize, 10);
    const res: PaginationResponseDto<CitiesModel> = this.citiesService.findBySearchStringPaginated(
      pageNumber,
      pageSizeNumber,
      search,
    );
    if (res === null) {
      throw new BadRequestException();
    }
    return res;
  }
}

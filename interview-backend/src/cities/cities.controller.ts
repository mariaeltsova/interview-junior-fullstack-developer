import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesModel } from './cities.interface';
import { PaginationResponseDto } from 'src/pagination/pagination-response.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @Get('uuid/')
  public findByUuid(@Query('uuid') uuid: string): CitiesModel {
    console.log('findByUuid');
    return this.citiesService.findOne(uuid);
  }

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
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 5,
    @Query('search') search: string,
  ): PaginationResponseDto<CitiesModel> {
    console.log("findBySearchStringPaginated controller");
    return this.citiesService.findBySearchStringPaginated(page, pageSize, search);
  }
}

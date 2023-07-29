import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService  } from './cities.service';
import { CitiesModel } from './cities.interface';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}
    @Get('uuid/')
    public findByUuid(@Query('uuid') uuid: string): CitiesModel {
        console.log("findByUuid")
        return this.citiesService.findOne(uuid);
    }

    @Get('search/')
    public findBySearchString(@Query('search') search: string): Array<CitiesModel> {
        console.log("find by search string", search)
        return this.citiesService.findBySearchString(search);
    }


    @Get()
    public findAll(): Array<CitiesModel> {
        console.log("find all")
        return this.citiesService.findAll();
    }

    
}

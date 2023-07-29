import { Injectable } from '@nestjs/common';
import { CitiesModel } from './cities.interface';
import * as fs from 'fs';
import * as path from 'path'; 


@Injectable()
export class CitiesService {
    private cities: Array<CitiesModel> = [];

    constructor() {
        this.readCitiesFromJson();
    }
    private readCitiesFromJson(): void {
        try {
            const readJson = fs.readFileSync(path.join(__dirname, '../../../cities.json'), 'utf8');
            this.cities = JSON.parse(readJson);
            console.log("creating service")
        } catch(err) {
            console.log("Error when reading cities", err);
        }  
    }

    public findAll(): Array<CitiesModel> {
        return this.cities;
    }

    public findOne(uuid: string): CitiesModel {
        console.log(uuid)
        const city: CitiesModel = this.cities.find(city => city.uuid === uuid);
        return city;
    }

    public findBySearchString(search: string): Array<CitiesModel> {
        const matchingCities: CitiesModel[] = this.cities.filter(
            city => (city.uuid.includes(search) || city.cityName.toLowerCase().includes(search))
          );
          return matchingCities;
    }
}

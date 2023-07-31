
import { CitiesModule } from './cities.module';
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PaginationResponseDto } from '../pagination/pagination-response.dto';
import { CitiesModel } from './cities.interface';

describe('CitiesController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CitiesModule],
      controllers: [CitiesController],
      
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

   describe('findBySearchStringPaginated', ()=> {
    it('should reject incorrect parameters', ()=> {
     expect(() => controller.findBySearchStringPaginated('-1', '5', 'f')).toThrow(BadRequestException);
     expect(() => controller.findBySearchStringPaginated('100', '5', 'f')).toThrow(BadRequestException);
    })

    it('should return a correct PaginationResponseDto<CitiesModel>', () => {
      const res: PaginationResponseDto<CitiesModel> = controller.findBySearchStringPaginated('1', '5', 'f');
      const expectedRes: PaginationResponseDto<CitiesModel> = new PaginationResponseDto<CitiesModel>({"items":[{"uuid":"7e8a29e2-62d1-4ec1-ae15-8ff2f777318f","cityName":"Berlin","count":523},
      {"uuid":"4a7f5c2d-3a10-4a02-a9b3-450839929e43","cityName":"Hamburg","count":267},
      {"uuid":"09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99","cityName":"München","count":899},
      {"uuid":"0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1","cityName":"Köln","count":471},
      {"uuid":"e1ad9f95-44b5-4d80-8b26-df42a53fcfb6","cityName":"Frankfurt","count":110}],"totalItems":82,"currentPage":1,"pageSize":5});
      expect(res).toStrictEqual(expectedRes);
      expect(res).toBeInstanceOf(PaginationResponseDto<CitiesModel>)
    })
   })//77.27% of statements covered
});

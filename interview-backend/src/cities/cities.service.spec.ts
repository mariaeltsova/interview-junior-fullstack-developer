import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { CitiesModel } from './cities.interface';
import { PaginationResponseDto } from '../pagination/pagination-response.dto';

//describe block groups related tests, in this case all tests related to CitiesService
describe('CitiesService', () => {
  let service: CitiesService;

  //beforeEach does everything that needs to be done before running each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService], //this setup gives us access to all the methods inside Cities
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findBySearchString', () => {
    it('should return one result', () => {
      const searchString1 = 'Berlin';
      const searchString2 = 'berlin';
      const searchString3 = 'berlinghgh';
      const uuid = '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f';
      const uuidIncorrect = '7e8a29e2-62d1-41-ae15-8ff2f777318f';
      const multipleResults = 'ber';
      const city: CitiesModel[] = [
        {
          uuid: '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f',
          cityName: 'Berlin',
          count: 523,
        },
      ];
      const empty: CitiesModel[] = [];
      const multipleCities = [
        {
          uuid: '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f',
          cityName: 'Berlin',
          count: 523,
        },
        {
          uuid: '2e9ad9c0-c890-40c3-9b6e-bccf7a771e19',
          cityName: 'Nürnberg',
          count: 72,
        },
        {
          uuid: '1dc59b9b-310a-49df-9f95-c2249ed1f84c',
          cityName: 'Oberhausen',
          count: 916,
        },
        {
          uuid: 'f1569f3c-941d-4560-a7d1-43c94de2b7d7',
          cityName: 'Heidelberg',
          count: 297,
        },
        {
          uuid: 'a1337e39-525c-4b5b-8e05-5a57f00d983c',
          cityName: 'Bergisch Gladbach',
          count: 685,
        },
        {
          uuid: 'b5d1ac07-b2be-4e17-94cd-27d345434c8a',
          cityName: 'Velbert',
          count: 128,
        },
        {
          uuid: '8c4e60f1-2fe4-4d48-b2b1-495e0c515ed6',
          cityName: 'Bamberg',
          count: 248,
        },
      ];

      const res1 = service.findBySearchString(searchString1);
      const res2 = service.findBySearchString(searchString2);
      const res3 = service.findBySearchString(searchString3);
      const resUuid = service.findBySearchString(uuid);
      const resUuidIncorrect = service.findBySearchString(uuidIncorrect);
      const resMultiple = service.findBySearchString(multipleResults);

      expect(res1).toStrictEqual(city);
      expect(res2).toStrictEqual(city);
      expect(res3).toStrictEqual(empty);
      expect(resUuid).toStrictEqual(city);
      expect(resUuidIncorrect).toStrictEqual(empty);
      expect(resMultiple).toStrictEqual(multipleCities);
    });
  });

  describe('findBySearchStringPaginated', () => {
    it('positive cases', () => {
      const setting1 = { page: 1, pageSize: 5, search: 'f' };
      const setting2 = { page: 1, pageSize: 5, search: 'F' }; //same as 1 but uppercse search
      const dto1: PaginationResponseDto<CitiesModel> =
        new PaginationResponseDto<CitiesModel>({
          items: [
            {
              uuid: '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f',
              cityName: 'Berlin',
              count: 523,
            },
            {
              uuid: '4a7f5c2d-3a10-4a02-a9b3-450839929e43',
              cityName: 'Hamburg',
              count: 267,
            },
            {
              uuid: '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99',
              cityName: 'München',
              count: 899,
            },
            {
              uuid: '0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1',
              cityName: 'Köln',
              count: 471,
            },
            {
              uuid: 'e1ad9f95-44b5-4d80-8b26-df42a53fcfb6',
              cityName: 'Frankfurt',
              count: 110,
            },
          ],
          totalItems: 82,
          currentPage: 1,
          pageSize: 5,
        });

      const res1: PaginationResponseDto<CitiesModel> =
        service.findBySearchStringPaginated(
          setting1.page,
          setting1.pageSize,
          setting1.search,
        );
      const res2: PaginationResponseDto<CitiesModel> =
        service.findBySearchStringPaginated(
          setting2.page,
          setting2.pageSize,
          setting2.search,
        );
      console.log(typeof res1);

      expect(res1).toStrictEqual(dto1);
      expect(res1).toBeInstanceOf(PaginationResponseDto<CitiesModel>);
      expect(res2).toStrictEqual(dto1);
    }); 

    it('should reject incorrect arguements', () => {
      const setting1 = { page: 35, pageSize: 5, search: 'f' };
      const setting2 = { page: 0, pageSize: 5, search: 'F' };
      const res1 = service.findBySearchStringPaginated(
        setting1.page,
        setting1.pageSize,
        setting1.search,
      );

      const res2: PaginationResponseDto<CitiesModel> =
        service.findBySearchStringPaginated(
          setting2.page,
          setting2.pageSize,
          setting2.search,
        );
      
      expect(res1).toBeNull();
      expect(res2).toBeNull();
    });
  });
}); //tests up to here cover 80.64% of statements in this service

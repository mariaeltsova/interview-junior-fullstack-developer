export class PaginationResponseDto<CitiesModel> {
    items: CitiesModel[]  = [];
    totalItems: number = 0;
    currentPage: number = 0;
    pageSize: number = 0;
  }
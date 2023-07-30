export class PaginationResponseDto<CitiesModel> {
    items: CitiesModel[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
  }
export class PaginationResponseDto<CitiesModel> {
    items: CitiesModel[];
    totalItems: number;
    currentPage: number;
    pageSize: number;

    constructor(data: {
      items: CitiesModel[];
      totalItems: number;
      currentPage: number;
      pageSize: number;
    }) {
      this.items = data.items;
      this.totalItems = data.totalItems;
      this.currentPage = data.currentPage;
      this.pageSize = data.pageSize;
    }
  }
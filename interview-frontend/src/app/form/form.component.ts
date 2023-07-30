import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { CitiesModel } from './cities.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationResponseDto } from '../pagination/pagination-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/cities';

  constructor(private http: HttpClient) {}

  //localhost:3000/cities/uuid?uuid=7e8a29e2-62d1-4ec1-ae15-8ff2f777318f
  public get(endpoint: string): Observable<CitiesModel[]> {
    console.log(`${this.apiUrl}/${endpoint}`);
    return this.http.get<CitiesModel[]>(`${this.apiUrl}/${endpoint}`);
  }

  public getPaginated(endpoint: string): Observable<PaginationResponseDto<CitiesModel>> {
    console.log(`${this.apiUrl}/${endpoint}`);
    return this.http.get<PaginationResponseDto<CitiesModel>>(
      `${this.apiUrl}/${endpoint}`
    );
    
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  constructor(private apiService: ApiService, private modalService: NgbModal) {
    console.log('hello')
    this.fetchData('paginated?page=1&pagesize=5')
  }

  enteredSearch: string = '';
  cities: CitiesModel[] = new Array<CitiesModel>();
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
 // tableSizes: any = [5, 5, 5, 5, 5, 5];
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  Submit() {
    console.log('form submitted' + 'search/paginated?page=' + this.page +'&pagesize=5&search='  + this.enteredSearch);
    this.fetchData('search/paginated?page=' + 1 +'&pagesize=5&search=' + this.enteredSearch);
    this.page = 1;
  }

  onPageChange(event: any) {
    console.log(event)
    console.log('page =', this.page)
    this.page = event;
    console.log("page changed to", this.page)
    this.fetchData('search/paginated?page=' + this.page +'&pagesize=5&search=' + this.enteredSearch)
  }

  fetchData(path: string) {
    this.apiService.getPaginated(path).subscribe({
      next: (response) => {
        console.log('response received', response);
        this.cities = response.items;
        this.count = response.totalItems;
        
      },
      error: (error) => {
        console.error('Request failed with error', error);
      },
    });
  }
}

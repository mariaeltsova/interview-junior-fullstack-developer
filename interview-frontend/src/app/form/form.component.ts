import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { CitiesModel } from './cities.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl ='http://localhost:3000/cities'; 

  constructor(private http: HttpClient) {}

  //localhost:3000/cities/uuid?uuid=7e8a29e2-62d1-4ec1-ae15-8ff2f777318f
  public get(endpoint: string): Observable<CitiesModel[]> {
    console.log(`${this.apiUrl}/${endpoint}`)
    return this.http.get<CitiesModel[]>(`${this.apiUrl}/${endpoint}`)
  }
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  constructor(private apiService: ApiService, private modalService: NgbModal) {
    this.apiService.get("") .subscribe({
      next: (response) => {                           
        console.log('response received', response)
        this.cities = response;
      },
      error: (error) => {                              
        console.error('Request failed with error', error)
        
      }})
  }
  enteredSearch: string = '';
  cities: CitiesModel[] = new Array<CitiesModel>;
  
  public open(modal: any): void {
    this.modalService.open(modal);
  }


  Submit() {
    console.log('form submitted', '/search?search=' + this.enteredSearch);
    this.apiService.get('search?search=' + this.enteredSearch) .subscribe({
      next: (response) => {                           
        console.log('response received', response)
        this.cities = response;
      },
      error: (error) => {                              
        console.error('Request failed with error', error)
        
      }})
    
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { FormComponent } from './form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [HttpClientModule, NgxPaginationModule, FormsModule, HttpClientTestingModule],
     
    });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpMock.expectOne('http://localhost:3000/cities/paginated?page=1&pagesize=5')
  });

  describe('Submit', ()=> {
    it('should refresh data', () => {
      component.page = 5;
      component.enteredSearch = 'Berlin';

      component.Submit();
      httpMock.expectOne('http://localhost:3000/cities/search/paginated?page=1&pagesize=5&search=Berlin');

      expect(component.page).toEqual(1);
      }) 
  });

  describe('onPageChange', ()=> {
    it('should update page', ()=> {
      component.page = 3;
      component.enteredSearch = 'ber';
      component.onPageChange(1);
      httpMock.expectOne('http://localhost:3000/cities/search/paginated?page=1&pagesize=5&search=ber');
      expect(component.page).toEqual(1);
    })
  })

  describe('fetchData', ()=> {
    it('should send a correct request', ()=>{
      component.fetchData('search/paginated?page=2&pagesize=5&search=ffnfnfnnf');
      httpMock.expectOne('http://localhost:3000/cities/search/paginated?page=2&pagesize=5&search=ffnfnfnnf');
    })
  })
});

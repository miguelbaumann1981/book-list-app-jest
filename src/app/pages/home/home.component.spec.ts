import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from 'src/app/models/book.model';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';

const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    description: '',
    photoUrl: '',
    price: 15,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    description: '',
    photoUrl: '',
    price: 20,
    amount: 1,
  },
  {
    name: '',
    author: '',
    isbn: '',
    description: '',
    photoUrl: '',
    price: 8,
    amount: 7,
  },
];

const serviceMock = {
    getBooks: () => of(listBook)
}

@Pipe({name: 'reduceText'})
class ReducePipeMock implements PipeTransform {
    transform(): string {
        return '';
    }
}


describe('HomeComponent', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            declarations: [
                HomeComponent,
                ReducePipeMock
            ],
            providers: [
                // BookService
                {
                    provide: BookService,
                    useValue: serviceMock
                }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
    });


    it('should create',() => {
        expect(component).toBeTruthy();
    });
    
    it('getBooks should populate listBook', () => {
        // const spy = jest.spyOn(service, 'getBooks').mockReturnValueOnce( of(listBook) );
        component.getBooks();
        // expect(spy).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);
        expect(component.listBook).toEqual(listBook);
    });



});
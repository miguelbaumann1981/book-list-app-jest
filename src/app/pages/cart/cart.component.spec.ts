import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from 'src/app/models/book.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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

const matDialogMock = {
    open() {
        return {
            afterClosed: () => { of(true) }
        };
    }
}


describe('CartComponent', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                BookService,
                { provide: MatDialog, useValue: matDialogMock }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook);
    });

    afterEach(() => {
        fixture.destroy();
        jest.resetAllMocks();
    });
    

    it('should create',() => {
        expect(component).toBeTruthy();
    });

    
    it ('getTotalPrice returns an amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        // expect(totalPrice).not.toBe(0);
        // expect(totalPrice).not.toBeNull();
    });

    it ('onInputNumberChange increments correctly', () => {
        const action = 'plus';
        const book: Book = listBook[0];

        // const service1 = (component as any)._bookService;
        // const service2 = component['_bookService'];

        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null );
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null);

        expect(book.amount).toBe(2);
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(3);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('onInputNumberChange decrements correctly', () => {
        const action = 'minus';
        const book: Book = listBook[0];

        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null );
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null);

        component.onInputNumberChange(action, book);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('onClearBooks works fine', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null );
        const spy2 = jest.spyOn(component as any, '_clearListCartBook');
        component.listCartBook = listBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('onClearBooks2 works fine', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null );
        const spy2 = jest.spyOn(component as any, '_clearListCartBook');
        const spy3 = jest.spyOn(matDialogMock, 'open').mockImplementation( () => {
            return {
                afterClosed: () => of(true)
            }
        } );
        component.listCartBook = listBook;
        component.onClearBooks2();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalledTimes(1);
        expect(spy3).toHaveBeenCalled();
    });

    it('_clearListCartBook works fine', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null );
        component.listCartBook = listBook;
        component['_clearListCartBook']();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    });
    
    it('The title "The cart is empty" is shown when the cart has no books', () => {
        component.listCartBook = [];
        fixture.detectChanges();
        const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeTruthy();
    });


});
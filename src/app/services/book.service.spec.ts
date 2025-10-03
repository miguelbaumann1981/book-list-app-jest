import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';

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

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks returns a list of books and does a GET method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  it('getBooksFromCart returns an empty array of books when localStorage is empty', () => {
    const listBooks = service.getBooksFromCart();
    expect(listBooks.length).toBe(0);
  });

  it('getBooksFromCart returns a list of books when localStorage is complete', () => {
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    const newListBooks = service.getBooksFromCart();
    expect(newListBooks.length).toBe(3);
  });

  it('addBookToCart adds a book correctly when list does not exist in local storage', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      description: '',
      photoUrl: '',
      price: 15,
    };
    const toastMock = {
      fire: () => null,
    } as any;
    const spy1 = jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });
    let newListBooks = service.getBooksFromCart();
    expect(newListBooks.length).toBe(0);
    service.addBookToCart(book);
    expect(book.amount).toBe(1);
    newListBooks = service.getBooksFromCart();
    expect(newListBooks.length).toBe(1);
    expect(spy1).toHaveBeenCalledTimes(1);
  });

  it('removeBooksFromCart removes the list in localStorage', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      description: '',
      photoUrl: '',
      price: 15,
    };
    const toastMock = {
      fire: () => null,
    } as any;
    const spy1 = jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });
    service.addBookToCart(book);
    let newListBooks = service.getBooksFromCart();
    expect(newListBooks.length).toBe(1);
    service.removeBooksFromCart();
    newListBooks = service.getBooksFromCart();
    expect(newListBooks.length).toBe(0);
    expect(spy1).toHaveBeenCalledTimes(1);
  });




});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, signal} from '@angular/core';
import {Book} from '../../shared/book';

import { BookCard } from './book-card';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;
  const testBook =signal<Book>({
    isbn:'1234567890123',
    title: 'Test Book',
    authors:['Test Author'],
    description:'',
    imageUrl: 'https://example.com/test.png',
    createdAt:'2026-01-01'
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard, {
      bindings:[inputBinding('book',testBook)]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('')
  it('should display the correct image', ()=>{
    const hostEl:HTMLElement= fixture.nativeElement;
    const imagEl =hostEl.querySelectorAll('img');
    expect(imagEl).toBeTruthy();
    expect(imagEl?.src).toBe(testBook().imageUrl);
  });
});

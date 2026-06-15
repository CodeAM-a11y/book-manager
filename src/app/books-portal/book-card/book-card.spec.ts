import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, signal,outputBinding} from '@angular/core';
import { Mock } from 'vitest';
import {Book} from '../../shared/book';

import { BookCard } from './book-card';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;
  let likeFn: Mock;
  const testBook =signal<Book>({
    isbn:'1234567890123',
    title: 'Test Book',
    authors:['Test Author'],
    description:'',
    imageUrl: 'https://example.com/test.png',
    createdAt:'2026-01-01'
  });

  beforeEach(async () => {
    likeFn = vi.fn();
    await TestBed.configureTestingModule({
      imports: [BookCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard, {
      bindings:[
        inputBinding('book',testBook),
      outputBinding('like',likeFn)
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render book title and isbn',()=>{
    const  hostEl: HTMLElement =fixture.nativeElement;
    expect(hostEl.textContent).toContain(testBook().isbn);
    expect(hostEl.textContent).toContain(testBook().title);
  });
  it('should display the correct image', ()=>{
    const hostEl:HTMLElement= fixture.nativeElement;
    const imagEl =hostEl.querySelector('img');
    expect(imagEl).toBeTruthy();
    expect(imagEl?.src).toBe(testBook().imageUrl);
  });
  it('should emit the like event wit a book',()=>{
    //Event manuell auslösen
    component.likeBook();
    //prüfen ob das Buch emittiert wurde
    expect(likeFn).toHaveBeenCalledExactlyOnceWith(testBook());
  })
});

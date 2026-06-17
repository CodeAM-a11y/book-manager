import { Component, computed, effect, inject, input, signal } from '@angular/core';
import {BookStore} from '../../shared/book-store';
import {RouterLink} from '@angular/router';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.css',
})
export class BookDetailsPage {
  #bookStore = inject(BookStore);

  readonly isbn=input.required<string>();
  protected book = signal<Book|undefined>(undefined);

  constructor() {
    effect(() => {
      this.#bookStore.getSingle(this.isbn()).subscribe(book => {this.book.set(book);});
    });
  }
}

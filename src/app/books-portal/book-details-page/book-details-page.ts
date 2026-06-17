import { Component, computed, effect, inject, input, signal } from '@angular/core';
import {BookStore} from '../../shared/book-store';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.css',
})
export class BookDetailsPage {
  #bookStore = inject(BookStore);
  #router = inject(Router);

  readonly isbn=input.required<string>();
  protected book = signal<Book|undefined>(undefined);

  removeBook(){
    if (confirm('Delete this book?')){
      this.#bookStore.remove(this.isbn()).subscribe(()=>
      this.#router.navigate(['/books']));
    }
  }

  constructor() {
    effect(() => {
      this.#bookStore.getSingle(this.isbn()).subscribe(book => {this.book.set(book);});
    });
  }
}

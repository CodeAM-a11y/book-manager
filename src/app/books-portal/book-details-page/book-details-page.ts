import { Component, inject , signal} from '@angular/core';
import { Book} from '../../shared/book';
import { ActivatedRoute } from '@angular/router';
import {BookStore} from '../../shared/book-store';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.css',
})
export class BookDetailsPage {
  #bookStore= inject(BookStore);
  #route =inject(ActivatedRoute);

  protected book= signal<Book|undefined>(undefined);

  constructor() {
    const isbn =this.#route.snapshot.paramMap.get('isbn');
    if(isbn!==null){
      this.book.set(this.#bookStore.getSingle(isbn));
    }
  }
}

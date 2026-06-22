import { Component, inject, signal } from '@angular/core';
import { Subject, filter, debounceTime, distinctUntilChanged ,switchMap,tap} from 'rxjs';
import {BookStore} from '../shared/book-store';
import { toSignal } from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  #bookStore = inject(BookStore);
  protected searchTerm$ = new Subject<string>();
  protected isLoaded = signal(false);

  protected results = toSignal(
    this.searchTerm$.pipe(
      filter((term) => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoaded.set(true)),
      switchMap((term) => this.#bookStore.search(term)),
      tap(() => this.isLoaded.set(false)),
    ),
    {initialValue:[]}
  );
}

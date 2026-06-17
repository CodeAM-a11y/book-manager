import { inject, Service } from '@angular/core';
import { Book} from './book';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import {Observable} from 'rxjs';

@Service()
export class BookStore {
  #http = inject(HttpClient);
  #apiUrl ='https://api1.angular-buch.com';
  getAll(): HttpResourceRef<Book[]>{
    return httpResource<Book[]>(()=>`${this.#apiUrl}/books`,{defaultValue:[]});
  }
  getSingle(isbn: string): Observable<Book>{
    return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`);
  }
  remove(isbn: string):Observable<void>{
    return this.#http.delete<void>(`${this.#apiUrl}/books/${isbn}`);
  }
}

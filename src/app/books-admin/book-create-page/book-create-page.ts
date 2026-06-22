import { Router } from '@angular/router';
import { Component, inject, signal, } from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormRoot,FormField, form,maxLength,minLength,required,validate,FieldTree, pattern }
  from '@angular/forms/signals';
import {BookStore} from '../../shared/book-store';
import { Book } from '../../shared/book';

@Component({
  selector: 'app-book-create-page',
  imports: [FormField,JsonPipe,FormRoot],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.css',
})
export class BookCreatePage {
  #bookStore = inject(BookStore);
  #router = inject(Router);
  readonly #bookFormData = signal({
    isbn: '',
    title: '',
    subtitle: '',
    authors: [''],
    description: '',
    imageUrl: '',
  });

  protected readonly bookForm= form(
    this.#bookFormData,
    (path)=>{
      required(path.title,{message:'Title is required.'});
      required(path.isbn,{ message:'ISBN is required.'});
      minLength(path.isbn,13, {
        message:'ISBN must have 13 digits.'
      });
      maxLength(path.isbn,13,{
        message:'ISBN must have 13 digits.'
      });
      pattern(path.isbn, /^\d+$/,
      {
        message:'Only digits'
      });
      validate(path.authors, (ctx)=>!ctx.value().some((a)=>a)?{
        kind:'At least one author is required.'
      }
      :undefined
      );
      required(path.description,{message:'Description is required.'});
      required(path.imageUrl,{message:'URL is required.'});
    },
    {submission:{
      action:async(bookForm)=>{
        const value= bookForm().value();
        const authors=value.authors.filter(author=>!!author);

        const newBook: Book = {
          ...value,
          authors,
          createdAt: new Date().toISOString()
        };
        const createdBook = await this.#bookStore.create(newBook);
        await this.#router.navigate(['/books','details',createdBook.isbn]);
      }
      }}
);
  isInvalid(field: FieldTree<unknown>):boolean|null{
    if(!field().touched()){
      return null;
    }
    return field().invalid();
  }
  addAuthorfield(){
    this.bookForm.authors().value.update((authors)=>[...authors,'']);
  }
}

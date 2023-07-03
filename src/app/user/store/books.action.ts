import { createAction, props } from "@ngrx/store";
import { Books } from "../store/books";

export class BooksAction {
}

export const invokeBooksAPI = createAction(
    '[Books API ] Invoke Books Fetch API'
)

export const bookFetchAPISuccess = createAction(
    '[Books API ] Invoke Books API Success',
    props<{ allBooks: Books[] }>()
)

export const addNewBookAPI = createAction(
    '[Books API] save new book API',
    props<{ newBook: Books }>()
)

export const addNewBookAPISuccess = createAction(
    '[Books API] add new book API success',
    props<{ newBook: Books }>()
)

export const updateBookAPI = createAction(
    "[Book API] edit book API",
    props<{ updateBook: Books }>()
)

export const updateBookAPISuccess = createAction(
    "[Book API] edit book API Success",
    props<{ updateBook: Books }>()
)

export const deleteBookAPI = createAction(
    "[Book API] delete book API",
    props<{ id: number }>()
)

export const deleteBookAPISuccess = createAction(
    "[Book API] delete book API success",
    props<{ id: number }>()
)


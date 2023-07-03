import { createReducer, on } from "@ngrx/store";
import { Books } from "./books";
import { addNewBookAPISuccess, bookFetchAPISuccess, deleteBookAPISuccess, updateBookAPISuccess } from "./books.action";

export const initilState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(
    initilState,
    on(bookFetchAPISuccess, (state, { allBooks }) => {
        return allBooks
    }),
    on(addNewBookAPISuccess, (state, { newBook }) => {
        let newState = [...state];
        newState.unshift(newBook);
        return newState
    }),
    on(updateBookAPISuccess, (state, { updateBook }) => {
        let newState = state.filter((_) => _.id != updateBook.id)
        newState.unshift(updateBook)
        return newState
    }),
    on(deleteBookAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _.id != id)
        return newState;
    })
)

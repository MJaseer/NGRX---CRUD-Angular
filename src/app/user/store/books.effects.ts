import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { UserService } from '../user.service'
import { Store, select } from "@ngrx/store";
import { addNewBookAPI, addNewBookAPISuccess, bookFetchAPISuccess, deleteBookAPI, deleteBookAPISuccess, invokeBooksAPI, updateBookAPI, updateBookAPISuccess } from "./books.action";
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { selectBooks } from "./books.selector";
import { Appstate } from "src/app/global/store/appstate";
import { setAPIStatus } from "src/app/global/store/app.action";

@Injectable()
export class BooksEffects {
  constructor(
    private action$: Actions,
    private bookService: UserService,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  loadAllBooks$ = createEffect(() =>
    this.action$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      mergeMap(([, bookformStore]) => {
        if (bookformStore.length > 0) {
          return EMPTY;
        }
        return this.bookService
          .get()
          .pipe(map((data) => bookFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addNewBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: { apiRespondMessag: '', apiStatus: '' }
          })
        )
        return this.bookService.create(action.newBook)
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiRespondMessag: '', apiStatus: 'success' }
                })
              );
              return addNewBookAPISuccess({ newBook: data })
            })
          )
      })
    )
  })

  updateBookAPI$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus(
            {
              apiStatus: { apiRespondMessag: '', apiStatus: '' }
            })
        )
        return this.bookService.update(action.updateBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiRespondMessag: '', apiStatus: 'success' }
              })
            )
            return updateBookAPISuccess({ updateBook: data });
          })
        )
      })
    )
  })

  deleteBookAPI$ = createEffect(()=>{
    return this.action$.pipe(
      ofType(deleteBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({
              apiStatus:{apiRespondMessag:'',apiStatus:''}
            })
        )
        return this.bookService.delete(action.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus:{apiRespondMessag:'',apiStatus:'success'}
              })
            )
            return deleteBookAPISuccess({id:action.id})
          })
        )
      })
    )
  })
}

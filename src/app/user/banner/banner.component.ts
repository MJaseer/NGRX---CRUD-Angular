import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { deleteBookAPI, invokeBooksAPI } from '../store/books.action';
import { Appstate } from 'src/app/global/store/appstate';
import { selectAppState } from 'src/app/global/store/app.selector';
import { setAPIStatus } from 'src/app/global/store/app.action';
import { DailogComponent } from '../dailog/dailog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    public dialog: MatDialog
  ) { }

  allSuperHeroes$ = this.store.pipe(select(selectBooks))

  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {

    this.deleteModal

    this.store.dispatch(invokeBooksAPI())
  }

  bookData: any;

  openDialog(id: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.allSuperHeroes$.forEach((data) => {
      this.bookData = data.filter((_) => _.id == id)
    })

    this.dialog.open(DailogComponent, {
      width: '250px',
      data:this.bookData,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  delete(id: number) {
    this.store.dispatch(
      deleteBookAPI({ id: id })
    )
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiRespondMessag: '', apiStatus: '' } })
        )
      }
    })
  }

}

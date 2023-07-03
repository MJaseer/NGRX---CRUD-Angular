import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/global/store/appstate';
import { deleteBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/global/store/app.selector';
import { setAPIStatus } from 'src/app/global/store/app.action';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  standalone: true,
  styleUrls: ['./dailog.component.css'],
  imports: [
    NgFor
  ]
})

export class DailogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DailogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private store: Store,
    private appStore: Store<Appstate>
    ) { }

  bookData: any;

  ngOnInit(): void {
    this.bookData = this.dialogData;
    console.log(this.bookData);
    console.log(this.bookData[0].name)
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
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

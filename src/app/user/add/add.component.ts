import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/global/store/appstate';
import { Books } from '../store/books';
import { addNewBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/global/store/app.selector';
import { setAPIStatus } from 'src/app/global/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) { }

  bookForm: Books = {
    id: 0,  
    franchise: '',
    imageurl: '',
    name: ''
  }


  save() {
    
    this.store.dispatch(addNewBookAPI({ newBook: this.bookForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiRespondMessag: '', apiStatus: '' } })
        )
        this.router.navigate(['/user/home'])
      }
    })
  }
}

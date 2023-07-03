import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/global/store/appstate';
import { Books } from '../store/books';
import { switchMap } from 'rxjs';
import { selectBookById } from '../store/books.selector';
import { invokeBooksAPI, updateBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/global/store/app.selector';
import { setAPIStatus } from 'src/app/global/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  bookForm: Books = {
    id: 0,
    franchise: '',
    imageurl: '',
    name: ''
  }

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        let id = Number(params.get('id'));
        return this.store.pipe(select(selectBookById(id)))
      })
    )
    fetchData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data }
      } else {
        this.router.navigate(['/user/home'])
      }
    })
  }

  update() {
    this.store.dispatch(
      updateBookAPI({ updateBook:{ ...this.bookForm} })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState))
    apiStatus$.subscribe((apState) => {
      if(apState.apiStatus == 'success'){
        this.appStore.dispatch(
          setAPIStatus({apiStatus:{apiRespondMessag:'',apiStatus:''}})
        )
        this.router.navigate(['/user/home'])
      }
    })
  }

}

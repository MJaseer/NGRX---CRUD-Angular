import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/books.effects';
import { AddComponent } from './add/add.component';
import { BannerComponent } from './banner/banner.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { FilterInterceptorInterceptor } from './filter-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    AddComponent,
    BannerComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    StoreModule.forFeature('mybooks',bookReducer),
    EffectsModule.forFeature([BooksEffects]),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    // DailogComponent
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:FilterInterceptorInterceptor,
      multi:true
    },
  ],
})
export class UserModule { }

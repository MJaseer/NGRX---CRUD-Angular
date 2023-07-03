import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { BannerComponent } from './banner/banner.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'home', component: BannerComponent },
      { path: 'edit/:id', component:EditComponent},
      { path: '', redirectTo: '/user/home', pathMatch: 'full' },
    ]
  },
  {path:'',redirectTo:'/user/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

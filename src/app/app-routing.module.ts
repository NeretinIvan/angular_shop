import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './ui/gallery/gallery.component';
import { GalleryModule } from './ui/gallery/gallery.module';

import { NotFoundPageComponent } from './ui/not-found-page/not-found-page.component';


const APP_ROUTES: Routes = [
  {path: '', component: GalleryComponent},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '/404'}
]


@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    GalleryModule,
    RouterModule.forRoot(APP_ROUTES),
  ]
})
export class AppRoutingModule { }

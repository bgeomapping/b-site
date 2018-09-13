import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PageComponent } from './core/page/page.component';
import { PostComponent } from './core/posts/post/post.component';
import { MapComponent } from './maps/map/map.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { AboutComponent } from './core/about/about.component';


const appRoutes: Routes = [
  { path: 'map/:map', component: MapComponent, data: {title: 'Map'}},
  { path: 'post/:post', component: PostComponent, data: {title: 'Post'}},
  { path: 'posts/category/:category', component: HomeComponent, data: {title: 'Posts'}},
  { path: 'posts', component: HomeComponent ,data: {title: 'Posts'}},
  { path: 'about', component: AboutComponent, data: {title: 'About'}},
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: '**', component: NotfoundComponent, data: {title: 'Not Found'}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

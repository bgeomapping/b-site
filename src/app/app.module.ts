import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MastheadComponent } from './masthead/masthead.component';
import { PostComponent } from './post/post.component';
import { PageComponent } from './page/page.component';


import { MarkdownService } from './markdown.service';
import { PostsComponent } from './posts/posts.component';
import { PostCardComponent } from './post-card/post-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MomentPipePipe } from './moment-pipe.pipe';
import { BikeCommuteComponent } from './post/bike-commute/bike-commute.component';
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostFooterComponent } from './post-footer/post-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MastheadComponent,
    PostComponent,
    PageComponent,
    PostsComponent,
    PostCardComponent,
    SidebarComponent,
    MomentPipePipe,
    BikeCommuteComponent,
    PostHeaderComponent,
    PostFooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    MarkdownService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

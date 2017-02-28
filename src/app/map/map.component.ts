import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';
import { PostsService } from '../posts.service';



@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;
  constructor(
    private route: ActivatedRoute,
    private ps: PostsService
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params =>  
       Object.keys(this.ps.posts).some(k => {
         let post = this.ps.posts[k];
         if (post.key === params['map']) {
            this.map = post.map
            return true;
         }
         return false;
       }) 
   
    )
 
  }


}

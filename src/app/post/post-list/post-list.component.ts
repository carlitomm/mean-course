import { Component, OnDestroy, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs'

import { from } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  posts: Post[] = [];
  isLoading = false;
  totalPost = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]
  private postsSub: Subscription;

  constructor(public postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.postService.getPost(this.postsPerPage, this.currentPage);
    this.isLoading = true;
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe( (postsData: {posts: Post[], postCount: number}) => {
        this.posts = postsData.posts;
        this.isLoading = false;
        this.totalPost = postsData.postCount;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onChangePage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPost(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string){
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPost(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }
}

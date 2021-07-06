import { Component, OnDestroy, OnInit} from '@angular/core';
<<<<<<< HEAD
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs'

import { from } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
=======
import { Subscription } from 'rxjs'

import { from } from 'rxjs';
>>>>>>> 0201c3bba35ff2d852823546ff75c11c677fa012
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

<<<<<<< HEAD
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
=======

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe( (posts: Post[]) => {
        this.posts = posts;
      });
>>>>>>> 0201c3bba35ff2d852823546ff75c11c677fa012
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
<<<<<<< HEAD
    this.authListenerSubs.unsubscribe();
=======
>>>>>>> 0201c3bba35ff2d852823546ff75c11c677fa012
  }
}

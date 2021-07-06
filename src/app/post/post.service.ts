import { Injectable } from '@angular/core'
<<<<<<< HEAD
import { Subject } from 'rxjs'
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{posts: Post[], postCount: number}>()

  constructor(private http: HttpClient, private router: Router) { }

  getPost(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/post' + queryParams)
      .pipe(map((postData) => {
        return { posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          }
        }), maxPost: postData.maxPosts};
      }))
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPost
        });
=======
import { Subject }  from 'rxjs'
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) {}

  getPost() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/post')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts])
>>>>>>> 0201c3bba35ff2d852823546ff75c11c677fa012
      });
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

<<<<<<< HEAD
  getOnePost(id: string){
    return this.http.get<{_id:string, title:string, content:string, imagePath: string}>(
      'http://localhost:3000/api/post/' + id)
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/post', postData)
      .subscribe((responseData) => {

        this.router.navigate(["/"])
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image) === 'object'){
      const postData = new FormData();
      postData.append("id",id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      const postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }
    this.http
      .put('http://localhost:3000/api/post/' + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"])
      })
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/post/' + postId)
  }
=======
  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/post', post)
      .subscribe((responseData)=>{
        console.log(responseData);
        this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      });
  }
>>>>>>> 0201c3bba35ff2d852823546ff75c11c677fa012
}

import { NgForOf } from '@angular/common';
<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_ASYNC_VALIDATORS, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { mimeType } from './mime-type.validator'
=======
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
>>>>>>> 0201c3bba35ff2d852823546ff75c11c677fa012

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredContent = '';
  enteredTitle = '';
<<<<<<< HEAD
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create'
  private postId: string
  post: Post;

  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getOnePost(this.postId)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              imagePath: postData.imagePath };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath
            });
          })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  inImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
=======

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    if (form.invalid){
      return;
    }
    this.postService.addPost(form.value.title, form.value.content)
    form.resetForm();
>>>>>>> 0201c3bba35ff2d852823546ff75c11c677fa012
  };

}

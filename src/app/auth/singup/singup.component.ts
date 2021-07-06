import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  isLoading= false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSingup(form: NgForm){
    this.authService.createUser(form.value.email, form.value.password)
  }

}

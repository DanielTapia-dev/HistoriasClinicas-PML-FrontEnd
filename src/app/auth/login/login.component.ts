import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup = this.fb.group({
    'usuario': ['dtapia', Validators.required],
    'password': ['12345', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string){
    return this.LoginForm.controls[campo].errors && this.LoginForm.controls[campo].touched
  }

  Login(){
    console.log(this.LoginForm.value);
    this.router.navigateByUrl('/pages');
  }

}

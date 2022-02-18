import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup = this.fb.group({
    'usuario': ['dtapia', Validators.required],
    'password': ['123456', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.LoginForm.controls[campo].errors && this.LoginForm.controls[campo].touched
  }

  Login() {
    console.log(this.LoginForm.value);
    this.authService.login(this.LoginForm.value.usuario, this.LoginForm.value.password).subscribe(resp => {
      console.log(resp);
      if (resp === true) {
        this.router.navigateByUrl('/pages');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Problema al autentificar',
          confirmButtonColor: '#0ea3de',
        })
      }
    });

  }

}

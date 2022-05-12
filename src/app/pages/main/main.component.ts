import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  modal: any;
  pantallaPosterior: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.modal = document.querySelector('#Modal');
    this.pantallaPosterior = document.querySelector('#PantallaPosterior');
    this.pantallaPosterior.classList.add('opacity-60');
    this.pantallaPosterior.classList.add('pointer-events-none');
  }

  CerrarModal() {
    this.modal.classList.add('hidden');
    this.pantallaPosterior.classList.remove('opacity-60');
    this.pantallaPosterior.classList.remove('pointer-events-none');
  }

  Logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

}

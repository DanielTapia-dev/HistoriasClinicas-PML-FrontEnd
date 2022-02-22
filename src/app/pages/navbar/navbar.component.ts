import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  sidebar: any;
  sidebarMobile: any;

  ngOnInit(): void {
    this.sidebar = document.querySelector('aside');
    this.sidebarMobile = document.querySelector('#sidebarMobile');
  }

  hiddenSidebar() {
    if (this.sidebar.classList.contains('sm:block')) {
      this.sidebar.classList.replace('sm:block', 'sm:hidden');
    } else {
      this.sidebar.classList.replace('sm:hidden', 'sm:block');
    }
    if (this.sidebarMobile.classList.contains('hidden')) {
      this.sidebarMobile.classList.remove('hidden');
    } else {
      this.sidebarMobile.classList.add('hidden');
    }
  }

}

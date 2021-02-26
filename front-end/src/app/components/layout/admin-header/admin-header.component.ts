import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  isLogged : boolean = false;
  routes: any;
  email: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(){
    const { email } : any = jwt_decode(localStorage.getItem('JWT'));
    this.email = email;
    this.setRoutes();
  }

  setRoutes() {
    this.isLogged = true;
    this.routes = [
      { link: '/admin/orders/all', detail: 'Orders' },
    ];
  }

  logout() {
    localStorage.clear();
    this.isLogged = false;
    this.router.navigate(['home']);
  }

}

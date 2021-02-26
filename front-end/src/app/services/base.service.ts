import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  urlServer : string = environment.url;
  endPoint : string = '';

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  private getHttpHeaders() {
    try {
      let httpOptions = {};

      if(localStorage.getItem('JWT')) {
        httpOptions = {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('JWT')}`
          })
        }
      }

      return httpOptions;

    } catch (error) {
      console.log(error);
    }
  }

  processError() {
    try {
      localStorage.clear();
      this.router.navigate(['/auth']);
    } catch (error) {
      throw error;
    }
  }

  setEndpoint(endPoint) {
    this.endPoint = endPoint;
  }

  async get() {
    try {
      const options = this.getHttpHeaders();
      return await this.http
                       .get(`${this.urlServer}/${this.endPoint}`, options) 
                       .toPromise();
    } catch (error) {
      throw error;
    }
  }

  async post(obj){
    try {
      const options = this.getHttpHeaders();
      return await this.http.post(`${this.urlServer}/${this.endPoint}`, obj, options).toPromise();
    } catch (error) {
      console.log(error);
      if(error.status === 401){
        this.processError();
      }
    }
  }

  async delete() {
    try {
      const options = this.getHttpHeaders();
      return await this.http.delete(`${this.urlServer}/${this.endPoint}`, options).toPromise();
    } catch (error) {
      if(error.status === 401) {
        this.processError();
      } else {
        throw error;
      }
    }
  }

}

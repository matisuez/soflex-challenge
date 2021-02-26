import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService {

  createOrder(obj) {
    try {
      console.log(obj);
      this.setEndpoint('admin/orders');
      return this.post(obj);
    } catch (error) {
      throw error;
    }
  }

  getAllOrders() {
    try {
      this.setEndpoint('admin/orders');
      return this.get();
    } catch (error) {
      throw error;
    }
  }

  getOrder(id) {
    try {
      this.setEndpoint(`admin/orders/${id}`);
      return this.get();
    } catch (error) {
      throw error;
    }
  }

  deleteOrder(id) {
    try {
      this.setEndpoint(`admin/orders/${id}`);
      return this.delete();
    } catch (error) {
      throw error;
    }
  }

  getCustomers() {
    try {
      this.setEndpoint(`admin/customers`);
      return this.get();
    } catch (error) {
      throw error;
    }
  }

  getProducts() {
    try {
      this.setEndpoint(`admin/products`);
      return this.get();
    } catch (error) {
      throw error;
    }
  }

}



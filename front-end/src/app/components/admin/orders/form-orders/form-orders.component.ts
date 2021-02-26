import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/admin/orders.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrls: ['./form-orders.component.css']
})
export class FormOrdersComponent implements OnInit {

  form : FormGroup;
  formCreate : any = { fecha: '', clienteId: '' };
  isLoaded : boolean;
  reason : string;
  customers: any = [];
  products : any = [];
  productsSelected: any = [];
  order: any;
  productDetailToEdit: any;
  showEditProductDetail: boolean = false;

  @ViewChild('tbodyDetalle') tbodyDetalle;
  @ViewChild('trProductEditDetail') trProductEditDetail;

  constructor(
    private service : OrdersService,
    private router : Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.reason = this.activatedRoute.snapshot.params.id;
    await this.getCustomers();
    await this.getProducts();
    if(this.reason == 'new') {
      this.createForm(this.formCreate);
    } else {
      await this.getOrder();
      this.createForm(this.order);
      console.log(this.order);
    }
  }

  private async getOrder() {
    const {order} : any = await this.service.getOrder(this.reason);
    console.log(order);
  }

  private createForm(obj) {
    this.isLoaded = false;
    this.form = new FormGroup({
      fecha: new FormControl(obj.fecha, [ Validators.required]),
      clienteId: new FormControl(null, [ Validators.required])
    });
    this.isLoaded = !this.isLoaded;
  }

  private async getCustomers() {
    const { customers } : any = await this.service.getCustomers();
    this.customers = customers;
  }

  private async getProducts() {
    const { products } : any = await this.service.getProducts();
    this.products = products;
  }

  private addProductToOrder(p) {

    const productoExist = this.productsSelected.find( ps => ps.productoId === p.productoId);

    if(productoExist == undefined) {
      this.productsSelected.push({
        productoId: p.productoId,
        descripcion: p.descripcion,
        cantidad: 1,
        precio: p.precio 
      });
    } else {
      Swal.fire('El producto ya se encuentra en la orden.');
    }
    
  }

  private getProductoDetail(id) {
    this.productDetailToEdit = this.productsSelected.find(ps => ps.productoId == id);
    this.showEditProductDetail = true;
  }

  editProductDetail(p){
    p = {
      productoId: p.productoId,
      cantidad: parseInt(this.trProductEditDetail.nativeElement.children[2].children[0].value),
      precio: parseFloat(this.trProductEditDetail.nativeElement.children[3].children[0].value)
    }
    for (const ps of this.productsSelected) {
      if(ps.productoId === p.productoId) {
        ps.cantidad = p.cantidad;
        ps.precio = p.precio;
      }
    }
  }

  private deleteProduct(id) {

    const { role } : any = localStorage.getItem('JWT');
    this.productsSelected = this.productsSelected.filter( ps => ps.productoId !== id);

  }

  private async  createOrder() {
    const orderToCreate = {
      fecha: this.form.value.fecha,
      clienteId: this.form.value.clienteId,
      detallePedido: this.productsSelected
    }
    console.log(orderToCreate);
    const { pedidoId } : any = await this.service.createOrder(orderToCreate);
    console.log(pedidoId);
  }

}

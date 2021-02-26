import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/admin/orders.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: any;

  constructor(
    private service : OrdersService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  async getOrders() {
    const { pedidos } : any = await this.service.getAllOrders();
    this.orders = pedidos;
  }

  async deleteOrder(id) {
    const { role } : any = jwt_decode(localStorage.getItem('JWT'));

    if(role === 1) {
      Swal.fire({
        title: 'Estas seguro de eliminar esta orden?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro!',
        cancelButtonText: 'No, prefiero mantenerlo!'
      })
      .then( async result => {
        if(result.value){
          const { pedidoId } : any = await this.service.deleteOrder(id);    
          if(pedidoId && pedidoId > 0) {
            await this.getOrders();
            Swal.fire('Eliminado!');
          } else {
            Swal.fire('Error al eliminar el pedido.')
          }
        } else if(result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado!');
        }
      });
    } else {
      Swal.fire('El pedido no se puede eliminar debido a que el usuario no tiene permisos para realizar cierta accion.');
    }   
    
  }

}

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];

  order = {
    customerName: '',
    customerEmail: '',
    customerMobile: '',
    productName: '',
    quantity: 1,
    totalPrice: 0,
    orderStatus: 'Pending'
  };

  editMode = false;
  editId = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.log(err)
    });
  }

  saveOrder() {
    this.orderService.addOrder(this.order).subscribe({
      next: () => {
        alert('Order Placed Successfully');
        this.getAllOrders();
        this.resetForm();
      },
      error: (err) => console.log(err)
    });
  }

  editOrder(order: any) {
    this.order = { ...order };
    this.editId = order.id;
    this.editMode = true;
  }

  updateOrder() {
    this.orderService.updateOrder(this.editId, this.order).subscribe({
      next: () => {
        alert('Order Updated Successfully');
        this.getAllOrders();
        this.resetForm();
      },
      error: (err) => console.log(err)
    });
  }

  deleteOrder(id: number) {
    if (confirm('Delete this order?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => {
          alert('Order Deleted Successfully');
          this.getAllOrders();
        },
        error: (err) => console.log(err)
      });
    }
  }

  resetForm() {
    this.order = {
      customerName: '',
      customerEmail: '',
      customerMobile: '',
      productName: '',
      quantity: 1,
      totalPrice: 0,
      orderStatus: 'Pending'
    };

    this.editMode = false;
    this.editId = 0;
  }

}
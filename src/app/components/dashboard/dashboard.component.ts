import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adminName = 'Subhalaxmi';
  today = new Date();

  totalUsers = 0;
  totalProducts = 0;
  totalOrders = 89;
  totalRevenue = 256000;
  // recentOrders: any[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {

    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.totalUsers = data.length;
      }
    });

    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.totalProducts = data.length;
      }
    });

this.orderService.getOrders().subscribe({
  next: (data: any) => {

    this.totalOrders = data.length;

    this.totalRevenue = data.reduce(
      (sum: number, order: any) => sum + order.totalPrice,
      0
    );

    // this.recentOreders = data.slice(-5).reverse();

  }
});

  }

}
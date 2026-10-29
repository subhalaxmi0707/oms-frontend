import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://oms-backend-pr2l.onrender.com/api/orders';

  constructor(private http: HttpClient) { }

  // Get All Orders
  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add Order
  addOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  // Update Order
  updateOrder(id: number, order: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, order);
  }

  // Delete Order
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Get Order By Id
  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

}

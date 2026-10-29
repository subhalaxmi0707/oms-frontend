import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://oms-backend-pr2l.onrender.com/api/users';

  constructor(private http: HttpClient) { }

  // Get All Users
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add User
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Update User
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Delete User
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

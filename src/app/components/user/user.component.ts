import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any[] = [];

  user = {
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    role: ''
  };

  editMode = false;
  editId = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  // Get All Users
  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Add User
  saveUser() {
    this.userService.addUser(this.user).subscribe({
      next: () => {
        alert("User Added Successfully");
        this.getAllUsers();
        this.resetForm();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Edit User
  editUser(user: any) {

    this.user = {
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      role: user.role
    };

    this.editId = user.id;
    this.editMode = true;

  }

  // Update User
  updateUser() {

    this.userService.updateUser(this.editId, this.user).subscribe({

      next: () => {

        alert("User Updated Successfully");

        this.getAllUsers();

        this.resetForm();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // Delete User
  deleteUser(id: number) {

    if(confirm("Are you sure you want to delete this user?")){

      this.userService.deleteUser(id).subscribe({

        next: () => {

          alert("User Deleted Successfully");

          this.getAllUsers();

        },

        error: (err) => {

          console.log(err);

        }

      });

    }

  }

  // Reset Form
  resetForm() {

    this.user = {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      role: ''
    };

    this.editMode = false;
    this.editId = 0;

  }

}
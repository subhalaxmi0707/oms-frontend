import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
searchText: string = '';

product = {
  productName: '',
  description: '',
  price: 0,
  quantity: 0,
  category: '',
  imageUrl: '',
  status: 'Available'
};

  editMode = false;
  editId = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Get All Products
  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Save Product
  saveProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        alert('Product Added Successfully');
        this.getAllProducts();
        this.resetForm();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Edit Product
  editProduct(product: any) {

  this.product = {
  productName: product.productName,
  description: product.description,
  price: product.price,
  quantity: product.quantity,
  category: product.category,
  imageUrl: product.imageUrl,
  status: product.status
};

    this.editId = product.id;
    this.editMode = true;

  }

  // Update Product
  updateProduct() {

    this.productService.updateProduct(this.editId, this.product).subscribe({

      next: () => {

        alert("Product Updated Successfully");

        this.getAllProducts();

        this.resetForm();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // Delete Product
  deleteProduct(id: number) {

    if(confirm("Are you sure you want to delete this product?")){

      this.productService.deleteProduct(id).subscribe({

        next: () => {

          alert("Product Deleted Successfully");

          this.getAllProducts();

        },

        error: (err) => {

          console.log(err);

        }

      });

    }

  }

  searchProduct() {

  this.filteredProducts = this.products.filter((p: any) =>

    p.productName.toLowerCase().includes(this.searchText.toLowerCase()) ||

    p.category.toLowerCase().includes(this.searchText.toLowerCase())

  );

}

  // Reset Form
  resetForm() {

this.product = {
  productName: '',
  description: '',
  price: 0,
  quantity: 0,
  category: '',
  imageUrl: '',
  status: 'Available'
};
    this.editMode = false;
    this.editId = 0;
  }
}
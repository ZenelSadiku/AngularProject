// src/app/products/products.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    NavbarComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ['name', 'category', 'price', 'date', 'action'];
  private subscription!: Subscription;

  constructor(private dialog: MatDialog, private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService.products$.subscribe((products: Product[]) => {
      this.dataSource.data = products;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { product: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedProducts = [...this.productService.getProducts(), result];
        this.productService.updateProducts(updatedProducts);
        alert('Product added successfully!');
      }
    });
  }

  openEditDialog(product: Product, index: number): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { product: { ...product } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedProducts = this.productService.getProducts();
        updatedProducts[index] = result;
        this.productService.updateProducts(updatedProducts);
        alert('Product updated successfully!');
      }
    });
  }

  deleteProduct(index: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = this.productService.getProducts();
      updatedProducts.splice(index, 1);
      this.productService.updateProducts(updatedProducts);
      alert('Product deleted successfully!');
    }
  }
}

// src/app/products/product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([
    { name: 'Apple Fruits', category: 'Fruits', price: 120.00, date: '01.01.2023' },
    { name: 'iPhone', category: 'Electronics', price: 1400.00, date: '02.01.2023' }
  ]);

  products$ = this.productsSubject.asObservable();

  getProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  updateProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }
}

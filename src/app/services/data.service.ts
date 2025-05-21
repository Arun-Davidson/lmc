import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DataItem {
  id: number;
  name: string;
  category: string;
  value: number;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private mockData: DataItem[] = [
    {
      id: 1,
      name: 'Product A',
      category: 'Electronics',
      value: 120,
      description: 'High-quality electronic device.',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Service B',
      category: 'Software',
      value: 50,
      description: 'Monthly subscription for software.',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Item C',
      category: 'Hardware',
      value: 300,
      description: 'Essential hardware component.',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Product D',
      category: 'Electronics',
      value: 80,
      description: 'Portable electronic gadget.',
      status: 'Pending',
    },
    {
      id: 5,
      name: 'Service E',
      category: 'Consulting',
      value: 250,
      description: 'Professional consulting service.',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Item F',
      category: 'Software',
      value: 150,
      description: 'Software license for enterprise.',
      status: 'Active',
    },
    {
      id: 7,
      name: 'Product G',
      category: 'Hardware',
      value: 90,
      description: 'Small hardware accessory.',
      status: 'Inactive',
    },
    {
      id: 8,
      name: 'Service H',
      category: 'Support',
      value: 75,
      description: '24/7 technical support.',
      status: 'Active',
    },
  ];

  constructor() {}

  searchData(query: string): Observable<DataItem[]> {
    const filteredData = this.mockData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredData).pipe(delay(300));
  }

  getAllData(): Observable<DataItem[]> {
    return of(this.mockData).pipe(delay(300));
  }
}

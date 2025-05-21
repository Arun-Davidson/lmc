import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface DataItem {
  id: number | undefined;
  name: string;
  value: number;
  status: string;
  category: string;
  description: string;
  isNewRow?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly mockData: DataItem[] = [
    { id: 1, name: 'Item A', value: 100, status: 'Active', category: 'Electronics', description: 'Description for Item A' },
    { id: 2, name: 'Item B', value: 150, status: 'Inactive', category: 'Books', description: 'Description for Item B' },
    { id: 3, name: 'Item C', value: 200, status: 'Active', category: 'Home Goods', description: 'Description for Item C' },
    { id: 4, name: 'Item D', value: 75, status: 'Pending', category: 'Electronics', description: 'Description for Item D' },
    { id: 5, name: 'Item E', value: 300, status: 'Active', category: 'Books', description: 'Description for Item E' },
    { id: 6, name: 'Item F', value: 120, status: 'Active', category: 'Home Goods', description: 'Description for Item F' },
    { id: 7, name: 'Item G', value: 90, status: 'Inactive', category: 'Sports', description: 'Description for Item G' },
    { id: 8, name: 'Item H', value: 250, status: 'Active', category: 'Electronics', description: 'Description for Item H' },
    { id: 9, name: 'Item I', value: 180, status: 'Active', category: 'Sports', description: 'Description for Item I' },
    { id: 10, name: 'Item J', value: 50, status: 'Pending', category: 'Books', description: 'Description for Item J' }
  ];

  constructor() { }

  getAllData(): Observable<DataItem[]> {
    return of(this.mockData.map(item => ({ ...item, isNewRow: false }))).pipe(delay(500)); // Mark existing as not new
  }

  searchData(searchTerm: string): Observable<DataItem[]> {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return of(this.mockData.filter(item =>
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.category.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.status.toLowerCase().includes(lowerCaseSearchTerm)
    ).map(item => ({ ...item, isNewRow: false }))).pipe(delay(300)); // Mark existing as not new
  }
}
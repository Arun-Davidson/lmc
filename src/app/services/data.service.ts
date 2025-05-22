import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface DataItem {
  id: string | undefined;
  name: string;
  value: number;
  status: string;
  category: string;
  description: string;
  isNewRow?: boolean;
  project_code?: string; // <--- New optional field for Tab 2
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly mockData: DataItem[] = [
    // Data for Tab 1 (or common data)
    { id: 'A001', name: 'Laptop Pro', value: 1200, status: 'Active', category: 'Electronics', description: 'High-performance laptop.' },
    { id: 'A002', name: 'Desk Chair', value: 250, status: 'Inactive', category: 'Office Furniture', description: 'Ergonomic office chair.' },
    { id: 'A003', name: 'Software License', value: 500, status: 'Active', category: 'Software', description: 'Annual software subscription.' },
    { id: 'A004', name: 'External SSD', value: 150, status: 'Pending', category: 'Electronics', description: 'Portable solid-state drive.' },
    { id: 'A005', name: 'Monitor 27"', value: 300, status: 'Active', category: 'Electronics', description: 'Large display monitor.' },
    { id: 'A006', name: 'Webcam HD', value: 70, status: 'Active', category: 'Peripherals', description: 'High-definition webcam.' },
    { id: 'A007', name: 'Keyboard Mech', value: 120, status: 'Inactive', category: 'Peripherals', description: 'Mechanical gaming keyboard.' },
    { id: 'A008', name: 'Mouse Wireless', value: 45, status: 'Active', category: 'Peripherals', description: 'Wireless optical mouse.' },
    { id: 'A009', name: 'Printer Laser', value: 280, status: 'Active', category: 'Office Equipment', description: 'Monochrome laser printer.' },
    { id: 'A010', name: 'Router WiFi 6', value: 90, status: 'Pending', category: 'Networking', description: 'Next-gen Wi-Fi router.' },

    // Data specifically for Tab 2 (with project_code)
    { id: 'P101', name: 'Project Alpha', value: 10000, status: 'Active', category: 'Project', description: 'Initial phase of Alpha project.', project_code: 'PA-001' },
    { id: 'P102', name: 'Task Beta', value: 2500, status: 'Pending', category: 'Task', description: 'Development task for Beta.', project_code: 'PB-002' },
    { id: 'P103', name: 'Bug Fix Gamma', value: 500, status: 'Resolved', category: 'Bug', description: 'Critical bug resolution.', project_code: 'BG-003' },
    { id: 'P104', name: 'Feature Delta', value: 7500, status: 'Active', category: 'Feature', description: 'New feature implementation.', project_code: 'PD-004' },
    { id: 'P105', name: 'Support Ticket Epsilon', value: 100, status: 'Closed', category: 'Support', description: 'Customer support request.', project_code: 'SE-005' },
    { id: 'P106', name: 'Deployment Zeta', value: 2000, status: 'Completed', category: 'Deployment', description: 'Production deployment.', project_code: 'DZ-006' },
  ];

  constructor() { }

  getAllData(): Observable<DataItem[]> {
    // Ensure existing data is marked as not new
    return of(this.mockData.map(item => ({ ...item, isNewRow: false }))).pipe(delay(500));
  }

  searchData(searchTerm: string): Observable<DataItem[]> {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return of(this.mockData.filter(item =>
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.category.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      (item.project_code && item.project_code.toLowerCase().includes(lowerCaseSearchTerm)) // Search new field
    ).map(item => ({ ...item, isNewRow: false }))).pipe(delay(300));
  }
}
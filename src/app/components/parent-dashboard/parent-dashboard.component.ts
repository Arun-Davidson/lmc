import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, DataItem } from '../../services/data.service';
import { GridApi } from 'ag-grid-community';
import { TabSectionComponent } from '../tab-section/tab-section.component';
import * as XLSX from 'xlsx';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SearchComponent,
    TabSectionComponent
  ],
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
  @ViewChild(TabSectionComponent) tabSection!: TabSectionComponent;

  allData: DataItem[] = []; // This will hold the full, unfiltered data from the service
  displayedData: DataItem[] = []; // This is the data passed to the tab section (after search)
  boundData: DataItem[] = [];

  private activeGridApi: GridApi | null = null;
  private activeTabName: string = 'tab1';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllData().subscribe(data => {
      this.allData = data;
      this.displayedData = data;
      this.updateBoundData(data);
      // Ensure tabSection gets initial data immediately
      if (this.tabSection) {
        this.tabSection.filteredData = data;
      }
    });
  }

  onSearchTermChange(searchTerm: string): void {
    this.dataService.searchData(searchTerm).subscribe(data => {
      this.displayedData = data;
      this.updateBoundData(data);
      if (this.tabSection) {
        this.tabSection.filteredData = data; // Update tab section with new filtered data
      }
    });
  }

  private updateBoundData(data: DataItem[]): void {
    this.boundData = data.length > 0 ? data.slice(0, 4) : [];
  }

  onActiveTabGridApiReady(event: { gridApi: GridApi | null, tabName: string }): void {
    this.activeGridApi = event.gridApi;
    this.activeTabName = event.tabName;
  }

  exportAllData(): void {
    if (!this.tabSection) {
      alert('Tab section not initialized. Cannot export data.');
      return;
    }

    const tab1Data = this.tabSection.tab1Data; // Get data directly from tabSection
    const tab2Data = this.tabSection.tab2Data; // Get data directly from tabSection

    if (tab1Data.length === 0 && tab2Data.length === 0) {
        alert('No data in any tab to export.');
        return;
    }

    const workbook = XLSX.utils.book_new();

    if (tab1Data.length > 0) {
      const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tab1Data);
      XLSX.utils.book_append_sheet(workbook, ws1, 'Product Data'); // <--- Changed sheet name
    }

    if (tab2Data.length > 0) {
      const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tab2Data);
      XLSX.utils.book_append_sheet(workbook, ws2, 'Task Data'); // <--- Changed sheet name
    }

    XLSX.writeFile(workbook, 'Dashboard_Combined_Data.xlsx'); // <--- Changed file name
  }

  exportCurrentTab(): void {
    if (this.tabSection && this.activeTabName) {
      this.tabSection.exportSelectedTabGrid(this.activeTabName as 'tab1' | 'tab2');
    } else {
      alert('Cannot export: Tab section not initialized or active tab not determined.');
    }
  }
}
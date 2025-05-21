import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, DataItem } from '../../services/data.service';
import { GridApi } from 'ag-grid-community';
import { TabSectionComponent } from '../tab-section/tab-section.component';
import * as XLSX from 'xlsx'; // Import the xlsx library

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Child Component Imports
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SearchComponent,
    TabSectionComponent
  ],
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
  @ViewChild(TabSectionComponent) tabSection!: TabSectionComponent;

  allData: DataItem[] = [];
  displayedData: DataItem[] = [];
  boundData: DataItem[] = [];

  private activeGridApi: GridApi | null = null;
  private activeTabName: string = 'tab1';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllData().subscribe(data => {
      this.allData = data;
      this.displayedData = data;
      this.updateBoundData(data);
    });
  }

  onSearchTermChange(searchTerm: string): void {
    this.dataService.searchData(searchTerm).subscribe(data => {
      this.displayedData = data;
      this.updateBoundData(data);
    });
  }

  private updateBoundData(data: DataItem[]): void {
    // Only display first 4 items if data exists, otherwise keep boundData empty
    this.boundData = data.length > 0 ? data.slice(0, 4) : [];
  }

  onActiveTabGridApiReady(event: { gridApi: GridApi | null, tabName: string }): void {
    this.activeGridApi = event.gridApi;
    this.activeTabName = event.tabName;
  }

  // Modified exportAllData method
  exportAllData(): void {
    if (this.allData.length === 0) {
      alert('No data to export.');
      return;
    }

    // Get data for each tab directly from the tabSection component
    // Note: This relies on tabSection having up-to-date tab1Data and tab2Data
    const tab1Data = this.tabSection?.tab1Data || [];
    const tab2Data = this.tabSection?.tab2Data || [];

    if (tab1Data.length === 0 && tab2Data.length === 0) {
        alert('No data in any tab to export.');
        return;
    }

    const workbook = XLSX.utils.book_new();

    if (tab1Data.length > 0) {
      const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tab1Data);
      XLSX.utils.book_append_sheet(workbook, ws1, 'Tab 1 Data'); // Sheet named 'Tab 1 Data'
    }

    if (tab2Data.length > 0) {
      const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tab2Data);
      XLSX.utils.book_append_sheet(workbook, ws2, 'Tab 2 Data'); // Sheet named 'Tab 2 Data'
    }

    // Generate the Excel file
    XLSX.writeFile(workbook, 'All_Dashboard_Data.xlsx');
  }

  exportCurrentTab(): void {
    if (this.tabSection) {
      this.tabSection.exportSelectedTabGrid(this.activeTabName as 'tab1' | 'tab2');
    } else {
      alert('Tab section not initialized or no active tab.');
    }
  }
}
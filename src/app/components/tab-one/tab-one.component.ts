import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DataItem } from '../../services/data.service';
import { tab1ColumnDefs, tab1DefaultColDef } from '../../common/tab1-column-defs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tab-one',
  standalone: true,
  imports: [
    AgGridAngular,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tab-one.component.html',
  styleUrls: ['./tab-one.component.scss']
})
export class TabOneComponent {
  @Input() data: DataItem[] = [];
  @Output() gridApiReady = new EventEmitter<GridApi>();

  public columnDefs: ColDef[] = tab1ColumnDefs;
  public defaultColDef: ColDef = tab1DefaultColDef;

  public defaultPageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 20, 50];

  private gridApi: GridApi | null = null;
  private newRowCounter: number = 1; // Counter for unique placeholder IDs

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApiReady.emit(this.gridApi);
  }

  exportGrid(): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv({ fileName: 'Tab1_Data.csv' });
    } else {
        console.warn('Tab 1 Grid API not ready for export.');
    }
  }

  addNewRow(): void {
    if (!this.gridApi) {
      console.warn('Grid API not available to add new row.');
      return;
    }

    const newRow: DataItem = {
      id: `NEW-${this.newRowCounter++}`, // <--- Assign a unique placeholder ID
      name: 'New Product',
      category: 'Electronics',
      value: 0,
      description: 'New product description...',
      status: 'Pending',
      isNewRow: true // Still useful for future logic if needed
    };

    this.gridApi.applyTransaction({
      add: [newRow],
      addIndex: this.gridApi.getDisplayedRowCount()
    });

    const rowIndex = this.gridApi.getDisplayedRowCount() - 1;
    this.gridApi.ensureIndexVisible(rowIndex, 'bottom');
    this.gridApi.startEditingCell({
      rowIndex: rowIndex,
      colKey: 'name' // <--- Start editing the 'name' column
    });
  }
}
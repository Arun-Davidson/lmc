import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DataItem } from '../../services/data.service';
import { commonColumnDefs, commonDefaultColDef } from '../../common/ag-grid-configs';

// Material Imports for the button
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tab-one',
  standalone: true,
  imports: [
    AgGridAngular,
    MatButtonModule, // <--- Add MatButtonModule
    MatIconModule    // <--- Add MatIconModule
  ],
  templateUrl: './tab-one.component.html',
  styleUrls: ['./tab-one.component.scss']
})
export class TabOneComponent {
  @Input() data: DataItem[] = [];
  @Output() gridApiReady = new EventEmitter<GridApi>();

  public columnDefs: ColDef[] = commonColumnDefs;
  public defaultColDef: ColDef = commonDefaultColDef;

  public defaultPageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 20, 50];

  private gridApi: GridApi | null = null;
  private newRowIdCounter: number = 1000; // Start counter for new rows

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

    // Create a new DataItem with default values
    const newRow: DataItem = {
      id: this.newRowIdCounter++, // Assign a unique ID
      name: 'New Item',
      category: 'Uncategorized',
      value: 0,
      description: 'Enter description here...',
      status: 'Pending'
    };

    // Add the new row to the grid
    this.gridApi.applyTransaction({
      add: [newRow],
      addIndex: this.gridApi.getDisplayedRowCount() // Add to the end
    });

    // Optional: Scroll to the new row and put it in edit mode
    const rowIndex = this.gridApi.getDisplayedRowCount() - 1;
    this.gridApi.ensureIndexVisible(rowIndex, 'bottom');
    this.gridApi.startEditingCell({
      rowIndex: rowIndex,
      colKey: 'name' // Start editing the 'name' column
    });
  }
}
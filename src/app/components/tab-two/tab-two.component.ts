import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DataItem } from '../../services/data.service';
import { commonColumnDefs, commonDefaultColDef } from '../../common/ag-grid-configs';

// Material Imports for the button
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tab-two',
  standalone: true,
  imports: [
    AgGridAngular,
    MatButtonModule, // <--- Add MatButtonModule
    MatIconModule    // <--- Add MatIconModule
  ],
  templateUrl: './tab-two.component.html',
  styleUrls: ['./tab-two.component.scss']
})
export class TabTwoComponent {
  @Input() data: DataItem[] = [];
  @Output() gridApiReady = new EventEmitter<GridApi>();

  public columnDefs: ColDef[] = commonColumnDefs;
  public defaultColDef: ColDef = commonDefaultColDef;

  public defaultPageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 20, 50];

  private gridApi: GridApi | null = null;
  private newRowIdCounter: number = 2000; // Different counter for Tab 2

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApiReady.emit(this.gridApi);
  }

  exportGrid(): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv({ fileName: 'Tab2_Data.csv' });
    } else {
        console.warn('Tab 2 Grid API not ready for export.');
    }
  }

  addNewRow(): void {
    if (!this.gridApi) {
      console.warn('Grid API not available to add new row.');
      return;
    }

    const newRow: DataItem = {
      id: this.newRowIdCounter++,
      name: 'New Item',
      category: 'Uncategorized',
      value: 0,
      description: 'Enter description here...',
      status: 'Pending'
    };

    this.gridApi.applyTransaction({
      add: [newRow],
      addIndex: this.gridApi.getDisplayedRowCount()
    });

    const rowIndex = this.gridApi.getDisplayedRowCount() - 1;
    this.gridApi.ensureIndexVisible(rowIndex, 'bottom');
    this.gridApi.startEditingCell({
      rowIndex: rowIndex,
      colKey: 'name'
    });
  }
}
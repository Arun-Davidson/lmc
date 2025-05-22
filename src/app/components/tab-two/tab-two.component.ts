import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DataItem } from '../../services/data.service';
import { tab2ColumnDefs, tab2DefaultColDef } from '../../common/tab2-column-defs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tab-two',
  standalone: true,
  imports: [
    AgGridAngular,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tab-two.component.html',
  styleUrls: ['./tab-two.component.scss']
})
export class TabTwoComponent {
  @Input() data: DataItem[] = [];
  @Output() gridApiReady = new EventEmitter<GridApi>();

  public columnDefs: ColDef[] = tab2ColumnDefs;
  public defaultColDef: ColDef = tab2DefaultColDef;

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
      id: `TASK-${this.newRowCounter++}`, // <--- Assign a unique placeholder ID
      name: 'New Task',
      category: 'Task',
      value: 0,
      description: 'New task details...',
      status: 'Pending',
      isNewRow: true,
      project_code: 'NEW-001'
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
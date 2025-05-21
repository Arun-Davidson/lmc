import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Import AgGridAngular
import { DataItem } from '../../services/data.service';
import { commonColumnDefs, commonDefaultColDef } from '../../common/ag-grid-configs';

@Component({
  selector: 'app-tab-one',
  standalone: true, // Mark as standalone
  imports: [AgGridAngular], // Import AgGridAngular directly
  templateUrl: './tab-one.component.html',
  styleUrls: ['./tab-one.component.scss']
})
export class TabOneComponent {
  @Input() data: DataItem[] = [];
  @Output() gridApiReady = new EventEmitter<GridApi>();

  public columnDefs: ColDef[] = commonColumnDefs;
  public defaultColDef: ColDef = commonDefaultColDef;

  private gridApi: GridApi | null = null;

  onGridReady(params: GridReadyEvent): void {
    console.log(this.columnDefs,'columnDefs')
    this.gridApi = params.api;
    this.gridApiReady.emit(this.gridApi);
  }

  exportGrid(): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv({ fileName: 'Tab1_Data.csv' });
    }
  }
}
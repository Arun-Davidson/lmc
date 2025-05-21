import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Import AgGridAngular
import {DataItem } from '../../services/data.service';
import { commonColumnDefs, commonDefaultColDef } from '../../common/ag-grid-configs';

@Component({
  selector: 'app-tab-two',
  standalone: true, // Mark as standalone
  imports: [AgGridAngular], // Import AgGridAngular directly
  templateUrl: './tab-two.component.html',
  styleUrls: ['./tab-two.component.scss']
})
export class TabTwoComponent {
  @Input() data: DataItem[] = [];
  @Output() gridApiReady = new EventEmitter<GridApi>();

  public columnDefs: ColDef[] = commonColumnDefs;
  public defaultColDef: ColDef = commonDefaultColDef;

  public defaultPageSize: number = 10;

  private gridApi: GridApi | null = null;

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApiReady.emit(this.gridApi);
  }

  exportGrid(): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv({ fileName: 'Tab2_Data.csv' });
    }
  }
}
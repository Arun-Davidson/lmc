import { ColDef } from 'ag-grid-community'; // Removed ICellEditorParams, ICellRendererParams, IRowNode
import { DataItem } from '../services/data.service';
// Removed IdAutocompleteCellEditorComponent and ICustomCellEditorParams imports

export const tab1ColumnDefs: ColDef[] = [
  {
    field: 'id',
    headerName: 'Product ID',
    sortable: true,
    filter: true,
    editable: true, // <--- Make it editable
    width: 100,
    // Removed cellEditorSelector
    // Removed cellRenderer
  },
  { field: 'name', headerName: 'Product Name', sortable: true, filter: true, editable: true, flex: 1 },
  { field: 'category', headerName: 'Category', sortable: true, filter: true, editable: true, width: 150 },
  { field: 'value', headerName: 'Price', sortable: true, filter: true, editable: true, type: 'numericColumn', width: 120 },
  { field: 'status', headerName: 'Availability', sortable: true, filter: true, editable: true, width: 120,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Active', 'Inactive', 'Pending']
    }
  },
  { field: 'description', headerName: 'Details', sortable: true, filter: true, editable: true, flex: 1 },
];

export const tab1DefaultColDef: ColDef = {
  resizable: true,
  minWidth: 100
};
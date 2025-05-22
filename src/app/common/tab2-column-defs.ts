import { ColDef } from 'ag-grid-community'; // Removed ICellEditorParams, ICellRendererParams, IRowNode
import { DataItem } from '../services/data.service';
// Removed IdAutocompleteCellEditorComponent and ICustomCellEditorParams imports

export const tab2ColumnDefs: ColDef[] = [
  {
    field: 'id',
    headerName: 'Task ID',
    sortable: true,
    filter: true,
    editable: true, // <--- Make it editable
    width: 100,
    // Removed cellEditorSelector
    // Removed cellRenderer
  },
  { field: 'name', headerName: 'Task Name', sortable: true, filter: true, editable: true, flex: 1 },
  { field: 'project_code', headerName: 'Project Code', sortable: true, filter: true, editable: true, width: 150 },
  { field: 'status', headerName: 'Task Status', sortable: true, filter: true, editable: true, width: 150,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Active', 'Pending', 'Resolved', 'Completed', 'Closed']
    }
  },
  { field: 'description', headerName: 'Task Details', sortable: true, filter: true, editable: true, flex: 1 },
  { field: 'value', headerName: 'Effort (Hrs)', sortable: true, filter: true, editable: true, type: 'numericColumn', width: 120 },
];

export const tab2DefaultColDef: ColDef = {
  resizable: true,
  minWidth: 100
};
import { ColDef } from 'ag-grid-community';

export const commonColumnDefs: ColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    sortable: true,
    filter: true,
    editable: false, // <--- Make it editable
    width: 80,
    cellEditor: 'agSelectCellEditor', // <--- Use select editor
    // cellEditorParams: {
    //   values: [1, 3, 5, 7] // <--- Specify dropdown values
    // }
  },
  { field: 'name', headerName: 'Name', sortable: true, filter: true, editable: true, width: 150 },
  { field: 'category', headerName: 'Category', sortable: true, filter: true, editable: true, width: 150 },
  { field: 'value', headerName: 'Value', sortable: true, filter: true, editable: true, type: 'numericColumn', width: 120 },
  { field: 'description', headerName: 'Description', sortable: true, filter: true, editable: true, flex: 1 },
  { field: 'status', headerName: 'Status', sortable: true, filter: true, editable: true, width: 100,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Active', 'Inactive', 'Pending']
    }
  }
];

export const commonDefaultColDef: ColDef = {
  resizable: true,
  flex: 1,
  minWidth: 100
};
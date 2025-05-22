import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataItem } from '../../services/data.service';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { GridApi } from 'ag-grid-community';
import { TabOneComponent } from '../tab-one/tab-one.component';
import { TabTwoComponent } from '../tab-two/tab-two.component';

@Component({
  selector: 'app-tab-section',
  standalone: true,
  imports: [MatTabsModule, TabOneComponent, TabTwoComponent],
  templateUrl: './tab-section.component.html',
  styleUrls: ['./tab-section.component.scss']
})
export class TabSectionComponent implements OnInit, OnChanges {
  @Input() filteredData: DataItem[] = [];
  @Output() activeTabGridApi = new EventEmitter<{ gridApi: GridApi | null, tabName: string }>();

  @ViewChild(TabOneComponent) tabOneComponent!: TabOneComponent;
  @ViewChild(TabTwoComponent) tabTwoComponent!: TabTwoComponent;

  tab1Data: DataItem[] = [];
  tab2Data: DataItem[] = [];

  private tab1GridApi: GridApi | null = null;
  private tab2GridApi: GridApi | null = null;
  public currentActiveTab: 'tab1' | 'tab2' = 'tab1';

  constructor() { }

  ngOnInit(): void {
    this.distributeData(this.filteredData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filteredData'] && changes['filteredData'].currentValue) {
      this.distributeData(changes['filteredData'].currentValue);
    }
  }

  private distributeData(data: DataItem[]): void {
    // Distribute data based on the presence of project_code for a clearer distinction
    this.tab1Data = data.filter(item => item.project_code === undefined);
    this.tab2Data = data.filter(item => item.project_code !== undefined);

    // If no data for a tab, ensure the array is empty, not undefined
    this.tab1Data = this.tab1Data || [];
    this.tab2Data = this.tab2Data || [];

    // When data changes, re-emit the active grid API if available
    this.emitActiveGridApi();
  }

  onTab1GridReady(api: GridApi): void {
    this.tab1GridApi = api;
    this.emitActiveGridApi();
  }

  onTab2GridReady(api: GridApi): void {
    this.tab2GridApi = api;
    this.emitActiveGridApi();
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.currentActiveTab = event.index === 0 ? 'tab1' : 'tab2';
    this.emitActiveGridApi();
  }

  private emitActiveGridApi(): void {
    if (this.currentActiveTab === 'tab1') {
      this.activeTabGridApi.emit({ gridApi: this.tab1GridApi, tabName: 'tab1' });
    } else {
      this.activeTabGridApi.emit({ gridApi: this.tab2GridApi, tabName: 'tab2' });
    }
  }

  exportSelectedTabGrid(tabName: 'tab1' | 'tab2'): void {
    if (tabName === 'tab1' && this.tabOneComponent) {
      this.tabOneComponent.exportGrid();
    } else if (tabName === 'tab2' && this.tabTwoComponent) {
      this.tabTwoComponent.exportGrid();
    }
  }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTwoComponent } from './tab-two.component';

describe('TabTwoComponent', () => {
  let component: TabTwoComponent;
  let fixture: ComponentFixture<TabTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

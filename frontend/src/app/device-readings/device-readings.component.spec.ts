import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReadingsComponent } from './device-readings.component';

describe('DeviceReadingsComponent', () => {
  let component: DeviceReadingsComponent;
  let fixture: ComponentFixture<DeviceReadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

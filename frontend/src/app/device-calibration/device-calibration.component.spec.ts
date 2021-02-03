import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCalibrationComponent } from './device-calibration.component';

describe('DeviceCalibrationComponent', () => {
  let component: DeviceCalibrationComponent;
  let fixture: ComponentFixture<DeviceCalibrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCalibrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

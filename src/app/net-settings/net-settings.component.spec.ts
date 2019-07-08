import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetSettingsComponent } from './net-settings.component';

describe('NetSettingsComponent', () => {
  let component: NetSettingsComponent;
  let fixture: ComponentFixture<NetSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

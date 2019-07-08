import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetDataComponent } from './net-data.component';

describe('NetDataComponent', () => {
  let component: NetDataComponent;
  let fixture: ComponentFixture<NetDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

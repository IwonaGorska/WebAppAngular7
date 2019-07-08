import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyloggerComponent } from './keylogger.component';

describe('KeyloggerComponent', () => {
  let component: KeyloggerComponent;
  let fixture: ComponentFixture<KeyloggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyloggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyloggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

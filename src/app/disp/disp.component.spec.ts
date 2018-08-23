import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispComponent } from './disp.component';

describe('DispComponent', () => {
  let component: DispComponent;
  let fixture: ComponentFixture<DispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

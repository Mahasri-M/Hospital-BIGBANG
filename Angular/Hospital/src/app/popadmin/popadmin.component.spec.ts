import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopadminComponent } from './popadmin.component';

describe('PopadminComponent', () => {
  let component: PopadminComponent;
  let fixture: ComponentFixture<PopadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopadminComponent]
    });
    fixture = TestBed.createComponent(PopadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

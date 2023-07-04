import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceluserComponent } from './exceluser.component';

describe('ExceluserComponent', () => {
  let component: ExceluserComponent;
  let fixture: ComponentFixture<ExceluserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExceluserComponent]
    });
    fixture = TestBed.createComponent(ExceluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

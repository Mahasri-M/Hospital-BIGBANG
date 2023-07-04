import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoppdfComponent } from './poppdf.component';

describe('PoppdfComponent', () => {
  let component: PoppdfComponent;
  let fixture: ComponentFixture<PoppdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoppdfComponent]
    });
    fixture = TestBed.createComponent(PoppdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

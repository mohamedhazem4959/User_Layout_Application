import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestimoinal } from './add-testimoinal';

describe('AddTestimoinal', () => {
  let component: AddTestimoinal;
  let fixture: ComponentFixture<AddTestimoinal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestimoinal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestimoinal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

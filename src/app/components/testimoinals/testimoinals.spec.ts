import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimoinals } from './testimoinals';

describe('Testimoinals', () => {
  let component: Testimoinals;
  let fixture: ComponentFixture<Testimoinals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimoinals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testimoinals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

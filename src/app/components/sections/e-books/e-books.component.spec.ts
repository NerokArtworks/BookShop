import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBooksComponent } from './e-books.component';

describe('EBooksComponent', () => {
  let component: EBooksComponent;
  let fixture: ComponentFixture<EBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

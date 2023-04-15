import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CestaButtonComponent } from './cesta-button.component';

describe('CestaButtonComponent', () => {
  let component: CestaButtonComponent;
  let fixture: ComponentFixture<CestaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CestaButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CestaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

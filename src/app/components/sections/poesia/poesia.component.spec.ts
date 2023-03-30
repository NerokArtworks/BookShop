import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoesiaComponent } from './poesia.component';

describe('PoesiaComponent', () => {
  let component: PoesiaComponent;
  let fixture: ComponentFixture<PoesiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoesiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoesiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

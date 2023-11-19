import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroupProductsComponent } from './all-group-products.component';

describe('AllGroupProductsComponent', () => {
  let component: AllGroupProductsComponent;
  let fixture: ComponentFixture<AllGroupProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllGroupProductsComponent]
    });
    fixture = TestBed.createComponent(AllGroupProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

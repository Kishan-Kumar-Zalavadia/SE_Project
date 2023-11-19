import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPurchasedBuyerComponent } from './group-purchased-buyer.component';

describe('GroupPurchasedBuyerComponent', () => {
  let component: GroupPurchasedBuyerComponent;
  let fixture: ComponentFixture<GroupPurchasedBuyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPurchasedBuyerComponent]
    });
    fixture = TestBed.createComponent(GroupPurchasedBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrderHistoryComponent } from './all-order-history.component';

describe('AllOrderHistoryComponent', () => {
  let component: AllOrderHistoryComponent;
  let fixture: ComponentFixture<AllOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOrderHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

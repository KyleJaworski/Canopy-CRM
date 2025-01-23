import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerListComponent } from './new-customer-list.component';

describe('CustomerListComponent', () => {
  let component: NewCustomerListComponent;
  let fixture: ComponentFixture<NewCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

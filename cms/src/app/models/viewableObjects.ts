import { Customer } from './customer';
import { Employee } from './employee';
import { Meeting } from './meeting';

export type ViewableObject = Customer | Employee | Meeting | null;

export enum ViewableObjectType {
  Customer = 'Customer',
  Employee = 'Employee',
  Meeting = 'Meeting',
}

export type ViewableObjectMap = {
  [ViewableObjectType.Customer]: Customer;
  [ViewableObjectType.Employee]: Employee;
  [ViewableObjectType.Meeting]: Meeting;
};

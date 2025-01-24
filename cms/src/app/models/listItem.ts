import { Employee } from './employee';
import { Customer } from './customer';

export enum ObjectType {
  Customer = 'Customer',
  Employee = 'Employee',
  User = 'User',
}

export interface ListItem {
  id: number;
  fullName: string;
  phoneNumber?: string;
  email?: string;
  additionalLabel?: string;
  objectType?: ObjectType;
}

export function updateListItems(
  itemList: Employee[] | Customer[],
  objectType: ObjectType
): ListItem[] {
  return itemList.map((item) => {
    if (objectType === ObjectType.Customer) {
      const customer = item as Customer;
      return {
        id: customer.customerId,
        fullName: `${customer.firstName} ${customer.lastName}`,
        phoneNumber: customer.phoneNumber || 'N/A',
        email: customer.email || 'No Email',
        additionalLabel: '',
        objectType: ObjectType.Customer,
      };
    } else if (objectType === ObjectType.Employee) {
      const employee = item as Employee;
      return {
        id: employee.employeeId,
        fullName: `${employee.firstName} ${employee.lastName}`,
        phoneNumber: employee.phoneNumber || 'N/A',
        email: employee.email || 'No Email',
        additionalLabel: employee.jobTitle || '',
        objectType: ObjectType.Employee,
      };
    } else {
      throw new Error('Invalid item or objectType provided');
    }
  });
}

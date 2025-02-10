import { Employee } from './employee';
import { Customer } from './customer';
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from 'date-fns';

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
  isActive: boolean;
  isSelected: boolean;
}

export function updateListItems(
  itemList: Employee[] | Customer[],
  objectType: ObjectType
): ListItem[] {
  return itemList.map((item) => {
    if (objectType === ObjectType.Customer) {
      const customer = item as Customer;
      const dateAdded = new Date(customer.createdDate); // Ensure date is a Date object
      const now = new Date();

      // Calculate time differences
      let years = differenceInYears(now, dateAdded);
      let months = differenceInMonths(now, dateAdded) % 12;
      let days = differenceInDays(now, dateAdded) % 30;
      let weeks = Math.ceil(days / 7); // Convert days to weeks and round up

      // Determine which two highest values to display
      let timeSinceAdded = '';

      if (years > 0) {
        timeSinceAdded = `${years} year${years > 1 ? 's' : ''}`;
        if (months > 0) {
          months = months + 1; // Round up months
          timeSinceAdded += `, ${months} month${months > 1 ? 's' : ''}`;
        }
      } else if (months > 0) {
        timeSinceAdded = `${months} month${months > 1 ? 's' : ''}`;
        if (weeks > 0) {
          weeks = weeks + 1; // Round up weeks
          timeSinceAdded += `, ${weeks} week${weeks > 1 ? 's' : ''}`;
        }
      } else {
        timeSinceAdded = `${weeks} week${weeks > 1 ? 's' : ''}`;
      }
      return {
        id: customer.customerId,
        fullName: `${customer.firstName} ${customer.lastName}`,
        phoneNumber: customer.phoneNumber || 'N/A',
        email: customer.email || 'No Email',
        additionalLabel: timeSinceAdded,
        objectType: ObjectType.Customer,
        isActive: customer.isActive,
        isSelected: false,
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
        isActive: employee.isActive,
        isSelected: false,
      };
    } else {
      throw new Error('Invalid item or objectType provided');
    }
  });
}

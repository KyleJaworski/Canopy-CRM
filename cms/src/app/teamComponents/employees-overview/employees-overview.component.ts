import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/employee';

interface TreeNode {
  expanded: boolean;
  type: string;
  data: {
    name: string;
    title: string;
  };
  children: TreeNode[];
}

@Component({
  selector: 'app-employees-overview',
  imports: [OrganizationChartModule, CommonModule],
  templateUrl: './employees-overview.component.html',
  styleUrl: './employees-overview.component.scss',
})
export class EmployeesOverviewComponent implements OnInit {
  platformId = inject(PLATFORM_ID);
  data: any;
  selectedNode = 0;
  hierarchy: TreeNode[];

  constructor(private employeeService: EmployeeService) {
    const employees = this.employeeService.getMockEmployees();

    this.hierarchy = this.buildHierarchy(employees, null);
  }

  ngOnInit() {}

  buildHierarchy(employees: Employee[], managerId: number | null): TreeNode[] {
    return employees
      .filter((employee) => employee.directReportId === managerId)
      .map((employee) => {
        return {
          expanded: true,
          type: 'person',
          data: {
            name: employee.firstName,
            title: employee.jobTitle,
          },
          children: this.buildHierarchy(employees, employee.employeeId), // Recursively build children
        };
      });
  }
}

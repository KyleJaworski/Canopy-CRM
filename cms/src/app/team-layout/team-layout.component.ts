import { Component } from '@angular/core';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';

@Component({
  selector: 'app-team-layout',
  imports: [EmployeeListComponent, EmployeeInfoComponent],
  templateUrl: './team-layout.component.html',
  styleUrl: './team-layout.component.scss',
})
export class TeamLayoutComponent {}

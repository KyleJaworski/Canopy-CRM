import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  isDropdownVisible = false;

  // Access the button and menu using template references
  @ViewChild('userMenuButton', { static: true }) userMenuButton!: ElementRef;
  @ViewChild('userMenu', { static: true }) userMenu!: ElementRef;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  // Close dropdown on outside click
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const buttonElement = this.userMenuButton.nativeElement;
    const menuElement = this.userMenu.nativeElement;

    if (
      !buttonElement.contains(event.target as Node) &&
      !menuElement.contains(event.target as Node)
    ) {
      this.isDropdownVisible = false;
    }
  }

  ngOnInit() {}
}

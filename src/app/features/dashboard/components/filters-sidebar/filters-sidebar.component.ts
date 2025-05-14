import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.scss']
})
export class FiltersSidebarComponent {
  selectedStatus: string = '';
  selectedTags: string[] = [];  // Array to store multiple selected tags

  tags: string[] = ['Work', 'Personal', 'Urgent', 'Health']; // Replace with your dynamic tags

  applyFilter(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }

    // Your filtering logic here, if needed
  }

  clearFilters(): void {
    this.selectedStatus = '';
    this.selectedTags = [];
  }
}

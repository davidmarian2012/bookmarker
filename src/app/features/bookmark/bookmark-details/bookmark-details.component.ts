import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BookmarkDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

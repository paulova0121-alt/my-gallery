import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Image } from '../models/image.interface';

@Component({
  selector: 'app-image-item',
  imports: [],
  templateUrl: './image-item.html',
  styleUrl: './image-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageItemComponent {
  image = input.required<Image>();
  isFeatured = input<boolean>(false);
}
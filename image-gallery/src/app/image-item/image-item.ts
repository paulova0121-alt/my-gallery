import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
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

  deleteImage = output<string>();

  onDelete(event: Event) {
    event.stopPropagation();
    this.deleteImage.emit(this.image().id);
  }
}
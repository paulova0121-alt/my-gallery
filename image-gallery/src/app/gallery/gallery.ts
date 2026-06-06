import { Component, signal } from '@angular/core';
import { Image } from '../models/image.interface';
import { ImageItemComponent } from '../image-item/image-item';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-gallery',
  imports: [ImageItemComponent, DragDropModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent {
  images = signal<Image[]>([
    { id: '1', url: 'https://picsum.photos/id/10/400/300', alt: 'Bosque' },
    { id: '2', url: 'https://picsum.photos/id/20/400/300', alt: 'Playa' },
    { id: '3', url: 'https://picsum.photos/id/30/400/300', alt: 'Ciudad' },
    { id: '4', url: 'https://picsum.photos/id/40/400/300', alt: 'Montaña' },
    { id: '5', url: 'https://picsum.photos/id/50/400/300', alt: 'Desierto' },
    { id: '6', url: 'https://picsum.photos/id/60/400/300', alt: 'Lago' },
  ]);

  onDeleteImage(id: string) {
    this.images.update(imgs => imgs.filter(img => img.id !== id));
  }

  onDrop(event: CdkDragDrop<Image[]>) {
    const newOrder = [...this.images()];
    moveItemInArray(newOrder, event.previousIndex, event.currentIndex);
    this.images.set(newOrder);
  }
}
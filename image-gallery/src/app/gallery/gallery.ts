import { Component, signal, computed } from '@angular/core';
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

  selectedIds = signal<Set<string>>(new Set());

  hasSelection = computed(() => this.selectedIds().size > 0);
  selectionCount = computed(() => this.selectedIds().size);

  onDeleteImage(id: string) {
    this.images.update(imgs => imgs.filter(img => img.id !== id));
    this.selectedIds.update(set => {
      const next = new Set(set);
      next.delete(id);
      return next;
    });
  }

  toggleSelection(id: string) {
    this.selectedIds.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  deleteSelected() {
    const toDelete = this.selectedIds();
    this.images.update(imgs => imgs.filter(img => !toDelete.has(img.id)));
    this.selectedIds.set(new Set());
  }

  onDrop(event: CdkDragDrop<Image[]>) {
    const newOrder = [...this.images()];
    moveItemInArray(newOrder, event.previousIndex, event.currentIndex);
    this.images.set(newOrder);
  }
}
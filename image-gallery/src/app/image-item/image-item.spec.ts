import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageItemComponent } from './image-item';
import { Image } from '../models/image.interface';

const mockImage: Image = {
  id: '1',
  url: 'https://picsum.photos/id/10/400/300',
  alt: 'Bosque'
};

describe('ImageItemComponent', () => {
  let component: ImageItemComponent;
  let fixture: ComponentFixture<ImageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('image', mockImage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image with correct src and alt', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain(mockImage.url);
    expect(img.alt).toBe(mockImage.alt);
  });

  it('should emit deleteImage with correct id', () => {
    let emittedId = '';
    component.deleteImage.subscribe((id: string) => emittedId = id);
    component.onDelete(new MouseEvent('click'));
    expect(emittedId).toBe(mockImage.id);
  });

  it('should emit selectImage with correct id', () => {
    let emittedId = '';
    component.selectImage.subscribe((id: string) => emittedId = id);
    component.onSelect();
    expect(emittedId).toBe(mockImage.id);
  });

  it('should apply ring classes when selected', () => {
    fixture.componentRef.setInput('isSelected', true);
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('div');
    expect(div.classList.contains('ring-2')).toBeTruthy();
  });
});
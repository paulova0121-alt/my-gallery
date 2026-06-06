import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 images initially', () => {
    expect(component.images().length).toBe(6);
  });

  it('should delete image by id', () => {
    component.onDeleteImage('1');
    expect(component.images().length).toBe(5);
    expect(component.images().find(i => i.id === '1')).toBeUndefined();
  });

  it('should toggle selection', () => {
    component.toggleSelection('1');
    expect(component.selectedIds().has('1')).toBeTruthy();
    component.toggleSelection('1');
    expect(component.selectedIds().has('1')).toBeFalsy();
  });

  it('should delete selected images', () => {
    component.toggleSelection('1');
    component.toggleSelection('2');
    component.deleteSelected();
    expect(component.images().length).toBe(4);
    expect(component.selectedIds().size).toBe(0);
  });

  it('should check hasSelection', () => {
    expect(component.hasSelection()).toBeFalsy();
    component.toggleSelection('1');
    expect(component.hasSelection()).toBeTruthy();
  });
});

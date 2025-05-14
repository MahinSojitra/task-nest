import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonTaskCardComponent } from './skeleton-task-card.component';

describe('SkeletonTaskCardComponent', () => {
  let component: SkeletonTaskCardComponent;
  let fixture: ComponentFixture<SkeletonTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonTaskCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSessionCardComponent } from './skeleton-session-card.component';

describe('SkeletonSessionCardComponent', () => {
  let component: SkeletonSessionCardComponent;
  let fixture: ComponentFixture<SkeletonSessionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonSessionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonSessionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

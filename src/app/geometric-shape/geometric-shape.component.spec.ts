import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometricShapeComponent } from './geometric-shape.component';

describe('GeometricShapeComponent', () => {
  let component: GeometricShapeComponent;
  let fixture: ComponentFixture<GeometricShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeometricShapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeometricShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

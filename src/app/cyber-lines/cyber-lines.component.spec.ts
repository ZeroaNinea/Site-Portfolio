import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberLinesComponent } from './cyber-lines.component';

describe('CyberLinesComponent', () => {
  let component: CyberLinesComponent;
  let fixture: ComponentFixture<CyberLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImproveSectionComponent } from './improve-section.component';

describe('ImproveSectionComponent', () => {
  let component: ImproveSectionComponent;
  let fixture: ComponentFixture<ImproveSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImproveSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImproveSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

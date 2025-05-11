import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLordChannelComponent } from './view-lord-channel.component';

describe('ViewLordChannelComponent', () => {
  let component: ViewLordChannelComponent;
  let fixture: ComponentFixture<ViewLordChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLordChannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLordChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

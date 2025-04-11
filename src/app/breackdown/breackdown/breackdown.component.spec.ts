import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreackdownComponent } from './breackdown.component';

describe('BreackdownComponent', () => {
  let component: BreackdownComponent;
  let fixture: ComponentFixture<BreackdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreackdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreackdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

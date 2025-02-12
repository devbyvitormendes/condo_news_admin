import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsFormComponent } from './add-news-form.component';

describe('AddNewsFormComponent', () => {
  let component: AddNewsFormComponent;
  let fixture: ComponentFixture<AddNewsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

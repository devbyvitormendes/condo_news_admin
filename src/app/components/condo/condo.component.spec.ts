import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondoComponent } from './condo.component';

describe('CondoComponent', () => {
  let component: CondoComponent;
  let fixture: ComponentFixture<CondoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

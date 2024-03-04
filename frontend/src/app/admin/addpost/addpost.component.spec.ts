import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostsComponent } from './addpost.component';

describe('AddpostComponent', () => {
  let component: AddpostsComponent;
  let fixture: ComponentFixture<AddpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

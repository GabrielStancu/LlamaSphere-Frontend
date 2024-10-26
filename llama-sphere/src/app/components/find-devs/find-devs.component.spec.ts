import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDevsComponent } from './find-devs.component';

describe('FindDevsComponent', () => {
  let component: FindDevsComponent;
  let fixture: ComponentFixture<FindDevsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindDevsComponent]
    });
    fixture = TestBed.createComponent(FindDevsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletequizComponent } from './deletequiz.component';

describe('DeletequizComponent', () => {
  let component: DeletequizComponent;
  let fixture: ComponentFixture<DeletequizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletequizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletequizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

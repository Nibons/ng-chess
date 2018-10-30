import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGridTwodComponent } from './board-grid-twod.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BoardGridTwodComponent', () => {
  let component: BoardGridTwodComponent;
  let fixture: ComponentFixture<BoardGridTwodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardGridTwodComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGridTwodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

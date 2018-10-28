import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGridTwodComponent } from './board-grid-twod.component';

describe('BoardGridTwodComponent', () => {
  let component: BoardGridTwodComponent;
  let fixture: ComponentFixture<BoardGridTwodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGridTwodComponent ]
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

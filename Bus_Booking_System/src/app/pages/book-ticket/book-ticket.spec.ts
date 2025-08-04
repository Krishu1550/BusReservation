import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicket } from './book-ticket';

describe('BookTicket', () => {
  let component: BookTicket;
  let fixture: ComponentFixture<BookTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTicket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

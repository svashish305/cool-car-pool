import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedUsersListComponent } from './matched-users-list.component';

describe('MatchedUsersListComponent', () => {
  let component: MatchedUsersListComponent;
  let fixture: ComponentFixture<MatchedUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

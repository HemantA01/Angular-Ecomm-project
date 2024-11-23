import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatnewComponent } from './chatnew.component';

describe('ChatnewComponent', () => {
  let component: ChatnewComponent;
  let fixture: ComponentFixture<ChatnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatnewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

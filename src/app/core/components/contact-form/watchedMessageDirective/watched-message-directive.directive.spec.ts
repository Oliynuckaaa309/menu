import { WatchedMessageDirectiveDirective } from './watched-message-directive.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<div appWatchedMessageDirective (messageWatched)="onMessageWatched()"></div>`
})
class TestComponent {
  onMessageWatched() {}
}

describe('WatchedMessageDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: WatchedMessageDirectiveDirective;


  const mockIntersectionObserver = {
    observe: jasmine.createSpy('observe'),
    disconnect: jasmine.createSpy('disconnect'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WatchedMessageDirectiveDirective, ],
      declarations: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    const el = fixture.debugElement.children[0];
    directive = el.injector.get(WatchedMessageDirectiveDirective);

    spyOn(component, 'onMessageWatched');
    spyOn(window as any, 'IntersectionObserver').and.returnValue(mockIntersectionObserver);

    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NameGetterComponent } from './name-getter.component';

describe('NameGetterComponent', () => {
  let component: NameGetterComponent;
  let fixture: ComponentFixture<NameGetterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NameGetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameGetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

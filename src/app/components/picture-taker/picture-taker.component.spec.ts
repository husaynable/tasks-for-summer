import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureTakerComponent } from './picture-taker.component';

describe('PictureTakerComponent', () => {
  let component: PictureTakerComponent;
  let fixture: ComponentFixture<PictureTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PictureTakerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

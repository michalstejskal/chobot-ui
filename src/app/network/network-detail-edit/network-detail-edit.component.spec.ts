import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDetailEditComponent } from './network-detail-edit.component';

describe('NetworkDetailEditComponent', () => {
  let component: NetworkDetailEditComponent;
  let fixture: ComponentFixture<NetworkDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

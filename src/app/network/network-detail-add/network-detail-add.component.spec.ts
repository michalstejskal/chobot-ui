import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDetailAddComponent } from './network-detail-add.component';

describe('NetworkDetailAddComponent', () => {
  let component: NetworkDetailAddComponent;
  let fixture: ComponentFixture<NetworkDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailEditComponent } from './module-detail-edit.component';

describe('ModuleDetailEditComponent', () => {
  let component: ModuleDetailEditComponent;
  let fixture: ComponentFixture<ModuleDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

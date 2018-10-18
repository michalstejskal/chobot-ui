import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailAddComponent } from './module-detail-add.component';

describe('ModuleDetailAddComponent', () => {
  let component: ModuleDetailAddComponent;
  let fixture: ComponentFixture<ModuleDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

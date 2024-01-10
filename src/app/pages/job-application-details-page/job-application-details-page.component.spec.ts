import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationDetailsPageComponent } from './job-application-details-page.component';

describe('JobApplicationDetailsPageComponent', () => {
  let component: JobApplicationDetailsPageComponent;
  let fixture: ComponentFixture<JobApplicationDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobApplicationDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobApplicationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

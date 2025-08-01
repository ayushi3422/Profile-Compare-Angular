import { TestBed } from '@angular/core/testing';
import { ProfileComparisonModule } from './profile-comparison.module';

describe('ProfileComparisonModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComparisonModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(ProfileComparisonModule).toBeTruthy();
  });

  it('should export ProfileComparisonComponent', () => {
    const module = new ProfileComparisonModule();
    expect(module).toBeDefined();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProfileComparisonComponent, Profile } from './profile-comparison.component';

describe('ProfileComparisonComponent', () => {
  let component: ProfileComparisonComponent;
  let fixture: ComponentFixture<ProfileComparisonComponent>;
  let httpMock: HttpTestingController;

  const mockProfile1: Profile = {
    id: '1',
    name: 'John Doe',
    image: 'https://example.com/john.jpg',
    interests: ['Photography', 'Travel', 'Cooking']
  };

  const mockProfile2: Profile = {
    id: '2',
    name: 'Jane Smith',
    image: 'https://example.com/jane.jpg',
    interests: ['Photography', 'Music', 'Cooking']
  };

  const mockProfile3: Profile = {
    id: '3',
    name: 'Bob Wilson',
    image: 'https://example.com/bob.jpg',
    interests: ['Art', 'Photography', 'Music']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComparisonComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComparisonComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    // Set up component inputs
    component.profile1 = mockProfile1;
    component.profile2 = mockProfile2;
    component.profile3 = mockProfile3;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display profile names', () => {
    fixture.detectChanges();
    const profileNames = fixture.debugElement.queryAll(By.css('.profile-name'));
    expect(profileNames.length).toBe(2);
    expect(profileNames[0].nativeElement.textContent.trim()).toBe('John Doe');
    expect(profileNames[1].nativeElement.textContent.trim()).toBe('Jane Smith');
  });

  it('should display profile images', () => {
    fixture.detectChanges();
    const profileImages = fixture.debugElement.queryAll(By.css('.profile-image'));
    expect(profileImages.length).toBe(2);
    expect(profileImages[0].nativeElement.src).toBe('https://example.com/john.jpg');
    expect(profileImages[1].nativeElement.src).toBe('https://example.com/jane.jpg');
  });

  it('should have view profile buttons', () => {
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.view-profile-btn'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('View Profile');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('View Profile');
  });

  it('should emit profile1Clicked when first profile button is clicked', () => {
    spyOn(component.profile1Clicked, 'emit');
    fixture.detectChanges();
    
    const buttons = fixture.debugElement.queryAll(By.css('.view-profile-btn'));
    buttons[0].nativeElement.click();
    
    expect(component.profile1Clicked.emit).toHaveBeenCalledWith(true);
  });

  it('should emit profile2Clicked when second profile button is clicked', () => {
    spyOn(component.profile2Clicked, 'emit');
    fixture.detectChanges();
    
    const buttons = fixture.debugElement.queryAll(By.css('.view-profile-btn'));
    buttons[1].nativeElement.click();
    
    expect(component.profile2Clicked.emit).toHaveBeenCalledWith(true);
  });

  it('should call onViewProfile with correct profile number', () => {
    spyOn(component, 'onViewProfile');
    fixture.detectChanges();
    
    const buttons = fixture.debugElement.queryAll(By.css('.view-profile-btn'));
    buttons[0].nativeElement.click();
    buttons[1].nativeElement.click();
    
    expect(component.onViewProfile).toHaveBeenCalledWith(1);
    expect(component.onViewProfile).toHaveBeenCalledWith(2);
  });

  it('should find common interests between profiles', () => {
    fixture.detectChanges();
    component.ngOnInit();
    
    // Common interests should be Photography and Cooking
    const expectedCommonInterests = ['Photography', 'Cooking'];
    const actualCommonInterests = component.sortedCommonInterests.map(item => item.text);
    
    expectedCommonInterests.forEach(interest => {
      expect(actualCommonInterests).toContain(interest);
    });
  });

  it('should display similarity title', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.similarity-title'));
    expect(title.nativeElement.textContent.trim()).toBe('Common Interests');
  });

  it('should have swiper container for interests', () => {
    fixture.detectChanges();
    const swiperContainer = fixture.debugElement.query(By.css('.swiper'));
    expect(swiperContainer).toBeTruthy();
  });

  it('should track interests by text in trackByInterest method', () => {
    const interest = { text: 'Photography', score: 0.8 };
    const result = component.trackByInterest(0, interest);
    expect(result).toBe('Photography');
  });

  it('should return default transform when no face detection data', () => {
    const transform = component.getImageTransform(1);
    expect(transform).toBe('translateY(0)');
  });

  it('should calculate transform based on face detection data', () => {
    component.faceDetectionResults[1] = {
      x: 100,
      y: 150,
      width: 200,
      height: 300
    };
    
    const transform = component.getImageTransform(1);
    expect(transform).toContain('translateY');
  });

  it('should handle image load event', () => {
    spyOn(console, 'log');
    const mockEvent = new Event('load');
    
    component.onImageLoad(1, mockEvent);
    expect(console.log).toHaveBeenCalledWith('Profile 1 image loaded');
  });

  it('should initialize with empty sorted common interests', () => {
    expect(component.sortedCommonInterests).toEqual([]);
  });

  it('should initialize with empty face detection results', () => {
    expect(component.faceDetectionResults).toEqual({});
  });

  it('should have required inputs defined', () => {
    expect(component.profile1).toBeDefined();
    expect(component.profile2).toBeDefined();
  });

  it('should have output events defined', () => {
    expect(component.profile1Clicked).toBeDefined();
    expect(component.profile2Clicked).toBeDefined();
  });

  it('should handle text similarity API call', () => {
    const mockResponse = { similarity: 0.85 };
    
    component['getTextSimilarity']('Photography', 'Photography').subscribe(score => {
      expect(score).toBe(0.85);
    });

    const req = httpMock.expectOne('https://api.api-ninjas.com/v1/textsimilarity');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      text_1: 'Photography',
      text_2: 'Photography'
    });
    req.flush(mockResponse);
  });

  it('should handle text similarity API error with fallback', () => {
    component['getTextSimilarity']('Photography', 'Photography').subscribe(score => {
      expect(score).toBe(0.5);
    });

    const req = httpMock.expectOne('https://api.api-ninjas.com/v1/textsimilarity');
    req.error(new ErrorEvent('Network error'));
  });

  it('should handle face detection API call', () => {
    const mockResponse = [{ x: 100, y: 150, width: 200, height: 300 }];
    
    component['detectFaceInImage']('https://example.com/image.jpg', 1);

    const req = httpMock.expectOne('https://api.api-ninjas.com/v1/facedetect');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      image_url: 'https://example.com/image.jpg'
    });
    req.flush(mockResponse);

    expect(component.faceDetectionResults[1]).toEqual(mockResponse[0]);
  });

  it('should handle face detection API error with fallback', () => {
    component['detectFaceInImage']('https://example.com/image.jpg', 1);

    const req = httpMock.expectOne('https://api.api-ninjas.com/v1/facedetect');
    req.error(new ErrorEvent('Network error'));

    expect(component.faceDetectionResults[1]).toBeUndefined();
  });

  it('should use fallback when no common interests exist', () => {
    component.profile1 = {
      id: '1',
      name: 'Test 1',
      image: 'test1.jpg',
      interests: ['A', 'B']
    };
    
    component.profile2 = {
      id: '2', 
      name: 'Test 2',
      image: 'test2.jpg',
      interests: ['C', 'D']
    };

    component['calculateSimilarities']();
    
    expect(component.sortedCommonInterests.length).toBeGreaterThan(0);
    expect(component.sortedCommonInterests[0].score).toBe(0.5);
  });
});

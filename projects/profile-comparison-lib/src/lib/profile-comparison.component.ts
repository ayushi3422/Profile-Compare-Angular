import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export interface Profile {
  id: string;
  name: string;
  image: string;
  location: string;
  university: string;
  interests: string[];
}

export interface FaceDetectionResult {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SimilarityScore {
  text1: string;
  text2: string;
  score: number;
}

@Component({
  selector: 'pc-profile-comparison',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="profile-comparison-container">
      <div class="profiles-wrapper">
        <!-- Profile 1 -->
        <div class="profile-card">
          <div class="profile-content">
            <div class="profile-avatar">
              {{ getInitials(profile1.name) }}
            </div>
            <h3 class="profile-name">{{ profile1.name }}</h3>
            
            <div class="profile-info">
              <div class="info-item">
                <span class="info-icon">🏫</span>
                <span class="info-text">{{ profile1.university }}</span>
              </div>
              <div class="info-item">
                <span class="info-icon">📍</span>
                <span class="info-text">{{ profile1.location }}</span>
              </div>
            </div>

            <div class="interests-section">
              <div class="interests-list" #swiperContainer1>
                <div class="swiper">
                  <div class="swiper-wrapper">
                    <div 
                      class="swiper-slide interest-item" 
                      *ngFor="let interest of profile1.interests; trackBy: trackByInterest"
                    >
                      <div class="interest-chip" [class.common]="isCommonInterest(interest)">
                        {{ interest }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              class="view-profile-btn"
              (click)="onViewProfile(1)"
            >
              View Profile
            </button>
          </div>
        </div>

        <!-- Profile 2 -->
        <div class="profile-card">
          <div class="profile-content">
            <div class="profile-avatar">
              {{ getInitials(profile2.name) }}
            </div>
            <h3 class="profile-name">{{ profile2.name }}</h3>
            
            <div class="profile-info">
              <div class="info-item">
                <span class="info-icon">🏫</span>
                <span class="info-text">{{ profile2.university }}</span>
              </div>
              <div class="info-item">
                <span class="info-icon">📍</span>
                <span class="info-text">{{ profile2.location }}</span>
              </div>
            </div>

            <div class="interests-section">
              <div class="interests-list" #swiperContainer2>
                <div class="swiper">
                  <div class="swiper-wrapper">
                    <div 
                      class="swiper-slide interest-item" 
                      *ngFor="let interest of profile2.interests; trackBy: trackByInterest"
                    >
                      <div class="interest-chip" [class.common]="isCommonInterest(interest)">
                        {{ interest }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              class="view-profile-btn"
              (click)="onViewProfile(2)"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      <!-- Common Interests Section -->
      <div class="common-interests-section" *ngIf="commonInterests.length > 0">
        <h2 class="common-title">🤝 Common Interests</h2>
        <div class="common-interests-list">
          <div class="common-interest-chip" *ngFor="let interest of commonInterests">
            {{ interest }}
          </div>
        </div>
      </div>

      <!-- Alert Modal -->
      <div class="alert-overlay" [class.show]="showAlert" (click)="hideAlert()">
        <div class="alert-modal">
          <h3>✅ Profile Navigation</h3>
          <p>{{ alertMessage }}</p>
          <button class="alert-button" (click)="hideAlert()">Close</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./profile-comparison.component.scss']
})
export class ProfileComparisonComponent implements OnInit, AfterViewInit {
  @Input() profile1!: Profile;
  @Input() profile2!: Profile;
  @Input() profile3?: Profile;
  
  @Output() profile1Clicked = new EventEmitter<boolean>();
  @Output() profile2Clicked = new EventEmitter<boolean>();
  
  @ViewChild('swiperContainer1') swiperContainer1!: ElementRef;
  @ViewChild('swiperContainer2') swiperContainer2!: ElementRef;

  commonInterests: string[] = [];
  showAlert = false;
  alertMessage = '';
  swiper1!: Swiper;
  swiper2!: Swiper;

  private readonly API_NINJAS_KEY = 'YOUR_API_NINJAS_KEY'; // Replace with actual API key
  private readonly TEXT_SIMILARITY_URL = 'https://api.api-ninjas.com/v1/textsimilarity';
  private readonly FACE_DETECT_URL = 'https://api.api-ninjas.com/v1/facedetect';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.calculateCommonInterests();
  }

  ngAfterViewInit() {
    this.initializeSwipers();
  }

  private calculateCommonInterests() {
    this.commonInterests = this.profile1.interests.filter(interest => 
      this.profile2.interests.includes(interest)
    );
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  isCommonInterest(interest: string): boolean {
    return this.commonInterests.includes(interest);
  }

  onViewProfile(profileNumber: number) {
    const profileName = profileNumber === 1 ? this.profile1.name : this.profile2.name;
    this.alertMessage = `You have been routed to ${profileName}'s profile page`;
    this.showAlert = true;

    if (profileNumber === 1) {
      this.profile1Clicked.emit(true);
    } else if (profileNumber === 2) {
      this.profile2Clicked.emit(true);
    }
  }

  hideAlert() {
    this.showAlert = false;
  }

  trackByInterest(index: number, interest: string): string {
    return interest;
  }

  private initializeSwipers() {
    setTimeout(() => {
      if (this.swiperContainer1) {
        this.swiper1 = new Swiper(this.swiperContainer1.nativeElement.querySelector('.swiper'), {
          modules: [Navigation, Pagination],
          direction: 'vertical',
          slidesPerView: 'auto',
          spaceBetween: 8,
          freeMode: true,
          mousewheel: true,
          height: 300,
        });
      }

      if (this.swiperContainer2) {
        this.swiper2 = new Swiper(this.swiperContainer2.nativeElement.querySelector('.swiper'), {
          modules: [Navigation, Pagination],
          direction: 'vertical',
          slidesPerView: 'auto',
          spaceBetween: 8,
          freeMode: true,
          mousewheel: true,
          height: 300,
        });
      }
    });
  }

  // API Integration methods (simplified for demo)
  private getTextSimilarity(text1: string, text2: string): Observable<number> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.API_NINJAS_KEY
    });

    const body = {
      text_1: text1,
      text_2: text2
    };

    return this.http.post<{similarity: number}>(this.TEXT_SIMILARITY_URL, body, { headers })
      .pipe(
        map(response => response.similarity),
        catchError(() => of(0.5))
      );
  }
}

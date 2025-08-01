import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComparisonModule } from '../../../profile-comparison-lib/src/lib/profile-comparison.module';
import { ProfileComparisonComponent ,Profile} from '../../../profile-comparison-lib/src/lib/profile-comparison.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProfileComparisonComponent],
  template: `
    <div class="showcase-container">
      <pc-profile-comparison
        [profile1]="profile1"
        [profile2]="profile2"
        (profile1Clicked)="onProfile1Clicked($event)"
        (profile2Clicked)="onProfile2Clicked($event)"
      ></pc-profile-comparison>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Profile Comparison Showcase';

  profile1: Profile = {
    id: '1',
    name: 'User 1',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b131?w=400&h=400&fit=crop&crop=face',
    location: 'Albany, NY',
    university: 'University',
    interests: [
      'Pina Coladas',
      'Subway', 
      'Japanese',
      'Gardening',
      'Baseball',
      'Motorcross',
      'Bears',
      'MMA',
      'Biology',
      'Masters Degree'
    ]
  };

  profile2: Profile = {
    id: '2', 
    name: 'User 2',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    location: 'Albany, NY',
    university: 'University',
    interests: [
      'Pizza',
      'Pina Coladas',
      'Japanese',
      'University',
      'Albany, NY'
    ]
  };

  onProfile1Clicked(clicked: boolean) {
    console.log('Profile 1 clicked:', clicked);
  }

  onProfile2Clicked(clicked: boolean) {
    console.log('Profile 2 clicked:', clicked);
  }
}

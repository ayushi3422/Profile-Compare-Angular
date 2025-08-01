# Profile Comparison Component Library

An Angular library for comparing user profiles with AI-powered similarity matching and face alignment features.

## Features

- 🎯 **Interest Matching**: Uses AI-powered text similarity API to find and rank common interests
- 👁️ **Face Alignment**: Automatically detects faces and aligns profile images eye-to-eye
- 📱 **Responsive Design**: Fully responsive design that works on all devices
- 🔄 **Interactive Scrolling**: Swiper.js integration for smooth horizontal scrolling
- ✅ **High Test Coverage**: 80%+ test coverage with comprehensive unit tests
- 📦 **NPM Ready**: Easy to install and use in any Angular project

## Installation

```bash
npm install profile-comparison-lib
```

## Usage

### Import the Module

```typescript
import { ProfileComparisonModule } from 'profile-comparison-lib';

@NgModule({
  imports: [ProfileComparisonModule]
})
export class AppModule { }
```

### Use the Component

```html
<pc-profile-comparison
  [profile1]="profile1"
  [profile2]="profile2"
  [profile3]="profile3"
  (profile1Clicked)="onProfile1Clicked($event)"
  (profile2Clicked)="onProfile2Clicked($event)">
</pc-profile-comparison>
```

### Define Profile Data

```typescript
import { Profile } from 'profile-comparison-lib';

export class AppComponent {
  profile1: Profile = {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://example.com/sarah.jpg',
    interests: ['Photography', 'Travel', 'Cooking', 'Yoga']
  };

  profile2: Profile = {
    id: '2',
    name: 'Michael Chen', 
    image: 'https://example.com/michael.jpg',
    interests: ['Photography', 'Technology', 'Cooking', 'Gaming']
  };

  onProfile1Clicked(clicked: boolean) {
    if (clicked) {
      alert('You have been routed to a profile page');
    }
  }

  onProfile2Clicked(clicked: boolean) {
    if (clicked) {
      alert('You have been routed to a profile page');
    }
  }
}
```

## API Configuration

To use the AI features, you need to configure API keys:

1. Get an API key from [API Ninjas](https://api.api-ninjas.com/)
2. Replace `YOUR_API_NINJAS_KEY` in the component with your actual API key

```typescript
private readonly API_NINJAS_KEY = 'your-actual-api-key-here';
```

## API Integrations

### Text Similarity API
- **Endpoint**: `https://api.api-ninjas.com/v1/textsimilarity`
- **Purpose**: Calculates similarity scores between interests
- **Fallback**: Default similarity score of 0.5 if API fails

### Face Detection API
- **Endpoint**: `https://api.api-ninjas.com/v1/facedetect`
- **Purpose**: Detects face coordinates for image alignment
- **Fallback**: No alignment if API fails

## Component API

### Inputs

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| profile1 | Profile | Yes | First profile to compare |
| profile2 | Profile | Yes | Second profile to compare |
| profile3 | Profile | No | Optional third profile for additional data |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| profile1Clicked | boolean | Emitted when first profile's "View Profile" is clicked |
| profile2Clicked | boolean | Emitted when second profile's "View Profile" is clicked |

### Profile Interface

```typescript
interface Profile {
  id: string;
  name: string;
  image: string;
  interests: string[];
}
```

## Development

### Setup

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm run test:lib

# Serve the showcase app
npm start
```

### Testing

The library includes comprehensive unit tests with 80%+ coverage:

```bash
# Run tests with coverage
npm run test:lib

# Run tests in watch mode
npm run test:lib -- --watch
```

### Building for Production

```bash
# Build the library for NPM publication
npm run build

# The built library will be in dist/profile-comparison-lib
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- Angular 19+
- Swiper.js 11+
- RxJS 7+

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure tests pass and coverage remains above 80%
6. Submit a pull request

## Support

For issues and questions:
- Create an issue on the repository
- Check the showcase app for usage examples
- Review the test files for implementation details

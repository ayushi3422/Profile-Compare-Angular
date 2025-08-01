# Profile Comparison Workspace

This workspace contains an Angular library for profile comparison with a showcase application demonstrating its capabilities.

## Projects

### 📚 Profile Comparison Library (`projects/profile-comparison-lib`)
A reusable Angular component library for comparing user profiles with AI-powered features.

**Key Features:**
- Interest similarity matching using AI
- Automatic face detection and alignment  
- Responsive design with Swiper.js integration
- 80%+ test coverage
- NPM ready for easy distribution

### 🎯 Showcase Application (`projects/showcase-app`)
A demonstration application showcasing the Profile Comparison Component Library.

**Features:**
- Live interactive demo
- Feature documentation
- API integration examples
- Responsive design showcase

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+
- Angular CLI 19+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd profile-comparison-workspace
```

2. Install dependencies:
```bash
npm install
```

3. Start the showcase application:
```bash
npm start
```

The showcase app will be available at `http://localhost:4200`

## Development Scripts

### Library Development
```bash
# Build the library
npm run build

# Build and watch for changes
npm run watch

# Run library tests
npm run test:lib

# Run tests with coverage
npm run test:lib -- --code-coverage
```

### Showcase App
```bash
# Start the showcase app
npm start

# Build the showcase app
npm run build:showcase

# Run showcase app tests
npm run test:showcase
```

## Project Structure

```
profile-comparison-workspace/
├── projects/
│   ├── profile-comparison-lib/          # Angular library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── profile-comparison.component.ts
│   │   │   │   ├── profile-comparison.component.scss
│   │   │   │   ├── profile-comparison.component.spec.ts
│   │   │   │   └── profile-comparison.module.ts
│   │   │   └── public-api.ts
│   │   ├── package.json
│   │   └── README.md
│   └── showcase-app/                    # Demo application
���       ├── src/
│       │   ├── app/
│       │   │   ├── app.component.ts
│       │   │   └── app.component.scss
│       │   ├── index.html
│       │   ├── main.ts
│       │   └── styles.scss
│       └── tsconfig.app.json
├── angular.json
├── package.json
└── README.md
```

## Library Usage

After building the library, you can use it in any Angular project:

### 1. Install the built library:
```bash
npm install ./dist/profile-comparison-lib
```

### 2. Import and use:
```typescript
import { ProfileComparisonComponent, Profile } from 'profile-comparison-lib';

@Component({
  imports: [ProfileComparisonComponent],
  template: `
    <pc-profile-comparison
      [profile1]="profile1"
      [profile2]="profile2"
      (profile1Clicked)="onProfile1Click($event)"
      (profile2Clicked)="onProfile2Click($event)">
    </pc-profile-comparison>
  `
})
export class MyComponent {
  profile1: Profile = {
    id: '1',
    name: 'John Doe',
    image: 'https://example.com/john.jpg',
    interests: ['Photography', 'Travel', 'Cooking']
  };
  
  profile2: Profile = {
    id: '2',
    name: 'Jane Smith', 
    image: 'https://example.com/jane.jpg',
    interests: ['Photography', 'Music', 'Cooking']
  };

  onProfile1Click(clicked: boolean) {
    console.log('Profile 1 clicked:', clicked);
  }

  onProfile2Click(clicked: boolean) {
    console.log('Profile 2 clicked:', clicked);
  }
}
```

## API Configuration

To enable AI features, configure your API Ninjas key in the component:

```typescript
// Replace in profile-comparison.component.ts
private readonly API_NINJAS_KEY = 'your-api-ninjas-key-here';
```

## Testing

The library includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:lib -- --code-coverage

# View coverage report
open coverage/profile-comparison-lib/index.html
```

**Coverage Requirements:**
- Statements: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+

## Building for Production

### Library
```bash
npm run build
# Output: dist/profile-comparison-lib/
```

### Showcase App
```bash
npm run build:showcase  
# Output: dist/showcase-app/
```

## NPM Publication

After building the library:

```bash
cd dist/profile-comparison-lib
npm publish
```

## Technology Stack

- **Angular 19**: Modern Angular framework
- **TypeScript**: Type-safe development
- **Swiper.js**: Touch-enabled carousel/slider
- **SCSS**: Enhanced CSS with variables and mixins
- **Jasmine/Karma**: Unit testing framework
- **API Ninjas**: Text similarity and face detection APIs

## Browser Support

- Chrome 90+
- Firefox 88+ 
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes and add tests
4. Ensure all tests pass: `npm test`
5. Build the library: `npm run build`
6. Commit changes: `git commit -m 'Add my feature'`
7. Push to branch: `git push origin feature/my-feature`
8. Create a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support
- 📧 Contact: your-email@example.com


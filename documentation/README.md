# Asian Culture Society Website - Engineering Standards

A modern, high-performance website for RIT's Asian Culture Society built with Next.js 15, TypeScript, and Tailwind CSS.

## [BUILD] Architecture

This monorepo consolidates the ACS website with best practices for code quality, security, and performance.

### Project Structure

```
acs-consolidated/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── common/             # Shared components (Header, Footer, Logo)
│   │   ├── sections/           # Semantic page sections
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── api/                # API clients
│   │   ├── utils/              # Utility functions
│   │   └── validators/         # Zod validation schemas
│   └── config/                 # Environment configuration
├── public/                     # Static assets
└── .github/workflows/          # CI/CD pipelines
```

## [START] Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
cd acs-consolidated
npm install
```

### Development

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm test          # Run tests with coverage
npm run lint      # Check code quality
npm run format    # Format code
```

## 🔒 Security & DevSecOps

### Automated Security Scanning

- **CodeQL**: Weekly security scans for JavaScript/TypeScript vulnerabilities
- **Trivy**: Container and dependency vulnerability scanning
- **Gitleaks**: Secret detection to prevent credential leaks
- **Dependabot**: Automated dependency updates every Monday

### Security Best Practices

- Environment variable validation with Zod
- Input sanitization on all API routes
- Rate limiting on form submissions
- Content Security Policy (CSP) headers
- CORS configuration

## 🧪 Testing

### Test Coverage Requirements

- Minimum 70% coverage across branches, functions, lines, and statements
- Unit tests for all components and API routes
- Integration tests for critical user flows

### Running Tests

```bash
npm test                # Run all tests with coverage
npm run test:watch      # Watch mode for development
```

### Example Tests

- `src/components/common/__tests__/StickyHeader.test.tsx`
- `src/components/common/__tests__/NavigationHeader.test.tsx`
- `src/app/api/submit/mentor/__tests__/route.test.ts`

## [INFO] Code Quality

### Linting & Formatting

- **ESLint**: TypeScript, React, Jest, and Testing Library rules
- **Prettier**: Consistent code formatting with Tailwind CSS plugin
- **TypeScript**: Strict mode enabled for type safety

### Pre-commit Hooks

Husky + lint-staged automatically:

- Runs ESLint fixes
- Formats code with Prettier
- Ensures consistent code quality before commits

### Setup Pre-commit Hooks

```bash
npm run prepare
```

## ⚡ Performance Optimization

### Bundle Optimization

- Dynamic imports for code splitting
- React.memo for preventing unnecessary re-renders
- useCallback for event handler optimization
- Lazy loading of heavy components

### Performance Results

- **90%+ reduction** in initial bundle sizes for most pages
- Lighthouse CI monitoring on every PR
- Performance budgets enforced

## [INFO] Error Monitoring & Observability

### Sentry Integration [PASS] Installed

Sentry is fully installed and configured. To enable error tracking in production:

```bash
# 1. Get your DSN from https://sentry.io
# 2. Add to .env.local
echo "NEXT_PUBLIC_SENTRY_DSN=your-dsn-here" >> .env.local

# 3. (Optional) For source map uploads
echo "SENTRY_ORG=your-org" >> .env.local
echo "SENTRY_PROJECT=your-project" >> .env.local
```

**Configuration Files:**

- `sentry.client.config.ts` - Browser-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking
- `src/lib/monitoring/sentry.ts` - Utility functions

**Features:**

- [PASS] Automatic error tracking
- [PASS] Performance monitoring (10% sample rate in production)
- [PASS] Session replay for debugging
- [PASS] Sensitive data filtering (cookies, auth headers removed)
- [PASS] Graceful degradation (works without DSN configured)

### Usage

```typescript
import { captureError, captureMessage, setUser, addBreadcrumb } from "@/lib/monitoring/sentry";

try {
  // Your code
} catch (error) {
  captureError(error as Error, { context: "user-action" });
}
```

## [START] Deployment

### Vercel Preview Deployments

Automated preview deployments are configured for pull requests:

1. **Setup**:

   ```bash
   # Link your Vercel project
   npx vercel link
   ```

2. **Add GitHub Secrets**:
   - `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - From `vercel link` output
   - `VERCEL_PROJECT_ID` - From `vercel link` output

3. **Automatic Workflow**:
   - Every PR triggers a preview deployment
   - Comment added to PR with preview URL
   - Runs linting, type-checking, and build before deploy

### Production Deployment

```bash
# Deploy to production
vercel --prod
```

## 🔧 Environment Configuration

### Required Environment Variables

Copy `.env.example` to `.env.local`:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Security
NEXTAUTH_SECRET=your-secret-key-here

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000

# CORS
ALLOWED_ORIGINS=https://campusgroups.rit.edu,https://rit.edu
```

### Environment Validation

All environment variables are validated at runtime using Zod schemas (`src/config/env.ts`).

## [START] CI/CD Pipeline

### Continuous Integration

Every push triggers:

1. **Lint & Format Check**: ESLint and Prettier validation
2. **Type Check**: TypeScript compilation
3. **Tests**: Jest unit and integration tests
4. **Build**: Next.js production build
5. **Security Scans**: CodeQL, Trivy, Gitleaks

### Continuous Deployment

- Pull requests generate Vercel preview deployments
- Merges to `main` automatically deploy to production
- Lighthouse CI measures performance on every PR

## [INFO] Dependencies

### Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui + Radix UI
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier

## 🔄 Deployment

### Production Build

```bash
npm run build
npm start
```

### Docker Support

```dockerfile
# Dockerfile available
docker build -t acs-website .
docker run -p 3000:3000 acs-website
```

## 📝 Contributing

1. Create a feature branch from `develop`
2. Make your changes following our code standards
3. Ensure tests pass: `npm test`
4. Ensure build succeeds: `npm run build`
5. Submit a pull request

### Commit Message Convention

Follow conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Test additions/changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `chore:` Maintenance tasks

## 📚 Documentation

- [API Documentation](./API.md)
- [Environment Variables](./.env.example)
- [Testing Guide](./docs/testing.md)
- [Security Policy](./SECURITY.md)

## 🔐 Security

For security issues, please email acsrit@gmail.com instead of using the issue tracker.

## [INFO] License

Private - © 2024 Asian Culture Society at RIT

## 🙋 Support

- Email: acsrit@gmail.com
- Discord: https://discord.gg/jJBCYdkJBT
- Instagram: @acsrit

---

Built with ❤️ by the Asian Culture Society at RIT

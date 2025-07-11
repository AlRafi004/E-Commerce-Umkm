# Contributing to Platform E-Commerce UMKM

Terima kasih atas minat Anda untuk berkontribusi pada Platform E-Commerce UMKM Kalimantan Tengah! 🙏

## 📋 Daftar Isi

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Testing Guidelines](#testing-guidelines)

## Code of Conduct

Project ini mengikuti [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Dengan berpartisipasi, Anda diharapkan menjaga kode etik ini.

## Getting Started

### 1. Fork Repository

1. Fork repository ini ke akun GitHub Anda
2. Clone fork Anda ke local machine:
   ```bash
   git clone https://github.com/your-username/platform-e-commerce-umkm.git
   cd platform-e-commerce-umkm
   ```

### 2. Setup Development Environment

```bash
# Install dependencies
npm install
cd server && npm install && cd ..

# Setup environment variables
cp .env.example .env
cp server/.env.example server/.env

# Start development servers
npm run dev:fullstack
```

### 3. Create Development Branch

```bash
git checkout -b feature/your-feature-name
# atau
git checkout -b fix/bug-description
# atau
git checkout -b docs/documentation-update
```

## Development Workflow

### Branch Naming Convention

- **Features**: `feature/feature-name`
- **Bug Fixes**: `fix/bug-description`
- **Documentation**: `docs/doc-update`
- **Refactoring**: `refactor/component-name`
- **Performance**: `perf/optimization-area`

### Commit Message Format

Gunakan conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding missing tests
- `chore`: Maintain

**Examples:**

```bash
feat(cart): add quantity validation in checkout
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
refactor(components): extract common button component
```

### Development Process

1. **Create feature branch** dari `main`
2. **Implement changes** dengan test
3. **Commit regularly** dengan descriptive messages
4. **Test thoroughly** di local environment
5. **Push branch** ke fork Anda
6. **Create Pull Request** dengan template

## Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good
interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryType;
}

const fetchProducts = async (): Promise<Product[]> => {
  // Implementation
};

// ❌ Avoid
const data: any = await fetch("/api/products");
```

### React Components

```typescript
// ✅ Good - Functional component with TypeScript
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Button onClick={() => onAddToCart(product.id)}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
};
```

### File Naming Convention

- **Components**: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- **Pages**: `PascalCase.tsx` (e.g., `HomePage.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `formatPrice.ts`)
- **Types**: `camelCase.ts` or `index.ts` in types folder
- **API Services**: `camelCase.ts` (e.g., `productService.ts`)

### Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   ├── forms/          # Form-specific components
│   └── layout/         # Layout components
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # App constants
└── assets/             # Static assets
```

### CSS/Styling Guidelines

```typescript
// ✅ Good - Use Material-UI styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

// ✅ Good - Use sx prop for simple styling
<Box
  sx={{
    display: "flex",
    gap: 2,
    p: 2,
  }}
>
  Content
</Box>;
```

### API Endpoint Standards

```typescript
// ✅ Good - RESTful endpoints
GET    /api/products           # Get all products
GET    /api/products/:id       # Get specific product
POST   /api/products           # Create new product
PUT    /api/products/:id       # Update product
DELETE /api/products/:id       # Delete product

// ✅ Good - Nested resources
GET    /api/stores/:id/products    # Get products for specific store
POST   /api/orders/:id/reviews     # Add review to order
```

## Pull Request Process

### Before Creating PR

1. **Update your fork**:

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run tests**:

   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

3. **Test manually**:
   - Test affected functionality
   - Check responsive design
   - Verify API endpoints
   - Test error scenarios

### PR Template

Gunakan template berikut untuk PR description:

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Manual testing completed
- [ ] API endpoints tested
- [ ] Responsive design verified
- [ ] Error handling tested

## Screenshots (if applicable)

Include screenshots for UI changes.

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process

1. **Automated checks** must pass
2. **At least 1 review** required
3. **Manual testing** by reviewer
4. **Discussion** if needed
5. **Merge** after approval

## Issue Guidelines

### Bug Reports

```markdown
**Bug Description**
Clear description of the bug.

**Steps to Reproduce**

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**

- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this feature work?

**Alternative Solutions**
Any alternative approaches considered?

**Additional Context**
Any other context or screenshots.
```

## Testing Guidelines

### Manual Testing Checklist

- [ ] **Homepage**: Products load correctly
- [ ] **Navigation**: All menu items work
- [ ] **Search**: Product search functions
- [ ] **Cart**: Add/remove items works
- [ ] **Checkout**: Complete flow works
- [ ] **Chat**: Messages send/receive
- [ ] **Admin**: Dashboard functions
- [ ] **Mobile**: Responsive on mobile devices
- [ ] **API**: All endpoints respond correctly

### Browser Testing

Test pada browser berikut:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile Testing

Test pada device berikut:

- iPhone (Safari)
- Android (Chrome)
- Tablet views

## Development Tips

### Useful Commands

```bash
# Lint code
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Build for production
npm run build

# Test API endpoints
curl http://localhost:5000/api/health

# View logs
npm run logs

# Reset database (demo mode)
npm run reset-demo-data
```

### Debugging

```typescript
// ✅ Use proper logging
console.log("Debug info:", { userId, productId });

// ✅ Use TypeScript for better debugging
const product: Product = await fetchProduct(id);

// ✅ Add error boundaries
<ErrorBoundary>
  <ProductList />
</ErrorBoundary>;
```

### Performance Tips

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use lazy loading for routes
- Minimize API calls

## Getting Help

- **Documentation**: Check existing docs first
- **Issues**: Search existing issues
- **Discord**: Join our development Discord
- **Email**: developer@umkm-kalteng.com

## Recognition

Contributors akan diakui di:

- README.md contributors section
- Release notes
- Project website
- Social media shoutouts

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah [MIT License](LICENSE).

---

**Terima kasih atas kontribusi Anda untuk UMKM Kalimantan Tengah! 🚀**

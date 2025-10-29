# Publishing Guide for @exotiicx402/turnstile-sdk

This guide provides step-by-step instructions for publishing the Turnstile SDK to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. **npm Organization** (optional): Create the `@turnstile` organization on npm for scoped packages
3. **Node.js**: Ensure Node.js 18+ is installed

## Initial Setup

### 1. Navigate to Package Directory

```bash
cd ~/turnstile/packages/sdk
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `@solana/web3.js` - Solana blockchain integration
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions

### 3. Build the Package

```bash
npm run build
```

This compiles the TypeScript source files to JavaScript and generates type declarations in the `dist/` directory.

Verify the build:
```bash
ls -la dist/
```

You should see:
- `index.js` - Compiled JavaScript
- `index.d.ts` - TypeScript declarations
- `client.js` / `client.d.ts` - Client implementation
- `types.js` / `types.d.ts` - Type definitions
- Source maps (.map files)

## Publishing to npm

### Step 1: Login to npm

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### Step 2: Verify Package Contents

Before publishing, check what files will be included:

```bash
npm pack --dry-run
```

This shows all files that will be published. Ensure:
- `dist/` directory is included
- `README.md` is included
- `LICENSE` is included
- `src/` directory is NOT included (via .npmignore)

### Step 3: Test the Package Locally (Optional)

Create a test project to verify the package works:

```bash
# In another directory
mkdir test-turnstile && cd test-turnstile
npm init -y
npm install ../turnstile/packages/sdk
```

Create a test file:
```typescript
// test.ts
import { TurnstileClient } from '@exotiicx402/turnstile-sdk';
console.log('Package loaded successfully!');
```

### Step 4: Publish to npm

For first-time publishing:

```bash
npm publish --access public
```

**Note**: The `--access public` flag is required for scoped packages (@exotiicx402/turnstile-sdk) to make them publicly accessible.

### Step 5: Verify Publication

Check the package on npm:
```bash
npm view @exotiicx402/turnstile-sdk
```

Or visit: https://www.npmjs.com/package/@exotiicx402/turnstile-sdk

## Version Management

### Updating the Package

When making updates, follow semantic versioning:

- **Patch** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
  ```bash
  npm version patch
  ```

- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
  ```bash
  npm version minor
  ```

- **Major** (1.0.0 → 2.0.0): Breaking changes
  ```bash
  npm version major
  ```

Then rebuild and publish:
```bash
npm run build
npm publish
```

## Troubleshooting

### Error: Package name already exists

If someone else has published a package with your desired name, you have two options:
1. Request ownership from npm support
2. Use a different package name

To change the package name, edit `package.json`:
```json
{
  "name": "@your-org/turnstile-sdk"
}
```

### Error: You must be logged in to publish

Run `npm login` again and ensure you're logged in:
```bash
npm whoami
```

### Error: 403 Forbidden

This usually means:
1. You don't have permission to publish under `@turnstile` scope
2. Two-factor authentication is required

For scoped packages, ensure the organization exists and you're a member.

### Build Errors

If TypeScript compilation fails:
1. Check TypeScript version: `npm list typescript`
2. Verify tsconfig.json is correct
3. Fix any type errors in source files

## Organization Setup (for @turnstile scope)

### Create npm Organization

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click your profile → "Add Organization"
3. Create organization named `turnstile`
4. Add team members if needed

### Publish Under Organization

Once the organization is created, you can publish scoped packages:
```bash
npm publish --access public
```

## Security Best Practices

1. **Enable 2FA**: Protect your npm account
   ```bash
   npm profile enable-2fa auth-and-writes
   ```

2. **Use .npmignore**: Prevent publishing source files or secrets

3. **Review Published Files**: Always use `npm pack --dry-run` before publishing

4. **Keep Dependencies Updated**: Regularly update @solana/web3.js and other dependencies

## Continuous Integration (Optional)

For automated publishing via CI/CD:

1. Generate an npm token:
   ```bash
   npm token create
   ```

2. Add token to your CI environment as `NPM_TOKEN`

3. Add to CI config:
   ```yaml
   - name: Publish to npm
     run: |
       echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
       npm publish --access public
     env:
       NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

## Post-Publication Checklist

- [ ] Verify package appears on npm
- [ ] Test installation: `npm install @exotiicx402/turnstile-sdk`
- [ ] Check README renders correctly on npm
- [ ] Update documentation with installation instructions
- [ ] Announce release on Twitter/Discord
- [ ] Create GitHub release tag

## Support

If you encounter issues:
- npm support: https://www.npmjs.com/support
- Package issues: https://github.com/Exotiicx402/turnstile/issues
- Discord: https://discord.gg/turnstile

## Additional Resources

- npm Publishing Guide: https://docs.npmjs.com/cli/v9/commands/npm-publish
- Semantic Versioning: https://semver.org/
- npm Organizations: https://docs.npmjs.com/orgs/

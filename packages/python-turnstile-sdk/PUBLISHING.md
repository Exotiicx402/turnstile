# Publishing Guide for turnstile-sdk (Python)

This guide provides step-by-step instructions for publishing the Turnstile Python SDK to PyPI.

## Prerequisites

1. **PyPI Account**: Create an account at [pypi.org](https://pypi.org/account/register/)
2. **Python 3.10+**: Ensure Python 3.10 or higher is installed
3. **Build Tools**: Install required build tools

## Initial Setup

### 1. Navigate to Package Directory

```bash
cd ~/turnstile/packages/python-turnstile-sdk
```

### 2. Install Build Dependencies

```bash
pip install build twine
```

These tools are required for building and uploading packages to PyPI.

### 3. Build the Package

```bash
python -m build
```

This creates distribution files in the `dist/` directory:
- `turnstile_sdk-1.0.0.tar.gz` (source distribution)
- `turnstile_sdk-1.0.0-py3-none-any.whl` (wheel distribution)

Verify the build:
```bash
ls -la dist/
```

## Publishing to PyPI

### Step 1: Create PyPI Account

1. Go to [pypi.org/account/register/](https://pypi.org/account/register/)
2. Fill in your details and verify your email
3. Enable Two-Factor Authentication (recommended)

### Step 2: Create API Token

1. Log in to PyPI
2. Go to Account Settings → API Tokens
3. Click "Add API token"
4. Set scope to "Entire account" (for first publish) or specific project
5. Copy the token (starts with `pypi-`)
6. Store it securely - you won't see it again

### Step 3: Configure Twine

Create a `.pypirc` file in your home directory:

```bash
cat > ~/.pypirc << 'EOF'
[pypi]
username = __token__
password = pypi-YOUR_TOKEN_HERE
EOF
```

Replace `pypi-YOUR_TOKEN_HERE` with your actual API token.

Set proper permissions:
```bash
chmod 600 ~/.pypirc
```

### Step 4: Upload to PyPI

```bash
twine upload dist/*
```

This uploads both the source distribution and wheel to PyPI.

### Step 5: Verify Publication

Check the package on PyPI:
```bash
pip install turnstile-sdk
```

Or visit: https://pypi.org/project/turnstile-sdk/

## Testing Before Publishing

### Test on TestPyPI First (Recommended)

TestPyPI is a separate instance for testing package uploads.

1. Create account at [test.pypi.org](https://test.pypi.org/account/register/)
2. Get API token from TestPyPI
3. Upload to TestPyPI:

```bash
twine upload --repository testpypi dist/*
```

4. Test installation from TestPyPI:

```bash
pip install --index-url https://test.pypi.org/simple/ turnstile-sdk
```

### Local Testing

Test the package locally before publishing:

```bash
# Install in editable mode
pip install -e .

# Run Python and test imports
python
>>> from turnstile_sdk import TurnstileClient
>>> print("Package loaded successfully!")
```

## Version Management

### Updating the Package

When making updates, increment the version number following [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

Update version in these files:
1. `setup.py` - `version="x.x.x"`
2. `pyproject.toml` - `version = "x.x.x"`
3. `turnstile_sdk/__init__.py` - `__version__ = "x.x.x"`

Then rebuild and upload:
```bash
python -m build
twine upload dist/*
```

## Troubleshooting

### Error: File already exists

If you see "File already exists" error:
1. You cannot re-upload the same version
2. Increment the version number
3. Rebuild and try again

### Error: Invalid API token

If authentication fails:
1. Verify your API token is correct
2. Ensure `.pypirc` has correct format
3. Check file permissions: `chmod 600 ~/.pypirc`

### Error: Package name already taken

If `turnstile-sdk` is already taken:
1. Choose a different name (e.g., `turnstile-python-sdk`)
2. Update `name` in both `setup.py` and `pyproject.toml`
3. Rebuild and upload

### Build Errors

If the build fails:
1. Ensure all required files exist (README.md, LICENSE, etc.)
2. Check syntax in `setup.py` and `pyproject.toml`
3. Verify Python version: `python --version` (must be 3.10+)

## Security Best Practices

1. **Enable 2FA**: Protect your PyPI account with two-factor authentication

2. **Use API Tokens**: Never use your password directly
   ```bash
   # Create project-scoped token after first upload
   # Update .pypirc with project-specific token
   ```

3. **Secure .pypirc**: Ensure proper permissions
   ```bash
   chmod 600 ~/.pypirc
   ```

4. **Review Before Upload**: Always check package contents
   ```bash
   tar tzf dist/turnstile-sdk-1.0.0.tar.gz
   ```

## Continuous Integration (Optional)

For automated publishing via CI/CD:

### GitHub Actions Example

```yaml
name: Publish to PyPI

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        pip install build twine
    
    - name: Build package
      run: python -m build
    
    - name: Publish to PyPI
      env:
        TWINE_USERNAME: __token__
        TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
      run: twine upload dist/*
```

Store your API token as a secret named `PYPI_API_TOKEN` in GitHub repository settings.

## Post-Publication Checklist

- [ ] Verify package appears on PyPI
- [ ] Test installation: `pip install turnstile-sdk`
- [ ] Check README renders correctly on PyPI
- [ ] Test import: `python -c "from turnstile_sdk import TurnstileClient"`
- [ ] Update documentation with installation instructions
- [ ] Announce release on Twitter/Discord
- [ ] Create GitHub release tag

## Common Commands Reference

```bash
# Build package
python -m build

# Upload to PyPI
twine upload dist/*

# Upload to TestPyPI
twine upload --repository testpypi dist/*

# Check package description will render correctly
twine check dist/*

# Install from local build
pip install dist/turnstile_sdk-1.0.0-py3-none-any.whl

# Install in editable mode for development
pip install -e .

# Clean build artifacts
rm -rf build/ dist/ *.egg-info
```

## Support

If you encounter issues:
- PyPI support: [pypi.org/help/](https://pypi.org/help/)
- Package issues: [github.com/Exotiicx402/turnstile/issues](https://github.com/Exotiicx402/turnstile/issues)
- Discord: [discord.gg/turnstile](https://discord.gg/turnstile)

## Additional Resources

- PyPI Publishing Guide: [packaging.python.org/tutorials/packaging-projects/](https://packaging.python.org/tutorials/packaging-projects/)
- Twine Documentation: [twine.readthedocs.io](https://twine.readthedocs.io)
- Semantic Versioning: [semver.org](https://semver.org/)
- PEP 517/518: [peps.python.org/pep-0517/](https://peps.python.org/pep-0517/)

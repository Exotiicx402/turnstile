"""Setup configuration for turnstile-sdk."""
from setuptools import setup, find_packages
import pathlib

# Read README for long description
HERE = pathlib.Path(__file__).parent
README = (HERE / "README.md").read_text()

setup(
    name="turnstile-sdk",
    version="1.0.0",
    description="Official Python SDK for Turnstile - The Solana-native x402 marketplace for AI agents and on-chain services",
    long_description=README,
    long_description_content_type="text/markdown",
    author="Turnstile Foundation",
    author_email="support@turnstile.xyz",
    url="https://github.com/Exotiicx402/turnstile",
    project_urls={
        "Bug Tracker": "https://github.com/Exotiicx402/turnstile/issues",
        "Documentation": "https://docs.turnstile.xyz",
        "Source Code": "https://github.com/Exotiicx402/turnstile",
    },
    packages=find_packages(exclude=["tests*"]),
    python_requires=">=3.10",
    install_requires=[
        "httpx>=0.24.0",
        "solana>=0.30.0",
        "solders>=0.18.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-asyncio>=0.21.0",
            "black>=23.0.0",
            "mypy>=1.0.0",
            "twine>=4.0.0",
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Internet",
        "Topic :: System :: Distributed Computing",
    ],
    keywords=[
        "turnstile",
        "solana",
        "x402",
        "micropayments",
        "ai-agents",
        "blockchain",
        "web3",
        "api-marketplace",
    ],
    license="MIT",
)

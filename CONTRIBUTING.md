# 🤝 Contributing to Devovia

Welcome! Thank you for considering contributing to **Devovia**.

We want Devovia to be a professional, well-organized project that teaches us *real software engineering practices*, while delivering a product that users truly love.  

---

## 📜 Table of Contents

- [How to Contribute](#how-to-contribute)
- [Branching Strategy](#branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Issue Reporting](#issue-reporting)
- [Local Setup](#local-setup)

---

## How to Contribute

There are many ways to help:

✨ Code development (frontend, backend, AI)  
✨ Bug reporting and testing  
✨ Writing or improving documentation  
✨ Designing UI/UX  
✨ Improving DevOps and CI/CD  

---

## Branching Strategy

We follow **GitHub Flow** with standardized branch naming:

### **Main Branches:**
- `main` — production-ready, always stable
- `develop` — integration branch for feature merging

### **Working Branches:**
- `feature/*` — new features (e.g., `feature/user-auth`)
- `fix/*` — bug fixes (e.g., `fix/login-error`)
- `hotfix/*` — critical production fixes (e.g., `hotfix/security-patch`)
- `docs/*` — documentation updates (e.g., `docs/api-docs`)
- `refactor/*` — code refactoring (e.g., `refactor/user-service`)
- `release/*` — release preparation (e.g., `release/v1.2.0`)

### **Examples:**
```bash
fix/dashboard-loading-issue
hotfix/payment-gateway-failure
docs/installation-guide
refactor/authentication-flow
```

## **Benefits of This Convention:**
1. **Clear categorization** - Easy to identify branch purpose
2. **Consistent formatting** - Lowercase with hyphens
3. **Descriptive names** - Self-documenting
4. **Tool integration** - Works well with CI/CD and automation
5. **Team clarity** - Everyone understands the naming pattern

This follows industry best practices and is widely adopted by professional development teams.

---

## Commit Guidelines

✅ Use clear, conventional commits.  
Example:

- **`feat`** - A new feature for the user
- **`fix`** - A bug fix for the user
- **`docs`** - Documentation only changes
- **`style`** - Changes that don't affect the code (formatting, missing semicolons, etc.)
- **`refactor`** - Code change that neither fixes a bug nor adds a feature
- **`perf`** - Code change that improves performance
- **`test`** - Adding missing tests or correcting existing tests
- **`chore`** - Changes to the build process or auxiliary tools

---

## Pull Request Process

1️⃣ Make sure your branch is up to date with `main` (or `dev` if using):  
```bash
git pull origin main
```

2️⃣ Push your branch:

```bash
git push origin feature/your-feature-name
```

3️⃣ Open a **Pull Request (PR)** on GitHub:

* Use a clear title and description
* Link related issues if any
* Add screenshots / test results if needed

4️⃣ At least **1 code review** before merging

5️⃣ Once approved, **squash and merge** into `main` (or `dev`).

✅ PR Template (if present in .github/): Please use it!

---

## Code Review Guidelines

✅ Be constructive and respectful.
✅ Focus on:

* Correctness
* Readability
* Consistency with our style
* Security
* Performance

✅ Don’t just approve—ask questions or suggest improvements!

✅ Remember:

> "Code review is for learning, not just checking."

---

## Issue Reporting

✨ Found a bug? Idea for improvement?
1️⃣ Check if there’s already an issue.
2️⃣ If not, open one!
✅ Use the Issue Template (if present)
✅ Be clear and detailed:

* Steps to reproduce
* Expected vs. actual behavior
* Screenshots if possible

---

## Local Setup

Clone the repo:

```bash
git clone https://github.com/YOUR_ORG/devovia.git
cd devovia
```

Copy environment variables:

```bash
cp .env.example .env
```

Run with Docker Compose:

```bash
make up
```

Stop:

```bash
make down
```

Run linters:

```bash
make lint
```

Run tests:

```bash
make test
```

---

## Style & Linting

✅ Node.js/React/Next services: ESLint, Prettier
✅ Python services: Black, Flake8
✅ Rust services: cargo fmt, clippy
✅ Go services: go fmt, golangci-lint

Please **run linters before pushing!**

---

## Tests

✅ Unit tests in each service
✅ Integration tests where possible
✅ E2E tests (planned for future)

Run all tests:

```bash
make test
```

✅ Add tests with new features when possible!

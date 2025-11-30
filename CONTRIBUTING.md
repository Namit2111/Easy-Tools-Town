# Contributing to Easy Tools Town

Thank you for considering contributing to **Easy Tools Town**! We welcome contributions of all kinds – bug fixes, new tools, documentation improvements, and more.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/easy-tools-town.git
   cd easy-tools-town
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to see the project.

## Code Style

- Use **TypeScript** and **React** best practices.
- Follow the existing code formatting – run `npm run lint` and `npm run format` before committing.
- Keep UI components **stateless** where possible and use functional components with hooks.
- Write clear, concise comments where the intent may not be obvious.

## Commit Guidelines

- Write **atomic** commits – one logical change per commit.
- Use conventional commit messages, e.g.:
  - `feat: add new PDF to Text tool`
  - `fix: correct typo in README`
  - `docs: update CONTRIBUTING guidelines`
- Include a brief description of what was changed and why in the PR description.

## Pull Request Process

1. Push your changes to a new branch on your fork.
2. Open a **Pull Request** against the `main` branch of the original repository.
3. Ensure all CI checks pass (lint, tests, build).
4. Request a review from maintainers.
5. Address any feedback and merge once approved.

## Adding a New Tool

1. Add the tool component under `components/tools/`.
2. Update the tool list in `lib/constants.ts`.
3. Add a route under `app/tools/[category]/[tool]/page.tsx`.
4. Document the tool in `tools.md` (check the box when ready).
5. Write tests for any new logic.

## Issues & Bugs

- Search existing issues before opening a new one.
- Provide a clear description, steps to reproduce, and expected vs. actual behavior.
- Include screenshots or console logs if helpful.

## License

By contributing, you agree that your contributions will be licensed under the project's **MIT License**.

---

Happy coding!

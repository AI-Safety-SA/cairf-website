# CAISAF Website

Website for the Cooperative AI South Africa Fellowship program.

## About

This is a static website built with Astro and Tailwind CSS that showcases the 3-month research fellowship program in Cooperative AI. The site includes information about the program, research tracks, mentorship opportunities, and application details.

## Features

- Responsive design with mobile and desktop layouts
- Application deadline tracking
- Research tracks and partnership information
- FAQ section

## Development and Deployment Workflow

### Commands for Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Contributing

This project uses a simplified trunk-based development model (GitHub Flow).

1.  **Create a Feature Branch:** All new work (features, fixes, content updates) must be done in a branch created from `main`. Use a descriptive name.

    ```bash
    # Example for a new feature
    git checkout -b feature/add-photo-gallery

    # Example for a bug fix
    git checkout -b fix/correct-phone-number
    ```

2.  **Commit Changes:** Make your changes and commit them with clear, concise messages.

3.  **Open a Pull Request:** When your work is complete, push the branch to GitHub and open a Pull Request (PR) against the `main` branch.

4.  **Review and Stage:** A Netlify Deploy Preview link will be automatically generated and posted as a comment in your PR. Use this link to review your changes in a live, staging-like environment.

5.  **Merge to Production:** Once the PR is approved, merge it into `main` using the **"Squash and Merge"** option on GitHub. This keeps the `main` branch history clean and atomic.

6.  **Automatic Deployment:** Merging to `main` automatically triggers a production deployment via Netlify.

## Tech Stack

- Astro
- Tailwind CSS
- TypeScript

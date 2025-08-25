# CAISAF Website

Website for the Cooperative AI South Africa Fellowship program.

## About

This is a static website built with Astro and Tailwind CSS that showcases the 3-month research fellowship program in Cooperative AI. The site includes information about the program, research tracks, mentorship opportunities, and application details.

## Features

- Responsive design with mobile and desktop layouts
- Integration with Notion for mentor data
- Application deadline tracking
- Research tracks and partnership information
- FAQ section

## Development

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

## Environment Variables

Create a `.env` file with:

- `NOTION_TOKEN` - Notion API token
- `NOTION_DATABASE_ID` - Notion database ID for mentor data

## Tech Stack

- Astro
- Tailwind CSS
- TypeScript
- Notion API

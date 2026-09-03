# Movie & TV Show Catalog

A web application for browsing movies and TV shows using The Movie Database (TMDB) API.

## Requirements

- Node.js LTS
- npm
- A TMDB API Read Access Token

## Install and Run

1. Install the dependencies:

	```bash
	npm install
	```

2. Create a local environment file:

	```bash
	# macOS/Linux
	cp .env.example .env

	# Windows PowerShell
	Copy-Item .env.example .env
	```

3. Fill in the variables in `.env`:

	```env
	TMDB_API_READ_ACCESS_TOKEN=your_tmdb_read_access_token
	TMDB_API_BASE_URL=https://api.themoviedb.org/3
	TMDB_AUTH_BASE_URL=https://www.themoviedb.org/authenticate
	NEXT_PUBLIC_APP_URL=http://localhost:3000
	```

4. Start the development server:

	```bash
	npm run dev
	```

5. Open [http://localhost:3000](http://localhost:3000).

### Other Commands

```bash
npm run lint    # Run ESLint
npm run build   # Create a production build
npm run start   # Start the production build
```

## Storybook

Storybook is used to develop and review UI components independently.

1. Install dependencies using `npm install`.
2. Start Storybook:

	```bash
	npm run storybook
	```

3. Open [http://localhost:6006](http://localhost:6006).

To build a static Storybook site:

```bash
npm run build-storybook
```

## Project Structure

```text
.
|-- app/                    Next.js routes, pages, layouts, and API handlers
|   |-- api/                Server-side API routes, including authentication
|   |-- movies/             Movie pages and detail routes
|   |-- search/             Search page and route-specific components
|   |-- tv/                 TV show pages and detail routes
|   `-- watchlist/          Watchlist page
|-- shared/                 Reusable application code
|   |-- components/         Shared UI components
|   |-- hooks/              Shared React hooks
|   |-- interface/          Shared TypeScript types and interfaces
|   |-- service/            External-service logic, including TMDB
|   `-- utils/              Reusable utility functions
|-- .storybook/             Storybook configuration
|-- public/                 Static assets served by the application
|-- .README/                Additional project documentation
`-- package.json            Scripts and dependencies
```

### Folder Rules

- Keep route-specific code inside its route folder in `app/`.
- Put API route handlers in `app/api/` and reusable TMDB logic in `shared/service/`.
- Put reusable UI, hooks, types, and utilities in the matching folder under `shared/`.
- Keep static files in `public/`.
- Add Storybook files as `*.stories.*` files near a component or in `stories/`.
- Keep Storybook configuration in `.storybook/`.

## Tech Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Radix UI, class-variance-authority, and Lucide React
- SWR for client-side data fetching
- TMDB API v3
- Storybook 10 with Vite
- ESLint, Vitest, and Playwright

## Authentication

Login uses TMDB v3 Session Authentication: the user approves access on TMDB, then the application creates a TMDB session and stores it in a secure HTTP-only cookie.

See [TMDB Authentication Flow](.README/README-TMDB-AUTHENTICATION.md) for the complete login flow, environment-variable rules, and session security details.

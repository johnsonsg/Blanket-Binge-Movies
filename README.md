# Blanket Binge Movies

A React + Vite movie discovery app powered by TMDB. Users can search for movies (debounced for a smoother UX), browse popular titles, and see a “Trending Movies” section driven by what people search for most.

Trending is calculated via Appwrite: every time a user searches, we increment a counter for that search term and store metadata about the top movie result.

## What the app does

- Search TMDB movies with a debounced input.
- Browse popular movies when no search is entered.
- Track searches in Appwrite and render the top 5 “Trending Movies”.
- Smooth-scroll to results after a search + “Back to search” convenience button.

## Tech used

- React 19
- Vite 7
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Appwrite (Databases) for trending/search analytics
- TMDB API (v3 endpoints using a v4 Bearer token)
- `react-use` for debouncing
- ESLint 9

## Local setup (new hire style)

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm
- A TMDB account (for an API Read Access Token)
- An Appwrite instance (cloud or local)

### 1) Install dependencies

```bash
npm install
```

### 2) Create environment variables

Create a `.env.local` in the project root:

```bash
VITE_TMDB_API_KEY=YOUR_TMDB_V4_READ_ACCESS_TOKEN

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=YOUR_APPWRITE_PROJECT_ID
VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID=YOUR_COLLECTION_ID
```

Notes:

- `VITE_TMDB_API_KEY` is used as a **Bearer token** in the `Authorization` header.
- All variables must start with `VITE_` to be available in the Vite client.

### 3) TMDB setup

1. Create/sign in to TMDB: https://www.themoviedb.org/
2. In your TMDB account settings, generate a **Read Access Token (v4 auth)**.
3. Put that token into `VITE_TMDB_API_KEY`.

### 4) Appwrite setup (Trending Movies)

This app writes/reads documents in an Appwrite Database collection.

1. Create an Appwrite project.
2. Create a database (copy the Database ID).
3. Create a collection (copy the Collection ID).
4. Add these attributes to the collection:

- `searchTerm` (string)
- `count` (integer)
- `movie_id` (integer)
- `title` (string)
- `poster_url` (string)

5. Set collection permissions so the client app can read/write.

Recommended for a demo/tutorial build:

- Read: Any
- Create/Update: Any

For production, you’d typically require authenticated users and tighter permissions.

### 5) Run the app

```bash
npm run dev
```

Vite will print the local URL (usually http://localhost:5173).

## Build & preview

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## How trending works (high level)

1. User types in search.
2. After debounce, the app calls TMDB Search.
3. If there are results, we write to Appwrite:
	- If `searchTerm` exists: increment `count`.
	- Else: create a document with `count = 1` and store top result metadata.
4. “Trending Movies” reads the top 5 documents ordered by `count`.

## Reference

- TMDB: https://www.themoviedb.org/

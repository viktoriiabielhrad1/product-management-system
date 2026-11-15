# Product Management System
 
A web app for managing a small catalogue of laptops. Users can add, view, update and delete products through a simple, responsive interface. Built with Next.js and PocketBase, with a Redis cache, CDN images, statistics graphs and automated tests.
 
<img width="1165" height="649" alt="Screenshot 2026-11-15 200545" src="https://github.com/user-attachments/assets/9e55517a-f13e-4508-ae26-9cefbc29a85a" />

 
## Purpose
 
This project was built for the Rich Web Apps module at TU Dublin (Assignment 1: Product Management System).
 
The goal was to build a complete proof of concept app that:
 
- stores product data in a database and reaches it through API routes
- uses a cache to deliver the home page text
- uses optimisation techniques to deliver the app faster
- is covered by automated tests on every page
The app is shown with ten laptops: 4 Dell, 4 Lenovo and 2 Acer.
 
## Features
 
- **Full CRUD**: add, view, update and delete laptops
- **Product images** served from a CDN (Cloudinary)
- **Home page text** loaded from a Redis cache
- **Admin page** with a bar graph and a line graph of laptops in stock by brand
- **Sign in and sign up** with Clerk
- **Responsive design** that works on desktop and mobile
- **37 automated tests** with Playwright
## Tech stack
 
| Part | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Database | PocketBase |
| Cache | Redis (Redis Cloud) |
| Image CDN | Cloudinary, displayed with `next/image` |
| Authentication | Clerk |
| Graphs | Recharts (bar graph), Chart.js (line graph) |
| Testing | Playwright |
 
## How the app works
 
The app has three layers:
 
1. **Pages** (in `app/`) are what the user sees. They never talk to the database directly. They call the API routes with `fetch`.
2. **API routes** (in `app/api/`) run on the server. Each route logs in to PocketBase, does one job (get, add, update or delete) and sends the result back as JSON.
3. **PocketBase** stores the products in a collection called `products`.
```
Browser page  --fetch-->  API route  --PocketBase SDK-->  PocketBase database
```
 
The home page is different: it reads its text from **Redis**. All the text on the home page is stored in Redis under one key called `home`, and the page loads it from the cache every time it opens.
 
### Pages
 
| URL | Page | What it does |
|---|---|---|
| `/` | Home | Introduction to the app. All text comes from Redis. |
| `/products` | Products list | Shows every laptop with its image, brand, model and price. Has View, Edit and Delete for each one. |
| `/products/[id]` | Single product | Shows all the details of one laptop. |
| `/addProduct` | Add product | A form for adding a new laptop. |
| `/updateProduct/[id]` | Update product | A form filled with the current values, for changing a laptop. |
| `/admin` | Admin stats | Two graphs showing how many laptops each brand has in stock. |
| `/dashboard` | Dashboard | Shown after signing in. Displays the logged in user. |
| `/search` | Search | Placeholder page from the starter template, kept for future work. |
| `/profile` | Profile | Placeholder page from the starter template, kept for future work. |
 
<img width="970" height="653" alt="Screenshot 2026-11-15 195958" src="https://github.com/user-attachments/assets/6c81c0b6-b986-4727-a185-14c51f4a74ee" />

 
<img width="1157" height="655" alt="Screenshot 2026-11-15 200057" src="https://github.com/user-attachments/assets/0dee898a-fee1-4eed-a90d-aeb40da8d8cf" />

 
<img width="1094" height="650" alt="Screenshot 2026-11-15 200128" src="https://github.com/user-attachments/assets/b00d1d07-7f18-4049-8d88-04dd48812779" />

 
<img width="1142" height="646" alt="Screenshot 2026-11-15 200157" src="https://github.com/user-attachments/assets/819ede79-af86-46ba-8de3-4b64a41f4fb4" />

 
### API routes
 
| Route | Method | What it does |
|---|---|---|
| `/api/getAll` | GET | Returns all products |
| `/api/getOne?id=...` | GET | Returns one product by its ID |
| `/api/addProduct?brand=...&model=...&price=...&description=...&image=...` | GET | Creates a new product (`image` is optional) |
| `/api/updateProduct?id=...&brand=...&model=...&price=...&description=...&image=...` | GET | Changes an existing product |
| `/api/deleteProduct?id=...` | DELETE | Deletes a product |
| `/api/setHomeText` | GET | Saves the home page text into Redis |
 
### Data model
 
Each record in the `products` collection has:
 
| Field | Type | Example |
|---|---|---|
| `brand` | text | Dell |
| `model` | text | XPS 13 |
| `price` | text | 1299.00 |
| `description` | text | Thin 13 inch laptop for work and study |
| `image` | text | A Cloudinary image link (optional) |
 
PocketBase also adds `id`, `created` and `updated` automatically.
 
<img width="1064" height="605" alt="Screenshot 2026-11-15 200222" src="https://github.com/user-attachments/assets/101550ac-5dff-4cc1-a632-a795e3a085dd" />

 
## Redis cache
 
The home page has no text of its own. The route `/api/setHomeText` stores five pieces of text (eyebrow, title, description, card title, card text) in Redis as a hash called `home`. When the home page loads, it reads that hash and shows the text.
 
<img width="1280" height="762" alt="Screenshot 2026-11-15 200257" src="https://github.com/user-attachments/assets/32bcef95-4ec4-41bc-8738-d1ffeea0efad" />

 
## Optimisations
 
Two optimisation approaches are used (not counting Redis):
 
### 1. Image CDN with `next/image`
 
Laptop photos are stored on Cloudinary, a content delivery network, so they are served from a server close to the user and not from the app itself. They are displayed with the Next.js `Image` component, which resizes each image to the size it is shown at, converts it to a modern format, and lazy loads images that are not on screen yet.
 
### 2. Lazy loading the graph libraries
 
Chart libraries are large. The two graph components are loaded with `next/dynamic`, so their code is only downloaded when someone opens the `/admin` page. Other pages stay small and load faster, and a "Loading graph..." message is shown while the graph code arrives.
 
## Admin stats page
 
The `/admin` page gets all products from the database, counts how many belong to each brand, and shows the result in two graphs made with two different libraries:
 
- **Bar graph (Recharts)**: built from small React components, one for each part of the graph. It is drawn as SVG.
- **Line graph (Chart.js)**: described with one settings object and drawn on a canvas.
<img width="962" height="659" alt="Screenshot 2026-11-15 200327" src="https://github.com/user-attachments/assets/50231727-360b-441c-bdef-aca0605d41b1" />

 
## Getting started
 
### What you need
 
- Node.js 20 or newer (developed with Node.js 24)
- The PocketBase program for your system, from [pocketbase.io](https://pocketbase.io/docs/), placed in the project root
- Free accounts for [Clerk](https://clerk.com), [Redis Cloud](https://redis.io) and [Cloudinary](https://cloudinary.com)
### 1. Download the code and install the packages
 
```bash
git clone https://github.com/viktoriiabielhrad1/product-management-system.git
cd product-management-system
npm install
```
 
### 2. Create the environment file
 
Create a file called `.env.local` in the project root and fill in your own values. This file holds secrets and is not uploaded to GitHub.
 
```
POCKETBASE_URL=http://127.0.0.1:8090
POCKETBASE_SUPERUSER_EMAIL=your-admin-email
POCKETBASE_SUPERUSER_PASSWORD=your-admin-password
 
REDIS_URL=redis://default:your-redis-password@your-redis-endpoint:port
 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
```
 
The last line sets the page a user is sent to after signing in.
 
### 3. Start the database
 
Create the admin account once, using the same email and password as in `.env.local`:
 
```bash
./pocketbase superuser upsert your-admin-email your-admin-password
```
 
Then start PocketBase:
 
```bash
./pocketbase serve
```
 
The `products` collection is created from the files in `pb_migrations` when PocketBase starts. If it is missing, open the admin console at `http://127.0.0.1:8090/_/` and create a collection called `products` with the text fields `brand`, `model`, `price`, `description` and `image`.
 
Add your laptops in the admin console, or later through the Add product page.
 
### 4. Start the app
 
In a second terminal:
 
```bash
npm run dev
```
 
Open `http://localhost:3000` in the browser.
 
### 5. Fill the Redis cache
 
Visit this address once to save the home page text into Redis:
 
```
http://localhost:3000/api/setHomeText
```
 
Reload the home page and the text appears.
 
### Running in GitHub Codespaces
 
The app was developed in GitHub Codespaces. `next.config.ts` already allows the `*.app.github.dev` address, which is needed for Clerk sign out to work there. Use the forwarded address for port 3000 in place of `localhost:3000`.
 
## Running the tests
 
The tests are in the `tests` folder and use Playwright. They open the app in a hidden browser, act like a user, and check the results.
 
Install the test browser once:
 
```bash
npx playwright install --with-deps chromium
```
 
With PocketBase and `npm run dev` both running, run all the tests from a third terminal:
 
```bash
npx playwright test
```
 
| Test file | What it checks |
|---|---|
| `home.spec.ts` | Home page exists, Redis text shows, navigation works |
| `products.spec.ts` | Products list shows laptops and images, View and Edit links work |
| `addProduct.spec.ts` | Form fields, submitting, data saved in the database, different inputs (long, short, numbers, wildcards, strange characters, empty) |
| `singleProduct.spec.ts` | Product details show, a wrong ID shows "Product not found" |
| `updateProduct.spec.ts` | Form is filled with current values, changes are saved |
| `delete.spec.ts` | Delete button removes the product |
| `admin.spec.ts` | Admin page exists and both graphs show |
| `api.spec.ts` | Each API route returns the right status code |
 
Tests that add data use the brand `PWTest` and delete it afterwards, so the real products are never changed.
 
<img width="614" height="541" alt="Screenshot 2026-11-15 200433" src="https://github.com/user-attachments/assets/cf3fe66b-77f5-412e-bc21-a28ca28208f6" />

 
## Project structure
 
```
app/
  page.tsx                  Home page (text from Redis)
  layout.tsx                Shared layout and bottom navigation
  globals.css               All styles
  products/                 Products list and single product pages
  addProduct/               Add product form
  updateProduct/            Update product form
  admin/                    Stats page with two graphs
  api/                      API routes (getAll, getOne, addProduct, updateProduct, deleteProduct, setHomeText)
components/
  BrandBarChart.tsx         Bar graph (Recharts)
  BrandLineChart.tsx        Line graph (Chart.js)
lib/
  database.tsx              PocketBase connection
  redis.ts                  Redis connection
tests/                      Playwright tests
pb_migrations/              PocketBase collection structure
```
 
## Author
 
Viktoriia Bielhrad, TU Dublin
 

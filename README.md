# Nexium-Taimoor-Assignment-2

## Blog Summariser

A Next.js app that scrapes a blog URL, generates a simulated AI summary, translates it to Urdu, and displays results using ShadCN UI.

### Features

- **Input:** Enter a blog URL to scrape and process.
- **Scraping:** Extracts main text content from the blog page.
- **AI Summary:** Simulates an AI-generated summary using static logic.
- **Urdu Translation:** Translates the summary to Urdu using a JavaScript dictionary.
- **Database (optional):**
  - Saves the summary in Supabase.
  - Saves the full blog text in MongoDB.
- **Frontend:** Uses ShadCN UI components for a modern interface.
- **Deployment:** Ready to deploy on Vercel.

### How to Use

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) and enter a blog URL.

### Tech Stack

- Next.js
- TypeScript
- ShadCN UI
- Axios & Cheerio (for scraping)
- Supabase (optional)
- MongoDB (optional)
- Vercel (deployment)



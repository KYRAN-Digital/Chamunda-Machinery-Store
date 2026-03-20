# Chamunda Machinery Store — Digital Business Profile Page

Static, mobile-first business profile page for **Bhagawat Singh Rathore** (Owner) and **Chamunda Machinery Store**.

## Run locally

From this folder:

```bash
python3 -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

## Replace images

- **Gallery photos:** add `.jpg` or `.webp` files in `assets/gallery/` using the same base names (e.g. `pump-sets.jpg`). The page will automatically prefer real photos and fall back to the `.svg` placeholders.
- **Hero cover photo (recommended):** add `assets/hero.jpg` (or `assets/hero.webp`). If you don’t add it, the design uses `assets/hero.svg`.
- Replace `assets/logo.svg` with your real logo if you have one.
- **Share preview image (OG):** `index.html` points to `assets/og-image.svg`. For best WhatsApp/Instagram previews, replace it with a `.jpg/.png` and update the `og:image` tag.

## Enable Instagram / Website

Edit these values in `script.js`:

- `INSTAGRAM_URL`
- `WEBSITE_URL`
- `BUSINESS_HOURS` (optional)

Note: Website/Instagram buttons are hidden until a URL is added.

## Deploy (GitHub Pages)

- Push this folder to a GitHub repo
- In repo settings → **Pages** → choose branch and `/ (root)`

# Long Talk Short

Your blog, with a built-in **write-and-publish admin panel**. You write new
articles in a normal form at `yoursite.com/admin` and hit Publish — no code,
no re-uploading files. Behind the scenes it's an [Eleventy](https://www.11ty.dev/)
static site + [Decap CMS](https://decapcms.org/), deployed on Netlify.

---

## What's here

```
src/
  index.njk            The home page (card grid + filter chips)
  _includes/
    base.njk           The page shell (masthead, fonts, subscribe, footer)
    post.njk           The article reading layout
  _data/
    site.json          Your name, tagline, author, affiliate tag, tip-jar link
    categories.json    The three themes
  posts/               Your articles (one Markdown file each) ← the CMS edits these
  styles.css           All the styling
  app.js               Theme toggle, filters, signup form
  admin/               The publish panel (Decap CMS)
netlify.toml           Tells Netlify how to build the site
```

---

## One-time setup (about 15 minutes)

You'll do this once. After that, publishing new articles is just filling a form.

### 1. Put these files on GitHub
- Create a free account at **github.com** if you don't have one.
- Create a new repository (e.g. `long-talk-short`). Keep it **public** or private, either works.
- Upload this whole folder to it (drag-and-drop works on github.com → "uploading an existing file", or use GitHub Desktop). **Don't upload `node_modules` or `_site`** — those rebuild automatically.

### 2. Point the CMS at your repo
- Open `src/admin/config.yml`.
- Change the `repo:` line from `YOURUSERNAME/long-talk-short` to your actual
  `your-github-username/your-repo-name`. Commit the change.

### 3. Connect Netlify to the repo
- In Netlify: **Add new site → Import an existing project → GitHub →** pick your repo.
- Netlify reads `netlify.toml` automatically (build command `npm run build`, publish folder `_site`). Just click **Deploy**.
- Rename the site (Site configuration → Change site name) to e.g. `longtalkshort` → your URL becomes `longtalkshort.netlify.app`.

### 4. Turn on the login for the admin panel
The `/admin` panel logs in with your GitHub account. Set that up once:
- On **github.com → Settings → Developer settings → OAuth Apps → New OAuth App**:
  - **Application name:** Long Talk Short CMS
  - **Homepage URL:** `https://longtalkshort.netlify.app` (your site)
  - **Authorization callback URL:** `https://api.netlify.com/auth/done`
  - Click Register, then **Generate a client secret**. Copy the **Client ID** and **Client secret**.
- In **Netlify → your site → Site configuration → Access & security → OAuth (Authentication providers) → Install provider → GitHub**, paste the Client ID and Client secret. Save.

That's it. Go to `https://longtalkshort.netlify.app/admin`, click **Login with GitHub**, and you're in.

### 5. Replace the placeholders
Open `src/_data/site.json` (or edit these later in GitHub) and set:
- `amazon_tag` → your Amazon Associates tag (replaces `YOURTAG-20` in every "further reading" link).
- `support_url` → your Buy Me a Coffee link (replaces `YOURNAME`).

---

## Publishing a new article (the everyday flow)

1. Go to `yoursite.com/admin` and log in.
2. Click **Articles → New Article**.
3. Fill in the form: title, theme, source, read time, excerpt, the source note, and the body (a normal rich-text editor). Optionally add a "Long story short" takeaway line and a few books for the affiliate "further reading" box.
4. Click **Publish**.

Decap saves the article to your GitHub repo, Netlify rebuilds automatically, and the new piece is live in about a minute — added to the home page and its theme, no other steps.

> **Featured card:** flip the "Feature on home page" switch ON for the one article you want as the big card at the top. Turn it off on the others.

---

## Editing locally (optional, for tinkering)

If you ever want to preview changes on your own computer:

```bash
npm install     # once
npm start       # live preview at http://localhost:8080
npm run build   # produce the final site in _site/
```

You don't need this for normal publishing — the `/admin` panel handles everything.

---

## Adding a new theme (e.g. "Health" or "Money")

1. In `src/_data/categories.json` add a key, e.g. `"health": { "label": "Health" }`.
2. In `src/styles.css` add a color variable `--health:#xxxxxx;` in each of the three `:root` theme blocks.
3. In `src/index.njk` add a filter chip for it, and in `src/admin/config.yml` add it to the Theme dropdown options.

(Happy to do this for you anytime — just ask.)

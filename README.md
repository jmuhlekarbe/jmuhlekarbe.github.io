# Website of Johannes Muhle-Karbe

This folder contains the website **www.jmuhlekarbe.com**.

You change the site by editing a few text files in your web browser on GitHub. When you save a change, the site rebuilds itself and the new version is live within about two minutes. You don't need to install anything.

---

## Where things are

| What you want to change | File to edit |
|---|---|
| Add or change a **publication** | `src/_data/publications.yml` |
| **Postdocs and PhD students** (Mentoring page) | `src/_data/mentoring.yml` |
| **Workshops and other events** (Events page) | `src/_data/events.yml` |
| Homepage text | `src/index.md` |
| Biography | `src/bio.md` |
| CV **PDF** (the "Detailed CV" link) | upload over `src/files/cv-muhle-karbe.pdf` |
| Photo | upload over `src/images/profile.jpg` |
| Email, address, profile links, research interests, "last updated" date | `src/_data/site.yml` |

Leave the other files alone. They control the design and the publishing.

---

## How to edit a file (in the browser)

1. Open the repository on github.com and click through to the file, for example `src` → `_data` → `publications.yml`.
2. Click the **pencil icon** (✏️ "Edit this file") at the top right.
3. Make your change.
4. Click **Commit changes…** (green button), add a short note such as "Add new paper", and click **Commit changes** again.
5. Wait about two minutes, then reload the website.

To check that publishing worked, open the **Actions** tab. A green tick means it succeeded. A red cross means the change has an error (usually a typo in indentation) and the live site has stayed on the previous version. Open the failed run to see the line number, or undo the change.

### Text pages (`.md` files)

These are written in *Markdown*, which is plain text with a few conventions:

- A blank line starts a new paragraph.
- A link is written `[text shown](https://address)`.
- `# Heading` is a big heading and `## Heading` is a smaller one.
- A line starting with `- ` is a bullet point.

Don't change the block between the two `---` lines at the top of each file, except the `description:` text.

### Publications, mentoring and events

The files `mentoring.yml` and `events.yml` work like the publications file: each starts with short instructions, and each person or event is one block you can copy and edit.


Each paper is one block, for example:

```yaml
- title: Hedging of Fixing Exposure
  coauthors:
  - Roel Oomen
  - Benjamin Weber
  status: published
  journal: Mathematical Finance
  details: Vol. 35, No. 4, pp. 818–840
  year: 2025
  links:
    article: https://onlinelibrary.wiley.com/doi/10.1111/mafi.12464
    ssrn: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4796356
```

- **New preprint:** copy a preprint block, paste it at the top of the list, and change the details.
- **Accepted paper:** change `status: preprint` to `status: forthcoming`, add `journal: ...` and remove `year:`.
- **Published paper:** change the status to `published`, then add `details`, `year` and an `article:` link.

The page sorts papers into Preprints, Forthcoming and years automatically.

**Indentation matters.** Use spaces, never tabs, and line things up exactly like the existing entries. If a title contains a colon, wrap the whole title in single quotes: `'Bayes is All You Need: ...'`.

A shortcut: paste a paper's details into Claude (or another AI assistant), ask for "a block for publications.yml in the same format", and paste the result in.

---

## One-time setup (done once, by whoever sets up the site)

1. **Create a GitHub account** at github.com, if you don't have one.
2. **Create a repository:** click **+** → **New repository**, name it `website`, make it **Public**, and create it.
3. **Upload the files:** on the new repository page, click **uploading an existing file**. Drag in *everything inside this folder* (including the hidden `.github` folder; see the note below), then commit.
4. **Switch on publishing:** go to **Settings → Pages**, and under *Build and deployment → Source*, choose **GitHub Actions**.
5. **Check it works:** open the **Actions** tab and wait for the green tick. The site is now live at `https://<your-username>.github.io/website/`. It may look unstyled at that address until step 6 is done, because the site is designed to live on its own domain.
6. **Connect the domain:**
   - Buy `jmuhlekarbe.com` from a registrar such as Cloudflare, Namecheap or Porkbun (about £10 a year).
   - In the registrar's DNS settings, add:
     - a `CNAME` record: name `www`, value `<your-username>.github.io`
     - four `A` records for the bare domain (name `@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - On GitHub, go to **Settings → Pages → Custom domain**, enter `www.jmuhlekarbe.com`, and save. Once the check passes (this can take up to a few hours), tick **Enforce HTTPS**.
7. **Tell search engines about the site:**
   - Add it to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters), and submit `https://www.jmuhlekarbe.com/sitemap.xml` in both. Bing feeds ChatGPT and Copilot search.
   - Add the new address to his **ORCID**, **Google Scholar**, **LinkedIn** and **SSRN** profiles, and to his Imperial staff profile.
   - Ask Imperial to replace the old page at `ma.imperial.ac.uk/~jmuhleka/` with a short note that links to the new site, or to redirect it.

> **Note on the hidden `.github` folder:** Macs and some upload dialogs hide folders whose names start with a dot. If uploading it is awkward, create the file on GitHub instead: click **Add file → Create new file**, type the name `.github/workflows/deploy.yml`, and paste in the contents of that file.

---

## Why the site is built this way (search engines and AI)

- The pages are plain, fast-loading HTML, which search engines and AI assistants read most reliably.
- Every page has hidden **structured data** (schema.org) that states Johannes's name, roles, affiliations, awards and profiles. The Publications page also lists every paper in machine-readable form.
- `/llms.txt` is a short summary written for AI crawlers.
- `/sitemap.xml` and `/robots.txt` help crawlers find everything. All crawlers, including AI crawlers, are allowed.
- Consistent links to Google Scholar, SSRN, arXiv, LinkedIn and ORCID (ORCID is listed in the hidden data only) help AI tools connect this site with his other profiles.

The most useful thing for search visibility is keeping the publications list and the "last updated" date current.

---

## For technical helpers

The site is built with [Eleventy](https://www.11ty.dev/) (Node 22). Run `npm install`, then `npm start` to see a live local preview at http://localhost:8080, or `npm run build` to build into `_site/`. Publishing runs through `.github/workflows/deploy.yml`.

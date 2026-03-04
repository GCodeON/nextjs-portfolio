nvm use
npm install
npm run dev

## On-demand revalidation (Sanity webhook)

1. Add an environment variable in your deployment target:

```
REVALIDATE_SECRET=your-strong-random-secret
```

2. Create a Sanity webhook for blog document changes (create/update/delete/unpublish):

```
POST https://<your-domain>/api/revalidate?secret=<your-strong-random-secret>
```

3. Optional webhook projection payload to revalidate specific blog slug pages:

```
{
	"slug": slug
}
```

The endpoint revalidates `/` and `/blog` always, and `/blog/[slug]` when a slug is provided.

# Welcome to To-do Lists's documentation

## Run Locally

### Initial Setup

1. Import the project on [Vercel](https://vercel.com)
2. Navigate to storage and create a Neon database.
3. Install the [Vercel CLI](https://vercel.com/docs/cli).

Then run:

```bash
npm i # install dependencies
vercel link # link to Vercel project
vercel env pull .env # pull .env variable to link to Neon database
npx prisma db push # push the schema to the db
npm run dev # run dev server
```

### OAuth Providers

To sign in and use OAuth:

1. Create a [GitHub OAuth](https://github.com/settings/apps/new) application (set Authorization callback URL to `http://BASE_URL/api/auth/callback`, replacing BASE_URL with your url).
2. Add the environment variables:

```text
NEXTAUTH_URL="" # the base url of your app
NEXTAUTH_SECRET="" # run "openssl rand -base64 32" to generate the secret
GITHUB_ID="" # the GitHub client id
GITHUB_SECRET="" # the GitHub client secret
```

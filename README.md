# team-b-to-do-list

## Students

- up2207649 - willswats
- up2158448 - rdjtrades
- up2294223 - chloe7243
- up2121666 - gxry-jun
- up2047683 - saq1b786
- up2038282 - axad
- up2118183 - HarveyL101

## Run Locally

1. Import the project on [Vercel](https://vercel.com)
2. Navigate to storage and create a Neon database.
3. Install the [Vercel CLI](https://vercel.com/docs/cli).

Then run:

```bash
npm i # install dependencies
vercel link # link to Vercel project
vercel env pull .env # pull .env variable to link to Neon database
npm run dev # run dev server
```

To sign in and use OAuth:

1. Create a GitHub OAuth application.
2. Add the environment variables:

- `NEXTAUTH_URL` - set it to the base url of your application,
- `NEXTAUTH_SECRET` - run `openssl rand -base64 32` to generate the secret.
- `GITHUB_ID` - the GitHub client id.
- `GITHUB_SECRET` - the GitHub client secret.

## Prisma

To keep the database and schema in sync:

```bash
npx prisma db push
```

To view prisma studio:

```bash
npx prisma studio
```

## Prisma Docs

- [CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

## Resources

- [How to Build a Fullstack App with Next.js, Prisma, and Vercel Postgres](https://vercel.com/guides/nextjs-prisma-postgres)

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

Setting Up Email Sign-Up / Sign-In:

1. You'll need an email service that provides SMTP access, such as: SendGrid, Brevo etc

2. Configure Environment Variables
   Add the following to your .env file:

   EMAIL_SERVER_USER # SMTP server login
   EMAIL_SERVER_PASSWORD # SMTP server password
   EMAIL_SERVER_HOST # smtp.example.com
   EMAIL_SERVER_PORT # 465 or 587
   EMAIL_FROM=your-email@example.com # Default "from" address

3. Install nodemailer
   run "npm install nodemailer"

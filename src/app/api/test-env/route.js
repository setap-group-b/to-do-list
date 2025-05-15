export async function GET() {
  return Response.json({
    githubId: process.env.GITHUB_ID,
    githubSecret: process.env.GITHUB_SECRET ? 'exists' : 'missing',
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'exists' : 'missing'
  });
} 
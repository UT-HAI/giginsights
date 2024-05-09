# Architecture

The relevant technologies used in this project are: 
- Next.js App router with TypeScript + Tailwind CSS
    - Next.js is a React Framework that does Server Side rendering of React
      Code, for more info on how Next App Router works look at:
      https://nextjs.org/docs/app
- Prisma - for data schemas
- PostgreSQL (Currently through Vercel, soon to change to Heroku)
- 
- Google Cloud Engine for OAuth and NextAuth for OAuth on server side

## High level route division



## Database

Most of the database schema is self described in the Prisma files, but there
are essentially two databases.

1. SQL Tables:
    1. Users - High level table containing users
    2. Credentials - Contains credentials of users
    3. Profiles - containes profile info of users (race, ethnicity, age, etc.)
    4. Files - For calendars and Maps, these contain the URL's of the files (currently using vercel blob storage but that may change)
2. Blob Storage - For storage of CSV files

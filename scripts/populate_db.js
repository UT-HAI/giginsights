const { sql } = require("@vercel/postgres");
require("dotenv").config({ path: ".env.local" });

// Define an async function to query the database
async function fetchUsers() {
  const email = "sarimaleem99@gmail.com";
  try {
    const data = await sql`SELECT * FROM USERS where email = ${email}`;
    rows = data["rows"];
  } catch (error) {
    console.error("Error querying the database:", error);
  }
  console.log(rows[0]);
}

async function populateDatabase() {
  const OAuthEmail = "sarimaleem99@gmail.com";
  const OAuthName = "Sarim Aleem";
  const currentTimestamp = new Date().toISOString();

  const data = await sql`SELECT * FROM users WHERE email = ${OAuthEmail}`;
  const rows = data["rows"];
  // if there's no rows, then create an OAuth account
  if (rows.length == 0) {
    await sql`INSERT INTO users (email, name, AuthType, CreatedAt, UpdatedAt)
      VALUES (${OAuthEmail}, ${OAuthName}, ${"Google"}, ${currentTimestamp}, ${currentTimestamp})`;
  }
}

async function deleteRows() {
  await sql`DELETE FROM users`;
}

// Call the function
// fetchUsers();
// populateDatabase();
fetchUsers();

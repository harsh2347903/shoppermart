// Load variables from a local .env file (e.g. MONGO_URI) into process.env.
// This must run before we require anything that reads those variables.
require('dotenv').config();

// Node.js runs this file. Express creates the web application it starts.
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// Connect to database in the background (with retry logic)
connectDB();

// Start listening immediately so Render and cloud hosts detect the open port right away
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server is running on port ${PORT} (http://0.0.0.0:${PORT})`);
});


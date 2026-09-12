// Load variables from a local .env file (e.g. MONGO_URI) into process.env.
// This must run before we require anything that reads those variables.
require('dotenv').config();

// Node.js runs this file. Express creates the web application it starts.
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// We connect to MongoDB first and only start listening for requests once
// that succeeds. Otherwise the server could accept requests it can't fulfil.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Express server is running at http://localhost:${PORT}`);
  });
});

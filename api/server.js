const app = require("./app");
require("./config/db");
const PORT = 3001;

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

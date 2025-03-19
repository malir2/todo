import app from "./app.js";
import Database_Connection from "./database/db.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 4000;

Database_Connection()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is runing on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err, " Failed to run app");
  });

import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificatiosRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificatiosRoutes);

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.listen(3333, () => console.log("Server is running"));

import express, { Express, NextFunction, Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js"; // Se till att sökvägen är korrekt

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/", express.json());

app.get("/", (_req, res) => {
  res.send("Hello Chappy!");
});
app.use("/", (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use("/user", userRoutes);

// app.use("/", express.static("./frontend-src"));

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

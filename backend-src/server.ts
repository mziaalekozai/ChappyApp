import express, { Express, NextFunction, Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js"; // Se till att sökvägen är korrekt
import chatMessagesRouter from "./routes/RoomMessageRoutes.js";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes.js";

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/", express.json());

app.get("/", (_req, res) => {
  res.send("Hello Chappy!");
});
app.use("/", (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use("/user", userRoutes);
app.use("/message", chatMessagesRouter);
app.use("/room", roomRoutes);

app.use("/", express.static("./dist"));

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

import express from "express";
import userRoutes from "./routes/userRoutes.js"; // Se till att sökvägen är korrekt
import cors from "cors";
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use("/", express.json());
app.get("/", (_req, res) => {
    res.send("Hello Chappy!");
});
app.use("/", (req, _res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});
app.use("/user", userRoutes);
app.use("/", express.static("./src"));
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

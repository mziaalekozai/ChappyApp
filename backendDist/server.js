import express from "express";
import userRoutes from "./routes/userRoutes.js"; // Se till att sökvägen är korrekt
const app = express();
const port = process.env.PORT || 3000;
app.use("/", express.json());
app.get("/", (_req, res) => {
    res.send("Hello Chappy!");
});
app.use("/", (req, _res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});
app.use("/user", userRoutes);
// app.use("/", express.static("./frontend-src"));
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

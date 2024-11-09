import express, { Request, Response } from "express";
import { Dm } from "../models/DM.js";
import { creatDm } from "../mongoDB-src/DMs/addDM.js";
import { isValidDm } from "../data/validationDM.js";
import { getAllDms } from "../mongoDB-src/DMs/fetchUserDM.js";
import { getMatchingDms } from "../mongoDB-src/DMs//getMacthningDms.js";
import { ObjectId, WithId } from "mongodb";
import { deleteDM } from "../mongoDB-src/DMs/deleteDM.js";

const router = express.Router();

router.get("/", async (_, res: Response<WithId<Dm>[]>) => {
  try {
    const dms = await getAllDms();
    res.send(dms);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/user/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const userDms = await getMatchingDms(username);
    res.json(userDms);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/addDM", async (req: Request, res: Response) => {
  const newDm: Dm = req.body;
  if (isValidDm(newDm)) {
    try {
      await creatDm(newDm);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});
router.delete("/delete/:id", async (req: Request, res: Response) => {
  const dmId = req.params.id;
  try {
    const result = await deleteDM(new ObjectId(dmId));
    if (result) {
      res.status(200).json({ message: "DM deleted successfully" });
    } else {
      res.status(404).json({ message: "DM not found" });
    }
  } catch (error) {
    console.error("Error deleting DM:", error);
    res.status(500).json({ message: "Error deleting DM", error });
  }
});

export default router;

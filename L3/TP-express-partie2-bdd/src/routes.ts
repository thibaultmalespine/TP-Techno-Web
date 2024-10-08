import express from "express";
import {
  getHomePage,
  getMenusPage,
  getCommanderPage,
  createCommandeFromFormulaire,
  getCommandesPage,
} from "./controlllers";
const router = express.Router();

router.get("/ping", (req, res) => res.sendStatus(200));

router.get("/", getHomePage);

router.get("/menus", getMenusPage);

router.get("/commander", getCommanderPage);

router.post("/commander", createCommandeFromFormulaire);

router.get("/commandes", getCommandesPage);

export default router;

import { Request, Response } from "express";
import {
  createCommande,
  getAllCommandes,
  getCommandesByMenuId,
  getAllMenus,
  getMenuById,
  getRestaurant,
  deleteCommandeWithId,
} from "./models";

function getHomePage(req: Request, res: Response) {
  const restaurant = getRestaurant();
  res.render("home", {
    title: restaurant.name,
    name: restaurant.name,
    description: restaurant.description,
  });
}

async function getMenusPage(req: Request, res: Response) {
  const restaurant = getRestaurant();
  const menus = await getAllMenus();
  res.render("menus", {
    menus,
    title: `Menus - ${restaurant.name}`,
  });
}

async function getCommanderPage(req: Request, res: Response) {
  const menuId = req.query.menu;
  const restaurant = getRestaurant();
  const menu = await getMenuById(menuId as string);
  if (!menu) return res.status(404);
  res.render("commander", {
    menu,
    title: `Commander - ${restaurant.name}`,
  });
}

async function createCommandeFromFormulaire(req: Request, res: Response) {
  const { name, address, phone, menuId } = req.body;

  const restaurant = getRestaurant();
  const menu = await getMenuById(menuId as string);
  const commandeId = await createCommande(name, address, phone, menuId);
  if (!menu) return res.status(404);

  res.render("commander", {
    commandeInfo: {
      name,
      address,
      phone,
      commandeId,
    },
    title: `Commander - ${restaurant.name}`,
    menu,
  });
}

async function getCommandesPage(req: Request, res: Response) {
  const commandes =
    req.query.menu === undefined
      ? await getAllCommandes()
      : await getCommandesByMenuId(req.query.menu as String);

  res.render("commandes", {
    commandes,
  });
}

async function deleteCommande(req: Request, res: Response) {
  const id = req.params.id;
  await deleteCommandeWithId(id);
  const commandes = await getAllCommandes();
  res.render("commandes", {
    commandes,
  });
}

export {
  getHomePage,
  getMenusPage,
  getCommanderPage,
  createCommandeFromFormulaire,
  getCommandesPage,
  deleteCommande,
};

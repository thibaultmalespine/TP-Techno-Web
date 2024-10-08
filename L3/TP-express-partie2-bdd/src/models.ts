import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD,
});

/**
 * ----------------
 * Menu model
 * ----------------
 * */

type Menu = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export async function getMenuById(id: string): Promise<Menu | undefined> {
  const queryResult = await db.execute("SELECT * FROM menus WHERE id = ?", [
    id,
  ]);
  const menus: Array<Menu> = queryResult[0] as Array<Menu>;

  return menus[0];
}

export async function getAllMenus(): Promise<Array<Menu>> {
  const queryResult = await db.execute("SELECT * FROM menus");
  return queryResult[0] as Array<Menu>;
}

/**
 * ----------------
 * Restaurant model
 * ----------------
 * */

export function getRestaurant() {
  return restaurant;
}

/**
 * --------------
 * Commande model
 * --------------
 */

type Commande = {
  id: String;
  name: String;
  address: String;
  phone: String;
  menuId: String;
};

export async function createCommande(
  name: string,
  address: string,
  phone: string,
  menuId: string,
): Promise<Commande> {
  const queryResult = await db.execute(
    "INSERT INTO orders(name, address, phone, menu_id) VALUES(?,?,?,?)",
    [name, address, phone, menuId],
  );
  console.log(queryResult);

  //@ts-ignore
  return queryResult[0].insertId;
}

export async function getAllCommandes(): Promise<Array<Commande>> {
  const queryResult = await db.execute("SELECT * FROM orders");

  return queryResult[0] as Array<Commande>;
}
/**
 * ----
 * Data
 * ----
 * */

const menus = [
  {
    id: "61mixabq",
    name: "Kebab",
    price: 8,
    description: "Le Kebab classique, salade tomate oignon",
  },
  {
    id: "8s6op8k3",
    name: "Falafel",
    price: 7,
    description: "Le sandwish falafel, végétarien",
  },
  {
    id: "9t9ram2z",
    name: "Kefta",
    price: 8,
    description:
      "Le sandwish kefta avec de la viande hachée grillée et des épices",
  },
];

const restaurant = {
  name: "Fraternité Kebab's",
  description:
    "Le meilleur kebab de la ville, avec des frites maison et une sauce secrète.",
};

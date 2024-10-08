import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import router from "./routes";

const app = express();

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

app.use((req, res, next) => {
  next();
  if (res.statusCode === 404) {
    res.render("erreur", { code: 404, message: "Page non trouvée" });
  }
  if (res.statusCode === 500) {
    res.render("erreur", { code: 500, message: "Erreur serveur" });
  }
});

app.use(router);

const server = app.listen(3000, () =>
  console.log("Server started on http://localhost:3000"),
);

// Code à ne pas toucher, permet le hot reload
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", () => {
    server.close();
  });
}

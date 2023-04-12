import { Router } from "express";
import { inserir, listar, buscar, atualizar, deletar } from "../controller/categoria";

export const routerCategoria = Router();

routerCategoria.post("/categoria",inserir)
routerCategoria.get("/categoria",listar)
routerCategoria.get("/categoria/:id",buscar)
routerCategoria.put("/categoria/:id",atualizar)
routerCategoria.delete("/categoria/:id",deletar)


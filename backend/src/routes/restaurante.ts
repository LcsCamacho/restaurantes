import { Router } from "express";
import { inserir, listar, buscar, atualizar, deletar } from "../controller/restaurante";

export const routerRestaurante = Router();

routerRestaurante.post("/restaurante",inserir)
routerRestaurante.get("/restaurante",listar)
routerRestaurante.get("/restaurante/:id",buscar)
routerRestaurante.put("/restaurante/:id",atualizar)
routerRestaurante.delete("/restaurante/:id",deletar)




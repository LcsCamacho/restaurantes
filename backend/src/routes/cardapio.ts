import { Router } from "express";
import { inserir, listar, buscar, atualizar, deletar } from "../controller/cardapio";

export const routerCardapio = Router();

routerCardapio.post("/cardapio",inserir)
routerCardapio.get("/cardapio",listar)
routerCardapio.get("/cardapio/:id",buscar)
routerCardapio.put("/cardapio/:id",atualizar)
routerCardapio.delete("/cardapio/:id",deletar)

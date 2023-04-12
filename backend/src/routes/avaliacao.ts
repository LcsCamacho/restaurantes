import { Router } from "express";
import { inserir, listar, buscar, atualizar, deletar } from "../controller/avaliacao";

export const routerAvaliacao = Router();

routerAvaliacao.post("/avaliacao",inserir)
routerAvaliacao.get("/avaliacao",listar)
routerAvaliacao.get("/avaliacao/:id",buscar)
routerAvaliacao.put("/avaliacao/:id",atualizar)
routerAvaliacao.delete("/avaliacao/:id",deletar)


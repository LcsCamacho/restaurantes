import { Router } from "express";
import { inserir, listar, buscar, atualizar, deletar, login } from "../controller/usuario";

export const routerUsuario = Router();

routerUsuario.post("/usuario",inserir)
routerUsuario.post("/login",login)
routerUsuario.get("/usuario",listar)
routerUsuario.get("/usuario/:id",buscar)
routerUsuario.put("/usuario/:id",atualizar)
routerUsuario.delete("/usuario/:id",deletar)


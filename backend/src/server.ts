//imports
import express from 'express'
import cors from 'cors'
import { routerRestaurante } from './routes/restaurante';
import { routerCategoria } from './routes/categoria';
import { routerAvaliacao } from './routes/avaliacao';
import { routerCardapio } from './routes/cardapio';
import { routerUsuario } from './routes/usuario';


//app
const app = express();
app.use(cors());
app.use(express.json());
app.use(routerRestaurante)
app.use(routerCategoria)
app.use(routerAvaliacao)
app.use(routerCardapio)
app.use(routerUsuario)


//teste
app.listen(3777, () => {
    console.log('Server running on port 3777')
});
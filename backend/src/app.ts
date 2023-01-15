import express from 'express';
import cors from 'cors';
import { gameEndPoint } from '../src/controllers/game/gameEndPoint'

const app = express();

app.use(cors());
app.use('/game', gameEndPoint);

export default app;
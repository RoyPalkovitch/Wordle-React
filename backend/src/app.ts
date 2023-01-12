import express from 'express';
import cors from 'cors';
import { gameRouter } from '../src/controllers/game/gameEndPoint'

const app = express();

app.use(cors());
app.use('/game', gameRouter);

export default app;
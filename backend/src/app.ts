import express from 'express';
import cors from 'cors';
import { gameRouter } from './game/gameRouter';


const app = express();

app.use(cors());
app.use('/game', gameRouter);

export default app;
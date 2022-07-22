import express from 'express';
import config from './src/database/config.js';
import cors from 'cors';
import router from './src/routes/index.js';
const app = express();
app.use(cors())
app.use(express.json());
app.use(router);
const PORT = 5000;
config();

app.listen(PORT, () => {
     console.log(`Running on PORT ${PORT}`);
})
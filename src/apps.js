const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

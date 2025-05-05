const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const hltlAuthRoutes = require('./hltlRoutes/hltlAuthRoutes.js');
const hltlPetsRoutes = require('./hltlRoutes/hltlPetsRoutes.js');
const hltlCategoryRoutes = require('./hltlRoutes/hltlCategoryRoutes.js');
const hltlGendersRoutes = require('./hltlRoutes/hltlGendersRoutes.js');
const hltlRacesRoutes = require('./hltlRoutes/hltlRacesRoutes.js');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/hltlAuth', hltlAuthRoutes);
app.use('/hltlPets', hltlPetsRoutes);
app.use('/hltlCategory', hltlCategoryRoutes);
app.use('/hltlGenders', hltlGendersRoutes);
app.use('/hltlRaces', hltlRacesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

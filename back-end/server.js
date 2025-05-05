const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const prisma = require('./src/prismaClient');
const { port } = require('./src/config/hltlConfig');

const authRoutes = require('./src/routes/hltlAuthRoutes');
const clienteRoutes = require('./src/routes/hltlClienteRoutes');
const facturaRoutes = require('./src/routes/hltlFacturaRoutes');
const productoRoutes = require('./src/routes/hltlProductoRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/productos', productoRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Documentación en http://localhost:${port}/api-docs`);
});

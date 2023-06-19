require('dotenv').config(); // Corrige la importación de dotenv
const express = require('express'); // Utiliza require en lugar de import
const { json } = require('express'); // Utiliza require en lugar de import
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { createConnection, createTable } = require('./database'); // Utiliza require en lugar de import

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/productos', async (_req, res) => {
  await createTable();

  const connection = createConnection();

  connection.query(`SELECT * FROM productos`, (err, result) => { // Utiliza "connection" en lugar de "conn"
    if (err) {
      return res.status(500).json({
        message: 'Error al traer datos'
      });
    }
    res.json(result);
  });
});

app.post('/productos', async (req, res) => {
  await createTable();
  const { nom_prod, precio_prod } = req.body;
  const connection = createConnection(); // Utiliza "connection" en lugar de "conn"

  connection.query(`INSERT INTO productos SET ?`, { nom_prod, precio_prod }, (err, result) => { // Utiliza "connection" en lugar de "conn"
    if (err) {
      return res.status(500).json({
        message: 'No se puede insertar producto'
      });
    }
    res.json({
      message: 'El producto se insertó correctamente'
    });
  });
});

app.listen(process.env.PORT ||  4000, () => {
  console.log(`El servidor está corriendo en el puerto ${process.env.PORT}`);
});

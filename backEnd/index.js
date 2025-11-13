const app = require("./src/app");
const dotenv = require("dotenv");
dotenv.config();


const PORT = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API Backend de CitrusTrack' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Puerto de escucha: ${PORT}`);
});

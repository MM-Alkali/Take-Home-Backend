import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/users';
import db from './config/database';
import firebaseAuthMiddleware from './middlewares/auth';

const app = express();
const PORT = process.env.PORT || 5000;

db.sync({ force: false })
  .then(() => {
    console.log('Database successfully connected');
  })
  .catch((error: any) => {
    console.error('Error connecting to database:', error);
  });

app.use(cors());
app.use(express.json());

app.use('/data', firebaseAuthMiddleware, apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

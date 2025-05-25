import './loadEnv.js';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import sessionRoutes from './routes/session.routes.js';
import userRoutes from './routes/user.routes.js';
import './config/passport.js';

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));
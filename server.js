import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js"; // Importar passport después de inicializar app
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express(); // Aquí se inicializa `app`
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use("/api/sessions", authRoutes);

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((err) => console.log("Error en la conexión:", err));

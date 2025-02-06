import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import dotenv from "dotenv";

dotenv.config();

//Registro
passport.use(
  "register",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const userExists = await User.findOne({ email });
        if (userExists) return done(null, false, { message: "Usuario ya existe" });

        const hashedPassword = hashPassword(password);
        const newUser = await User.create({ ...req.body, password: hashedPassword });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

//Login
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !comparePassword(password, user.password)) {
          return done(null, false, { message: "Credenciales inválidas" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

//JWT
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies?.token]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;

import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.js";

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists)
          return done(null, false, {
            message: `El usuario con el mail ${email} ya está registrado`,
          });

        const hashedPassword = createHash(password);
        const newUser = await User.create({
          first_name,
          last_name,
          email,
          age,
          password: hashedPassword,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, { message: "Usuario no encontrado" });

        if (!isValidPassword(user, password))
          return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log("JWT Payload:", jwt_payload); // Registro para depuración
      const user = await User.findById(jwt_payload.id).select("-password");
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

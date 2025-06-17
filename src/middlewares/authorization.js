export const authorize = (roles) => (req, res, next) => {

  if (!req.user) {
    console.error("Error: req.user es undefined");
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  if (!roles.includes(req.user.role)) {
    console.error(`Error: Rol ${req.user.role} no autorizado para esta acción`);
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authGuard(req, res, next) {
  console.log(req.cookies)
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ status: "unauthorized" });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ status: "forbidden: token expired" });
    }
    req.decoded = decoded;
    next();
  });
}

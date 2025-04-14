const validRoles = ["user", "broker", "admin"];
export default function roleVer(req, res, next) {
  const { role } = req.params;
  if (!validRoles.includes(role))
    return res
      .status(400)
      .json({ status: "request failed", reason: "INVALID ROLE" });
  else next();
}

export default function dataVerf(req, res, next) {
  const path = req.path.split("/");
  const isLogin = path[1] === "login"

  const { email, username, password } = req.body ?? {};
  console.log(req.body)

  if (!email || !password)
    return res
      .status(400)
      .json({ status: "request failed", reason: "no email / password" });
  else {
    if (!isLogin && !username)
      return res
        .status(400)
        .json({ status: "request failed", reason: "no username provided" });
  }
  next();
}

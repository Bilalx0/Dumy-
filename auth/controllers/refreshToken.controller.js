import { createTokens } from "../utils/handleData.util.js";
import userM from "../models/user.model.js";
import brokerM from "../models/broker.model.js";
import adminM from "../models/admin.model.js";

export default async function refreshToken(req, res) {
  const decoded = req.decoded;
  const { accessToken, refreshToken } = createTokens(decoded.userId);
  
  // Find user in any of the collections to determine role
  let user;
  let role;
  
  user = await adminM.findOne({ userId: decoded.userId });
  if (user) {
    role = 'admin';
  } else {
    user = await brokerM.findOne({ userId: decoded.userId });
    if (user) {
      role = 'broker';
    } else {
      user = await userM.findOne({ userId: decoded.userId });
      if (user) {
        role = 'user';
      }
    }
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days again
  });
  
  res.status(200).json({ 
    accessToken,
    username: user ? user.username : null,
    role
  });
}

import userM from "../models/user.model.js";
import brokerM from "../models/broker.model.js";
import adminM from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const modelMap = {
  user: userM,
  broker: brokerM,
  admin: adminM,
};

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export default async function createDataEntry(role, creds) {
  const { email, username, password: p } = creds;
  if (
    (await userM.findOne({ email, username })) ||
    (await brokerM.findOne({ email, username })) ||
    (await adminM.findOne({ email, username }))
  )
    return;
  // create the entry
  // hash the password
  const password = hashPassword(p);
  creds = { email, username, password };
  return new modelMap[role](creds);
}
export async function verifyCreds(role, creds) {
  const model = modelMap[role];
  const { email, password } = creds;
  const credsMatched = await model.findOne({ email });
  if (!credsMatched) return;
  // compare both passwords
  const passwordMatched = bcrypt.compareSync(password, credsMatched.password);
  if (!passwordMatched) return;
  // return the entry
  return credsMatched;
}
export function createTokens(userId) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
}

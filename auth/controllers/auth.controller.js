import createDataEntry from "../utils/handleData.util.js"; // to handle data creation
import { verifyCreds } from "../utils/handleData.util.js"; // to verify credentials for a successful login
import { createTokens } from "../utils/handleData.util.js";

export const signup = async (req, res) => {
  const { role } = req.params;
  const { email, username, password } = req.body;
  // create a new entry in the database
  const dataEntry = await createDataEntry(role, { email, username, password });
  if (!dataEntry)
    return res
      .status(400)
      .json({
        status: "request failed",
        reason: "username / email already exists",
      });
  //save the entry
  dataEntry.save();

  // Here, create a json webtoken
  const { accessToken, refreshToken } = createTokens(dataEntry.userId);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({ 
    accessToken,
    username: dataEntry.username,
    role 
  });
};

export const login = async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;
  // verify the credentials
  const matchedEntry = await verifyCreds(role, { email, password });
  if (matchedEntry) {
    const { accessToken, refreshToken } = createTokens(matchedEntry.userId);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ 
      accessToken, 
      username: matchedEntry.username,
      role 
    });
  } else
    res.status(400).json({
      status: "request failed",
      reason: "invalid email or password",
    });
};

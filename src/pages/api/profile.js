export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Authorization header missing");
  }

  const auth = await req.headers.authorization;

  try {
    const { token } = JSON.parse(auth);

    if (token) {
      return res.status(200).json({ status: "You are authorized" });
    } else {
      throw new Error("Token is missed");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

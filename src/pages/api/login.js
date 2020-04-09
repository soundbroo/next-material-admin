const USERS = {
  test: {
    id: 1,
    password: "test",
  },
  admin: {
    id: 2,
    password: "admin",
  },
};

export default async (req, res) => {
  const { loginValue, passwordValue } = await req.body;
  console.log("loginValue", loginValue, "passwordValue", passwordValue);

  const checkUser = (loginValue, passwordValue) => {
    if (USERS?.[loginValue].password === passwordValue) {
      return true;
    }
    return false;
  };

  try {
    if (checkUser(loginValue, passwordValue)) {
      return res.status(200).json({ token: USERS?.[loginValue].id });
    } else {
      throw new Error("Wrong auth data");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

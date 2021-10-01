import jwt from "jsonwebtoken";
const SECRET = "LET ME TELL YOU A $ECRET!";

// users hardcoded for simplicity, store in a db for production applications
const users = {
  "admin@acme.co": { pwdHash: "ssap", name: "Admin" }, // pass
  "test@test.com": { pwdHash: "tset", name: "Test" },
  "user@email.com": { pwdHash: "drowssap", name: "User" }, // password
};

// real authentication is out of the scope for this project, so we'll use a simple function with hardcoded values
const superSafeEncrypt = (textPassword) => [...textPassword].reverse().join("");

const isMatchingPassword = (email, password) => {
  const encrypted = superSafeEncrypt(password);
  return users[email].pwdHash === encrypted;
};

const authenticate = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users[email];
      if (user && isMatchingPassword(email, password)) {
        const { name } = user;
        resolve({
          message: "login successful",
          username: name,
          token: jwt.sign({ username: name }, SECRET, { expiresIn: "7d" }),
        });
      } else {
        reject("bad username or password");
      }
    }, 500); // a small delay to make it more realistic
  });
};

export default authenticate;

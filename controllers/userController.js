import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function saveUser(req, res) {
  if (req.body.role === "admin") {
    if (req.user.role == null) {
      res.status(403).json(
        { message: "please log in!" }

      );
      return;
    }
    if (req.user.role !== "admin") {
      res.status(403).json(
        { message: "only admin can create admin user" }
        
      );
      return;
    }
    
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    role: req.body.role || "user",
  });

  user
    .save()
    .then(() => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user == null) {
      res.status(500).json({ message: "User not found" });
    } else {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const userData = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          phone: user.phone,
          isDisabled: user.isDisabled,
          isEmailVerified: user.isEmailVerified,
        };
        const token = jwt.sign(userData, "test456");

        res.status(200).json({ message: "Login successful", token: token });
      } else {
        res.status(403).json({ message: "Invalid password" });
      }
    }
  });
}

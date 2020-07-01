const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/User");
const auth = require("../middleware/auth");
const { sendWelcomeEmail } = require("../emails/account");

const router = express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  const { name, email } = user;

  try {
    await user.save();
    // sending welcome email when user is created
    sendWelcomeEmail(name, email);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logout-all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) return res.status(400).send({ error: "Invalid update" });

  try {
    // const _id = req.params.id;

    // const user = await User.findById(_id);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    // if (!user) return res.status(404).send();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  // const _id = req.user._id;

  try {
    // const user = await User.findByIdAndDelete(_id);
    // if (!user) return res.status(404).send();
    console.log(req.user);

    await req.user.remove();

    res.send(req.user);
    // await user.remove();
    // res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    filesize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a image file"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;

const { Op, where } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const url_img = process.env.url_img;
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (user, verificationToken) => {
  const verificationLink = `http://localhost:3000/vp/${verificationToken}`;

  const mailOptions = {
    from: "nodkymayler@gmail.com",
    to: user.email,
    subject: "Account Verification",
    html: `<p>Please click the following link to verify your account:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = nanoid();

      await db.User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
      });

      // Mengirim email verifikasi setelah pengguna berhasil mendaftar
      sendVerificationEmail({ email }, verificationToken);

      return await db.User.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { emname, password } = req.body;

      // console.log(req.body);
      // const whereClause = {};

      // if (name && email) {
      //   whereClause[Op.or] = [{ name }, { email }];
      // } else if (name) {
      //   whereClause.name = name;
      // } else if (email) {
      //   whereClause.email = email;
      // }

      const user = await db.User.findOne({
        where: { [Op.or]: [{ name: emname }, { email: emname }] },
        // where: whereClause,
      });
      console.log(user);

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        if (match) {
          const payload = {
            id: user.id,
          };

          const generateToken = nanoid();

          const token = await db.Token.create({
            expires: moment().add(1, "days").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
            valid: true,
          });
          return res.send({
            message: "Login Success",
            value: user,
            token: token,
          });
        } else {
          throw new Error("Login Denied");
        }
      } else {
        res.status(404).send({
          message: "Login Not Found",
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, password, verify } = req.body;
      await db.User.Update(
        {
          name,
          email,
          password,
          verify,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => {
        res.send({
          message: "User Updated",
          data: result,
        });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  updateUserByEmail: async (req, res) => {
    try {
      const { verify } = req.body;
      await db.User.Update(
        {
          verify,
        },
        {
          where: {
            email: req.params.email,
          },
        }
      );
      return await db.User.findOne({
        where: {
          email: req.params.email,
        },
      }).then((result) => {
        res.send({
          message: "User Updated",
          data: result,
        });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const user = await db.User.findAll();
      console.log(user);
      return res.send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },

  getByName: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          name: req.query.name,
        },
      });
      return res.send(user);
    } catch (err) {
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  getByEmail: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.query.email,
        },
      });
      return res.send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },

  getByToken: async (req, res, next) => {
    console.log("masuk sini");
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      console.log(req.headers.authorization);
      let p = await db.Token.findOne({
        where: {
          [Op.and]: [
            {
              token,
            },
            {
              expired: {
                [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                [Op.lte]: moment().add(1, "d").format(),
              },
            },
          ],
        },
      });
      if (!p) {
        throw new Error("token has expired");
      }
      user = await db.User.findOne({
        where: {
          id: JSON.parse(p?.dataValues?.payload).id,
        },
      });
      delete user.dataValues.password;
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  getUserByToken: async (req, res) => {
    console.log("masuk sini juga");
    console.log(req.user);
    res.send(req.user);
  },

  verify: async (req, res) => {
    const { token } = req.body;
    // console.log(req.body);
    try {
      const user = await db.User.findOne({
        where: { verificationToken: token },
      });
      if (!user) {
        return res
          .status(404)
          .send({ error: "Verification token is not valid" });
      }

      user.verify = true;
      user.verificationToken = null;
      await user.save();
      console.log("hello");
      return res.status(200).send({ message: "Verification has succeeded" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, email, password, verify, username, bio } = req.body;
      const { id } = req.params;

      // Periksa apakah pengguna dengan ID yang diberikan ada di database
      const user = await db.User.findByPk(id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // Update data pengguna
      user.name = name;
      user.email = email;
      user.password = await bcrypt.hash(password, 10);
      user.verify = verify;
      user.username = username;
      user.bio = bio;

      // Simpan perubahan pada pengguna
      await user.save();

      return res.send({ message: "User updated", data: user });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const { name, username, bio } = req.body;
      const filename = req.file?.filename;
      const editClause = {};
      let check;
      console.log(name);
      if (name) {
        editClause.name = name;
      }
      console.log(username);
      if (username) {
        editClause.username = username;
        check = await db.User.findOne({
          where: {
            username,
          },
        });

        if (check?.dataValues.username == username) {
          return res.send("username already been used");
        }
      }
      console.log(filename);
      if (filename) {
        editClause.img_url = url_img + filename;
      }
      console.log(bio);
      if (bio) {
        editClause.bio = bio;
      }
      if (!Object.keys(editClause).length) {
        return res.send({ message: "No fields to update" });
      }
      console.log(req.params.id);
      console.log(editClause);
      const update = await db.User.update(editClause, {
        where: {
          id: req.params.id,
        },
      });
      console.log(update);

      return await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => {
        delete result.dataValues.password;
        res.send(result.dataValues);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },

  uploadAvatar: async (req, res) => {
    try {
      // console.log("masuk");
      const { filename } = req.file;
      await db.User.update(
        {
          img_url: url_img + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (error) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;

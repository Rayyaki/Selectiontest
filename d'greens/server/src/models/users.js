module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "Users",
    {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      username: Sequelize.STRING,
      bio: Sequelize.STRING,
      verificationToken: Sequelize.STRING,
      verify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      img_url: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return user;
};

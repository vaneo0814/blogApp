//bcrypt for password hashing
var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Author.associate = function(models) {
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
    console.log(models);
  };


  Author.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  Author.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Author;
};
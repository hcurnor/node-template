module.exports = function (Schema) {

  return new Schema({
    email: {
      type: String
    },
    name: {
      type: String
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    }
  }, {
    timestamps: true
  });

};

module.exports = function (Schema) {

  return new Schema({
    jwt: {
      type: String,
      allowNull: false,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      allowNull: false,
      ref: 'User'
    }
  }, {
    timestamps: true
  });

};

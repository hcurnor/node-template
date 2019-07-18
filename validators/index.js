module.exports = function (joi) {

  return {
    validateSignUpInputs: async function (input) {
      const schema = joi.object().keys({
        name: joi.string().required().error(new Error('Company name is required!')),
        email: joi.string().email().required().error(new Error('Email is required. Must be a valid email!')),
        // eslint-disable-next-line no-useless-escape
        password: joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/).required()
          .error(new Error('Password must be of at least 6 characters!'))
      });
      try {
        return await joi.validate(input, schema);
      } catch (ex) {
        return ex;
      }
    },
    validateLoginInputs: async function (input) {
      const schema = joi.object().keys({
        email: joi.string().email().required().error(new Error('Email is required. Must be a valid email!')),
        // eslint-disable-next-line no-useless-escape
        password: joi.string().regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/).required()
          .error(new Error('Password is required!'))
      });
      try {
        return await joi.validate(input, schema);
      } catch (ex) {
        return ex;
      }
    }
  };

};

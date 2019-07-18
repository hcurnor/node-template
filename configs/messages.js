module.exports = {
  AUTHENTICATION_FAILED: {
    code: 400,
    message: 'Authentication failed!',
    success: false
  },
  SUCCESSFUL_LOGIN: {
    code: 200,
    message: 'Successfully log in!',
    success: true
  },
  SUCCESSFUL_LOGOUT: {
    code: 200,
    message: 'Successfully log out!',
    success: true
  },
  INVALID_CODE: {
    code: 400,
    message: 'Invalid Code!',
    success: false
  },
  SUCCESSFUL_SIGNUP: {
    code: 200,
    message: 'Successfully signed up!',
    success: true
  },
  EMAIL_EXIST: {
    code: 409,
    message: 'Email address already exists!',
    success: false
  },
  EMAIL_DOES_NOT_EXIST: {
    code: 200,
    message: 'Email is allowed!',
    success: true
  },
  USERNAME_EXIST: {
    code: 409,
    message: 'Username already taken!',
    success: false
  },
  USERNAME_AVAILABLE: {
    code: 200,
    message: 'Username is available!',
    success: true
  },
  USER_DOES_NOT_EXIST: {
    code: 404,
    message: 'User does not exist!',
    success: false
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error!',
    success: false
  },
  INVALID_INPUT: {
    code: 400,
    message: 'Validation error!',
    success: false
  },
  SUCCESSFUL_DELETE: {
    code: 200,
    message: 'Successfully deleted!',
    success: true
  },
  SUCCESSFUL_UPDATE: {
    code: 200,
    message: 'Successfully updated!',
    success: true
  },
  SUCCESSFUL: {
    code: 200,
    success: true,
    message: 'Successful!'
  },
  REQUIRED_DATA_NOT_FOUND: {
    code: 404,
    message: 'Cannot find required data!',
    success: false
  },
  TOKEN_EXPIRED: {
    code: 401,
    message: 'The token has expired, please login again!',
    success: false
  },
  TOKEN_INVALID: {
    code: 401,
    message: 'The token is invalid, please login again!',
    success: false
  },
  FORBIDDEN: {
    code: 403,
    message: 'Unauthorized!',
    success: false
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Invalid request!',
    success: false
  },
  IN_COMPLETE_REQUEST: {
    code: 422,
    message: 'Required parameters missing!',
    success: false
  }
};

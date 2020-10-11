const { check, validationResult } = require('express-validator');

exports.signupValidator = [
  check('username').not().isEmpty().trim().withMessage('All fields Required'),
  check('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
  check(
    'password',
    'Please enter a password at least 6 character and contain At least one uppercase.At least one lower case.At least one special character.'
  )
    .isLength({ min: 6 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
];

exports.signinValidator = [
  check('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
  check('password').isLength({ min: 6 }),
];

exports.validatorResult = (req, res, next) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  if (hasErrors) {
    console.log('Has Error >>', hasErrors);
    console.log('Result >> ', errors);
    const firstError = errors.array()[0].msg;
    return res
      .status(400)
      .json({ errors: errors.array(), errorMessage: firstError });
  }
  next();
};

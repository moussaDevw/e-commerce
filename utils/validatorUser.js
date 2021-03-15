const {check} = require('express-validator')

exports.userSignupValidator = [
    check('firstName')
    .not()
    .isEmpty()
    .withMessage('Champ prenom obligatoire'),
    check('lastName')
    .not()
    .isEmpty()
    .withMessage('Champ nom obligatoire'),
    check('email')
    .isEmail()
    .withMessage('veuillez saisir un email valide'),
    check('hashed_password')
    .not()
    .isEmpty()
    .isLength({min:8})
    .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
]
exports.userSigninValidator = [
    check('email')
    .isEmail()
    .withMessage('veuillez saisir un email valide'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Champ obligatoire'),
]
const Joi = require('joi');

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.(fr|com|net)$/).required(),
    password: Joi.string()
        .min(12)
        .max(30)
        .pattern(/(?=.*[A-Z])/, 'at least one uppercase letter')
        .pattern(/(?=.*\d)/, 'at least one digit')
        .pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/ , 'at least one special character')
        .required(),
    confirmPassword: Joi.ref('password'),
    profile_picture: Joi.string().allow(null),
    cityId: Joi.number().allow(null),
    theme: Joi.string().valid('light', 'dark').allow(null),
    address: Joi.string().min(3).allow(null),
    birth_date: Joi.string()
        .allow(null)
        .custom((value, helpers) => {
            // Si une date est fournie, vérifier le format 'yyyy-mm-dd'
            if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                return helpers.message('birth_date must be in YYYY-MM-DD format');
            }
            // Vérifier l'âge si la date est valide
            const date = new Date(value);
            if (date > eighteenYearsAgo) {
                return helpers.message('User must be at least 18 years old');
            }            
            return value;
        })
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.(fr|com|net)$/).required(),
    theme: Joi.string().valid('light', 'dark').allow(null),
    birth_date: Joi.string()
    .allow(null)
    .custom((value, helpers) => {
        // Si une date est fournie, vérifier le format 'YYYY-MM-DD'
        if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return helpers.message('birth_date must be in YYYY-MM-DD format');
        }
        // Vérifier l'âge si la date est valide
        const date = new Date(value);
        if (date > eighteenYearsAgo) {
            return helpers.message('User must be at least 18 years old');
        }
        return value;
    }),
    cityId: Joi.number().allow(null),
    address: Joi.string().min(3).allow(null),
    profil_picture: Joi.any().optional()
});

const updatePasswordUserSchema = Joi.object({
    password: Joi.string()
        .min(12)
        .max(250)
        .pattern(/(?=.*[A-Z])/, 'at least one uppercase letter')
        .pattern(/(?=.*\d)/, 'at least one digit')
        .pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/ , 'at least one special character')
        .required(),
        confirmPassword: Joi.string()
        .valid(Joi.ref('password'))  // Ensure confirmPassword matches password
        .required()
        .messages({
            'any.only': 'Confirm password must match the password',
            'string.empty': 'Confirm password cannot be empty',
        }),
        
});

const barSchema = Joi.object({
    name: Joi.string().min(3).max(500).required(),
    address: Joi.string().min(3).max(500).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    rate: Joi.number().min(0).max(5).required(),
    opening_hours: Joi.string().min(3).max(50).allow(null),
    city_id: Joi.number().required()
});

const favoriteBarSchema = Joi.object({
    user_id: Joi.number().required(),
    bar_id: Joi.number().required()
});

const userCommentSchema = Joi.object({
    text: Joi.string().min(3).max(255).required(),
    rate: Joi.number().min(0).max(5).required(),
    comment_image_id: Joi.number().allow(null),
    user_id: Joi.number().required(),
    bar_id: Joi.number().required()
});

const commentImageSchema = Joi.object({
    image_link: Joi.string().required(),
    image_alt: Joi.string().min(3).max(50).required(),
    user_comment_id: Joi.number().required()
});

module.exports = { updatePasswordUserSchema, updateUserSchema, createUserSchema, userCommentSchema, commentImageSchema, favoriteBarSchema, barSchema };

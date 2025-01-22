function validate(schema, source) {
    return (req, res, next) => {
      const { error } = schema.validate(req[source]);
      if (error) {
        return res.status(400).json({
          message: 'Validation JOI error',
          details: error.details.map((detail) => detail.message),
        });
      }
      next();
    };
  }
  
module.exports = validate;
export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            console.log("Request body:", JSON.stringify(req.body, null, 2));
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

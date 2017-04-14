const expressJwt = require("express-jwt");

const ejwt = expressJwt({ secret: process.env.JWT_SECRET });

module.exports.authenticate = (req, res, next) => {
    ejwt(req, res, (err) => {
        if (err && err.code && err.code == "invalid_token")
            return util.invalidToken(res);
        if (err && err.code && err.code == "credentials_required")
            return util.noSession(res);
        if (err)
            return util.console.error(res, "Unknown server error when logging in");
        next();
    });
};

module.exports.errorWrapper = f => async (req, res, next) => {
    try {
        await f(req, res, next);
    } catch (e) {
        next(e);
    }
};

module.exports.errorHandler = (err, req, res, next) => {
    if(err)
        return res.status(500).send({ error: { message: err.message || "Unknown error." } });
    return next();
};

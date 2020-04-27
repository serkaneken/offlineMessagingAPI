const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const decodedToken = jwt.verify(token, "ugurcanArmutSerkanDivlop");
        req.token = decodedToken
    } catch (error) {
        return res.status(401).send({
            message: "Auth failed",
            error: error
        });
    }
    next();
}
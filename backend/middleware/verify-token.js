const jwt = require("jsonwebtoken");
module.exports = async  (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const {access_token} = req.body.data ? req.body.data : {access_token: null};
    if (bearerHeader || access_token) {
        const token = access_token ? access_token : bearerHeader.split(" ")[1];
        if (!token || token === "null") {
            res.json({err: "Authentication failed!", status: 402})
        } else {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                if (decoded) {
                    req.user = decoded.tokenUser;
                    next();
                } else {
                    res.json({err: "Authentication failed!", status: 402})
                }
            } catch(err) {
                // err
                res.json({err: "Invalid Token", status: 402});
            }
        }
    } else {
        // response error with status 400;
        res.json({err: "You need to be logged in to make this request. No token found.", status: 403})
    }
};
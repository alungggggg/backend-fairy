import jwt from "jsonwebtoken";

const accessValidation = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: "unauthorized" })
    }
    const token = authorization.split(" ")[1]
    const secret = process.env.JWT_SECRET

    try {
        const jwtDecode = jwt.verify(token, secret)
        req.userData = jwtDecode
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" })
    }
    next()
}
export default accessValidation;
// console.log(accessValidation())   
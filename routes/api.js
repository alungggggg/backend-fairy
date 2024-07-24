import express from "express"
import { deleteUser, updateUser, createUser, getUser, getUserByID } from "../controller/UserController.js"
import { register, login } from "../controller/AuthController.js"
import { getDongeng, getDongengById, createDongeng, updateDongeng, deleteDongeng } from "../controller/DongengController.js"
import accessValidation from "../middleware/authorization.js"



const router = express.Router();

router.get("/api/users/:id", accessValidation, getUserByID);
router.get("/api/users", accessValidation, getUser);
router.post("/api/users", accessValidation, createUser);
router.patch("/api/users/:id", accessValidation, updateUser);
router.delete("/api/users/:id", accessValidation, deleteUser);

router.post("/api/dongeng", accessValidation, createDongeng);
router.delete("/api/dongeng/:id", accessValidation, deleteDongeng);
router.get("/api/dongeng", getDongeng);
router.patch("/api/dongeng/:id", accessValidation, updateDongeng);
router.get("/api/dongeng/:id", getDongengById);

router.post("/api/login", login)
router.post("/api/register", register)


export default router;
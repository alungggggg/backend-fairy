import express from "express"
import { deleteUser, updateUser, createUser, getUser, getUserByID, profile } from "../controller/UserController.js"
import { register, login, isAvailableEmail, checkEmail, forgotPassword, forgotPasswordForm, logout, testAuthToken, authenticationToken, refreshNewToken } from "../controller/AuthController.js"
import { getDongeng, getDongengById, createDongeng, updateDongeng, deleteDongeng, sumView } from "../controller/DongengController.js"
import accessValidation from "../middleware/authorization.js"
import { createSoalPilgan, createSoalUraianPanjang, createSoalUraianSingkat, deleteSoalPilgan, deleteSoalUraianPanjang, deleteSoalUraianSingkat, getSoalPilgan, getSoalUraianPanjang, getSoalUraianSingkat, updateSoalPilgan, updateSoalUraianPanjang, updateSoalUraianSingkat } from "../controller/soalController.js"



const router = express.Router();

router.get("/api/profile/:token", profile)
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
router.get("/api/dongengview/:id", sumView)

router.post("/api/login", login)
router.post("/api/logout", logout)
router.post("/api/register", register)
router.get("/api/auth/alreadyexist/email", isAvailableEmail)
router.get("/api/auth/email", checkEmail);
router.post("/api/forgot-password", forgotPassword)
router.post("/api/forgot-password/:id", forgotPasswordForm)
router.post("/api/refresh-token", refreshNewToken)

router.post("/api/set-soal-pilgan" , createSoalPilgan)
router.get("/api/get-soal-pilgan", getSoalPilgan)
router.delete("/api/delete-soal-pilgan/:id", deleteSoalPilgan)
router.patch("/api/update-soal-pilgan/:id", updateSoalPilgan)

router.get("api/get-soal-uraian-singkat" , getSoalUraianSingkat)
router.post("/api/set-soal-uraian-singkat" , createSoalUraianSingkat)
router.delete("/api/delete-soal-uraian-singkat/:id" , deleteSoalUraianSingkat)
router.patch("/api/update-soal-uraian-singkat/:id" , updateSoalUraianSingkat)

router.get("api/get-soal-uraian-panjang" , getSoalUraianPanjang)
router.post("/api/set-soal-uraian-panjang" , createSoalUraianPanjang)
router.delete("/api/delete-soal-uraian-panjang/:id" , deleteSoalUraianPanjang)
router.patch("/api/update-soal-uraian-panjang/:id" , updateSoalUraianPanjang)

router.get("/api/test", authenticationToken, testAuthToken);

export default router;
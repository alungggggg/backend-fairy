import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import { env } from "process";
import histories from "../Models/historyModel.js";

export const getHistory = async (req, res) => {
  const targetUserId = parseInt(req.params.id)
  const history = await User.findAll({
    include: [
      {
        model: histories,
        as: "histories",
        required: false,
      },
    ],
  });
  let results = []

  history.forEach(element => {
    let userHistory = {};
    userHistory.id_user = element.histories[0]?.id_user || null;  // Ambil id_user dari riwayat pertama
    userHistory.id_dongeng = [];  // Siapkan array untuk id_dongeng
  
    element.histories.forEach(history => {
      userHistory.id_dongeng.push(history.id_dongeng);  // Tambahkan id_dongeng ke array
    });
  
    results.push(userHistory);
  });

  const allDongeng = new Set();

  results.forEach(user => {
    user.id_dongeng.forEach(dongeng => allDongeng.add(dongeng));
  });

  const dongengList = Array.from(allDongeng);
  console.log("All Dongeng IDs:", dongengList);

  function createUserVector(user, dongengList) {
    return dongengList.map(dongeng => user.id_dongeng.includes(dongeng) ? 1 : 0);
  }
  
  // Buat vektor untuk setiap pengguna
  const userVectors = results.map(user => ({
    id_user: user.id_user,
    vector: createUserVector(user, dongengList)
  }));
  
  console.log("User Vectors:", userVectors);

  function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  
    if (magnitudeA === 0 || magnitudeB === 0) return 0;  // Jika magnitudo 0, Cosine Similarity = 0
    return dotProduct / (magnitudeA * magnitudeB);
  }

  const targetUserVector = userVectors.find(user => user.id_user !== null && user.id_user === targetUserId);

  // console.log(targetUserId)
// Bandingkan dengan semua user lain
  const similarities = [];
  userVectors.forEach(user => {
    if (user.id_user !== targetUserId) {  // Jangan bandingkan dengan diri sendiri
      const similarity = cosineSimilarity(targetUserVector.vector, user.vector);
      
      // Tambahkan hasil perhitungan ke array similarities sebagai objek
      similarities.push({
        idUser: user.id_user,   // Properti id_user dari user
        similarity: similarity  // Hasil perhitungan cosine similarity
      });
    }
  });

  const validSimilarities = similarities.filter(user => user.idUser !== null);
  validSimilarities.sort((a, b) => b.similarity - a.similarity);


  const userIds = similarities.map(user => user.idUser);
  // userIds.forEach(element => {
  //   results.
  // })

  

  return res.status(200).json({ userIds });

};



export const updateHistory = async (req, res) => {
  const { id } = req.body;
  const { id_dongeng } = req.body;

  const userHistory = await User.findOne({
    where: { id },
    include: [
      {
        model: histories,
        as: "histories",
        required: false,
      },
    ],
  });

  let isHistories = false;
  userHistory?.histories.forEach((element) => {
    if (element.id_dongeng == id_dongeng) {
      isHistories = true;
    }
  });

  if (isHistories) {
    return res.status(200).json({ message: "berkas sudah ada di history" });
  } else {
    await histories.create({
      id_user: id,
      id_dongeng,
    });
    return res.status(200).json({ message: "berhasil update history" });
  }

};

export const getUser = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const profile = async (req, res) => {
  // req.params
  const { token } = req.params;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    where: {
      id,
    },
  });
  return res.status(200).json(user);
};

export const getUserByID = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const uniqueEmail = await User.findOne({ where: { email: req.body.email } });

  if (uniqueEmail) {
    return res.status(400).json({ email: "Email sudah di gunakan!" });
  }
  try {
    const hashPassword = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
    req.body.password = hashPassword;
    req.body.refreshToken = jwt.sign(req.body.nama, env.JWT_REFRESH_SECRET);
    await User.create(req.body);
    return res.status(200).json({ message: "User berhasil dibuat!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      // const { nama, email, password } = req.body
      const password = req.body.password;
      const hashPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

      req.body.password = hashPassword;

      const result = await User.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json({ message: "User Berhasil di update" });
    } else {
      const result = await User.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json({ message: "User Berhasil di update" });
    }
  } catch (e) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Berhasil di Hapus!" });
  } catch (error) {
    console.log(error);
  }
};

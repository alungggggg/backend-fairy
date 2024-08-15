import SoalPilgan from "../Models/soalPilihanGandaModel.js";
import { v4 as uuidv4 } from "uuid";

export const getSoalPilgan = async (req, res) => {
  try {
    const response = await SoalPilgan.findAll();
    res.status(200).json(response);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const createSoalPilgan = async (req, res) => {
  console.log(req.body);
  try {
    const { soal, idDongeng, opsi_1, opsi_2, opsi_3, opsi_4, jawaban } =
      req.body;
    await SoalPilgan.create({
      id: uuidv4(),
      soal,
      idDongeng,
      opsi_1,
      opsi_2,
      opsi_3,
      opsi_4,
      jawaban,
    });
    res.status(201).json({ message: "Soal Pilihan Ganda Created" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const deleteSoalPilgan = async (req, res) => {
  try {
    await SoalPilgan.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Soal Pilihan Ganda Deleted" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

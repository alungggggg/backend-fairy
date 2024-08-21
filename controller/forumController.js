import ForumQuiz from "../Models/forumQuizModel.js";
import RekapNilaiModel from "../Models/rekapNilai.js";
import User from "../Models/UserModel.js";

export const getRekapByForumId = async (req, res) => {
  try {
    const result = await RekapNilaiModel.findAll({
      where: {
        id_Forum: req.params.id,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

async function test() {
  try {
    const result = await RekapNilaiModel.findAll({});
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

test();

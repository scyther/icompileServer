const express = require("express");
const cors = require("cors");
const { generateFile } = require("./generateFile");
const { executeC } = require("./executeC");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ hello: "World!!" });
});

app.post("/run", async (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  if (language === "python") {
    language = "py";
  }
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty Code!" });
  }
  try {
    const filepath = await generateFile(language, code);
    let output;
    if (language === "c") {
      output = await executeC(filepath);
    } else if (language === "py") {
      output = await executePy(filepath);
    } else if (language === "cpp") {
      output = await executeCpp(filepath);
    }
    return res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

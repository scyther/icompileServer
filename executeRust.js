const {exec} = require("child_process")
const fs = require('fs')
const path = require("path")

const outputPath = path.join(__dirname,"output_folder")

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath,{recursive: true})
}
const executeRust = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0]
    const outPath = path.join(outputPath,`${jobId}`.out)
}
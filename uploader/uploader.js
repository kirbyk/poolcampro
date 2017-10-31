const s3 = require('s3')
const shell = require("shelljs")


const S3_BUCKET = "poolcampro"

exports.upload = (gamePath) => {
  const client = s3.createClient({
    s3Options: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: "us-east-1",
    },
  })
  
  const params = {
    localFile: gamePath,
    s3Params: {
      Bucket: "poolcampro",
      Key: gamePath,
    },
  }

  const uploader = client.uploadFile(params)

  uploader.on('error', err => {
    console.error("unable to sync:", err.stack)
  })

  uploader.on('progress', () => {
    console.log("progress", uploader.progressAmount, uploader.progressTotal)
  })

  uploader.on('end', () => {
    console.log("done uploading")
    shell.rm(gamePath)
  })
}

const s3 = require('s3')


const S3_BUCKET = "poolcampro"

exports.uploadDir = (gamePath) => {
  var client = s3.createClient({
    s3Options: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: "us-east-1",
    },
  });

  var params = {
    localDir: gamePath,
    s3Params: {
      Bucket: "poolcampro",
      Prefix: gamePath,
    },
  };

  var uploader = client.uploadDir(params);

  uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
}

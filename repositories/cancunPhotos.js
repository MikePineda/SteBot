//File: controllers/cancunPhotos.js

//Return all photos in the DB
exports.findAllCancunPhotos = function(con, callback) {
    console.log('findAllCancunPhotos');
    var sql = "SELECT * FROM cancun_photos";
    var respuesta = {};
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      //console.log(result[0].photo_url);
      callback(result);
    });
};

exports.getRandomCancunPhoto = function(con, callback) {
  console.log('getRandomCancunPhoto');
  var sql = "SELECT * FROM cancun_photos ORDER BY RAND() LIMIT 1";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    callback(result);
  });
};

//Insert a new photo in the DB
exports.addCancunPhoto = function(con, photoUrl, usuario) {
  console.log('addCancunPhoto');
  //validando campos
  if(photoUrl == null || usuario == null){
    return "error";
  }
  /* Completa el codigo*/
  var values = [
      [photoUrl, usuario, new Date()]
    ];

  var sql = "INSERT INTO cancun_photos (photo_url, author, creation_date) VALUES ?";
  con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
};
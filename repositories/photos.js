//File: controllers/photos.js

//Return all photos in the DB
exports.findAllPhotos = function(con, callback) {
    var sql = "SELECT * FROM photo";
    var respuesta = {};
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      //console.log(result[0].photo_url);
      callback(result);
    });
};

exports.findPhotosByCategory = function(con, categoria, callback) {
    var sql = "SELECT * FROM photo WHERE category = ?";
    var respuesta = {};
    con.query(sql,[categoria], function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      //console.log(result[0].photo_url);
      callback(result);
    });
};

exports.getRandomPhotoByCategory = function(con,categoria, callback) {
    var sql = "SELECT * FROM photo WHERE category = ? ORDER BY RAND() LIMIT 1";
    con.query(sql, [categoria],function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      callback(result);
    });
  };

exports.getRandomPhoto = function(con, callback) {
  var sql = "SELECT * FROM photo ORDER BY RAND() LIMIT 1";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    callback(result);
  });
};

//Insert a new photo in the DB
exports.addPhoto = function(con, photoUrl, usuario, categoria) {
  console.log('addPhoto');
  //validando campos
  if(photoUrl == null || usuario == null || categoria == null){
    return "error";
  }
  var values = [
      [photoUrl, usuario,categoria, new Date()]
    ];

  var sql = "INSERT INTO photo (photo_url, author, category, creation_date) VALUES ?";
  con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
};
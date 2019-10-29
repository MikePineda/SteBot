var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var moment = require('moment');
var mysql = require('mysql');



// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

//Initialize mySQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ste_bot"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Mysql conectado");
});



bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

//repository
var CancunPhotosRepository = require('./repositories/cancunPhotos');
var PhotosRepository = require('./repositories/photos');

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) === '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            case 'luigi':
                bot.sendMessage({
                    to: channelID,
                    message: 'https://tenor.com/view/luigi-meme-gif-8855747'
                });
            break;
            case 'cancun':
                if ( user === 'Ricardo') {
                    bot.sendMessage({
                        to: channelID,
                        message: 'tu no vas a Cancún tío'
                    });
                    return;
                }
                var todayDate = new Date();
                var cancunDate = moment("2019-10-23 06:00:00");
                var diffTodayToCancun = Math.abs(todayDate - cancunDate);
                // Time calculations for days, hours, minutes and seconds
                var cancunDays = Math.floor(diffTodayToCancun / (1000 * 60 * 60 * 24));
                var cancunHours = Math.floor((diffTodayToCancun % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var cancunMinutes = Math.floor((diffTodayToCancun % (1000 * 60 * 60)) / (1000 * 60));
                var cancunSeconds = Math.floor((diffTodayToCancun % (1000 * 60)) / 1000);        
                CancunPhotosRepository.getRandomCancunPhoto(con, function(result){
                    var photo = result[0].photo_url;
                    console.log(photo); // this is where you get the return value
                    bot.sendMessage({
                        to: channelID,
                        message: 'Tío faltan ' + cancunDays + ' días con ' + cancunHours + ' horas con ' + cancunMinutes + ' minutos con ' + cancunSeconds + ' segundos para Cancún. \n' + photo
                    });
                });
            break;

            case 'fotoCancun':
                CancunPhotosRepository.getRandomCancunPhoto(con, function(result){
                    var photo = result[0].photo_url;
                    console.log(photo); // this is where you get the return value
                    bot.sendMessage({
                        to: channelID,
                        message: photo
                    });
                });
                break;

            case 'fotoRingo':
                var ringoPhoto = "https://cdn.discordapp.com/attachments/468173781467398194/630755867272151040/unknown.png";
                bot.sendMessage({
                    to: channelID,
                    message: ringoPhoto
                });
                break;

            case 'addPhoto':
                console.log(args);
                CancunPhotosRepository.addCancunPhoto(con , args[0], user);
                bot.sendMessage({
                    to: channelID,
                    message: 'Se agregó la imagen correctamente Tío'
                });

            case 'addSinWetzo':
                console.log(args);
                PhotosRepository.addPhoto(con , args[0], user, "boneless");
                bot.sendMessage({
                    to: channelID,
                    message: 'Se agregó la imagen correctamente Tío'
                });

            break;

            case 'sinwetzo':
            case 'boneless':
            case 'sinfkinwetzo':
                PhotosRepository.getRandomPhotoByCategory(con,"boneless", function(result){
                    var photo = result[0].photo_url;
                    console.log(photo); // this is where you get the return value
                    bot.sendMessage({
                        to: channelID,
                        message: photo
                    });
                });
                break;
            // Just add any case commands if you want to..
         }
     }

     if(message.includes("stebot")){
         bot.sendMessage({
             to: channelID,
             message: 'Soy el futuro viejo'
         });
     }
});


//CancunPhotosRepository.addCancunPhoto(con,"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRG-rEojFTDZhi_I8IeE49UdGmgqgEzjj-WrIWgtv4OX4VRECwG", "reddie");
/*CancunPhotosRepository.findAllCancunPhotos(con, function(result){
    console.log(result[0]);
    //console.log(result); // this is where you get the return value
});
*/
var express = require('express');
var router = express.Router();
var Passwords = require('./ZZpasswords');
var UserNames = require('./ZZuserNames');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();
const crypto = require('crypto');
var rand = require('csprng');


function hash(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('binary');
};

function encrypt(plainText) {
    var cipher = crypto.createCipher('aes256', 'SE3350b Winter 2016');
    var crypted = cipher.update(plainText, 'ascii', 'binary');
    crypted += cipher.final('binary');
    return crypted;
};

function decrypt(cipherText) {
    var decipher = crypto.createDecipher('aes256', 'SE3350b Winter 2016');
    var dec = decipher.update(cipherText, 'binary', 'ascii');
    dec += decipher.final('ascii');
    return dec;
};


router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var Salt = rand(256, 36);
        var EncryptedPassword = hash(request.body.password.encryptedPassword + Salt);
        var newUserShadow = new Passwords.Model({
            salt : Salt,
            encryptedPassword : EncryptedPassword,
            userName: request.body.password.userName,
            passwordMustChanged: request.body.password.passwordMustChanged,
            userAccountExpiryDate: request.body.password.userAccountExpiryDate,
            user: request.body.password.user

        });
        var newUserName = new UserNames.Model({
            userName: request.body.password.userName,
        });

        newUserShadow.save(function (error) {
            if (error) {
                response.send({error: error});
            }
            else {
                newUserName.save(function (error){
                    response.json({password: newUserShadow});
                });
                
            }
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Password = request.query;
        console.log(Password);
        if (!Password.user && !Password.userName) {
            Passwords.Model.find(function (error, UserShadow) {
                if (error) response.send(error);
                response.json({password: UserShadow});
            });
        } else {
            if (Password.user) {
                Passwords.Model.findOne({"user": Password.user}, function (error, UserShadow) {
                    if (error) response.send(error);
                    var newUserShadow = new Passwords.Model({
                        
                        userName: UserShadow.userName,
                        

                    });
                    response.json({password: newUserShadow});
                });
            } else {
                if (Password.userName){
                    Passwords.Model.findOne({"userName": Password.userName}, function (error, UserShadow) {
                        if (error) response.send(error);
                        var newUserShadow = new Passwords.Model({
                        
                            user: UserShadow.user,
                            

                        });
                        response.json({password: newUserShadow});
                    });
                }
            }

        }
    });


router.route('/:password_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        Passwords.Model.findById(request.params.password_id, function (error, UserShadow) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({password: UserShadow});
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        Passwords.Model.findById(request.params.password_id, function (error, UserShadow) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.password.passwordMustChanged) {
                    var Salt = rand(256, 36);
                    console.log("password " + request.body.password.encryptedPassword);
                    console.log("salt " + Salt);
                    console.log("password + salt " + request.body.password.encryptedPassword + Salt);
                    console.log("hasedpassword " + hash(request.body.password.encryptedPassword + Salt));
                    UserShadow.encryptedPassword = hash(request.body.password.encryptedPassword + Salt);
                    UserShadow.salt = Salt;
                    UserShadow.passwordMustChanged = false;
                }
                var name = UserShadow.userName;
                UserNames.Model.findOne({"userName": name}, function (error, usernames) {
                    usernames.userName = request.body.password.userName;
                    usernames.save();
                });
                UserShadow.passwordReset = request.body.password.passwordReset;
                UserShadow.userName = request.body.password.userName;
                UserShadow.userAccountExpiryDate = request.body.password.userAccountExpiryDate;
                UserShadow.user = request.body.password.user;
                
                UserShadow.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({password: UserShadow});
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        Passwords.Model.findByIdAndRemove(request.params.password_id, function (error, deleted) {
                if (!error) {
                    
                    UserNames.Model.findOne({"userName": deleted.userName}, function (error, usernames) {
                        
                        UserNames.Model.findByIdAndRemove(usernames._id, function (error2, deleted2) {
                            
                        });
                        
                    });
                    response.json({password: deleted});
                };
            });
    });

module.exports = router;

const {check, validationResult} = require('express-validator')
var hash = require('../utils/hash')
var https = require('https')
var rp = require("request-promise-native")


module.exports = function(app){
    app.post('/api/accountDetails', [
        check('key')
            .not()
            .isEmpty()
        ], async(req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            else{
                var key = req.body.key
                const _GET = path => {
                    return rp({
                        method: "GET",
                        uri: `https://api.digitalocean.com/v2${path}`,
                        headers: {
                            Authorization: `Bearer ${key}`,
                            "Content-Type": "application/json"
                        },
                        json: true
                    });
                };
                
                const getAccount = () => _GET("/account");
                
                // Let's get our account
                (async () => {
                  try {
                    const account = await getAccount();
                    console.log(account);
                    res.json({message : account})
                  } catch (ex) {
                    console.error(ex);
                  }
                })();
                
            }
    })
}




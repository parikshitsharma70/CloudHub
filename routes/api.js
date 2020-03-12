const {check, validationResult} = require('express-validator')
var hash = require('../utils/hash')
var https = require('https')
var rp = require("request-promise-native")
var get = require('../utils/get')


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

                const getAccount = () => get.getReqDO("/account", key);
                
                (async () => {
                  try {
                    const account = await getAccount();
                    console.log(account);
                    res.json({message : account})
                  } catch (ex) {
                    res.status(401).json({message: ex})
                    console.error(ex);
                  }
                })();
                
            }
    })

    app.post('/api/accountActions', [
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

                const getActions = () => get.getReqDO("/actions", key);
                
                (async () => {
                  try {
                    const actions = await getActions();
                    console.log(actions);
                    res.json({message : actions})
                  } catch (ex) {
                    res.status(401).json({message: ex})
                    console.error(ex);
                  }
                })();
                
            }
    })
}




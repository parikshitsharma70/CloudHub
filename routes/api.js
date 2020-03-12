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

    app.post('/api/accountActionByID', [
        check('key')
            .not()
            .isEmpty(),
        check('actionID')
            .not()
            .isEmpty()
        ], async(req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            else{
                var key = req.body.key
                var actionID = req.body.actionID
                const getActionByID = () => get.getReqDO("/actions/"+actionID, key);
                
                (async () => {
                  try {
                    const action = await getActionByID();
                    console.log(action);
                    res.json({message : action})
                  } catch (ex) {
                    res.status(401).json({message: ex})
                    console.error(ex);
                  }
                })();
                
            }
    })

    app.post('/api/accountBalance', [
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
                const getBalance = () => get.getReqDO("/customers/my/balance", key);
                
                (async () => {
                  try {
                    const balance = await getBalance();
                    console.log(balance);
                    res.json({message : balance})
                  } catch (ex) {
                    res.status(401).json({message: ex})
                    console.error(ex);
                  }
                })();
                
            }
    })

    app.post('/api/accountBillingHistory', [
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
                const getBillingHistory = () => get.getReqDO("/customers/my/billing_history", key);
                
                (async () => {
                  try {
                    const billing_history = await getBillingHistory();
                    console.log(billing_history);
                    res.json({message : billing_history})
                  } catch (ex) {
                    res.status(401).json({message: ex})
                    console.error(ex);
                  }
                })();
                
            }
    })

    app.post('/api/accountBlockStorage', [
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
                const getBlockStorage = () => get.getReqDO("/volumes", key);
                
                (async () => {
                  try {
                    const block_storage = await getBlockStorage();
                    console.log(block_storage);
                    res.json({message : block_storage})
                  } catch (ex) {
                    res.status(401).json({message: ex})
                    console.error(ex);
                  }
                })();
                
            }
    })

    app.post('/api/accountBlockStorageByName', [
        check('key')
            .not()
            .isEmpty(),
        check('volName')
            .not()
            .isEmpty()
        ], async(req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            else{
                var key = req.body.key
                var volName = req.body.volName
                const getBlockStorageByName = () => get.getReqDO("/volumes?name="+volName, key);
                
                (async () => {
                  try {
                    const block_storage = await getBlockStorageByName();
                    console.log(block_storage);
                    res.json({message : block_storage})
                  } catch (ex) {
                    res.status(401).json({message: ex})
                    console.error(ex);
                  }
                })();
                
            }
    })


}




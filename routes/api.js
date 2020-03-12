const {check, validationResult} = require('express-validator')
var hash = require('../utils/hash')
var http = require('http')

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
                let url = `https://api.digitalocean.com/v2/account`
                var options = {
                    uri : url,
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : `Bearer ${key}`
                    },
                    json: true
                  };

                var getReq = http.request(options,function(response){
                    response.on('data',function(data){
                        console.log(data.toString('utf-8'));
                        res.json({'message' : data.toString('utf-8')})
                    });
                });
          
                getReq.end();
                
            }
    })
}




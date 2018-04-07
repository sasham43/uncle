var router = require('express').Router();
var fs = require('fs');

router.get('/', function(req, res, next){
    fs.readdir('root/public/videos', function(err, resp){
        if(err)
            return next(err);

        res.send(resp);
    });
});

module.exports = router;

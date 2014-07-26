exports.validateReq = function(req, fields){
    var errs = [];
    if (req.query.force != '1') {
        for (var i= 0, field; field=fields[i]; i++){
            if (!req.body[field]) errs.push('missing ' + field + '');
        }
    }
    return errs.length>0 ? errs : false;
}

exports.assignBodyParams = function(obj, body){
    for (var i in body) {
        var field = body[i];
        if (typeof(field) == 'object' && body[i] && body[i]._id)
            obj[i] = field._id;
        else
            if (typeof field == 'undefined' || field=="")
            obj[i] = null;
        else
            obj[i] = field;
    }
    return obj;
}
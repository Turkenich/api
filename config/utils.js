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
    for (var i=0 ,field; field=body[i]; i++) {
        if (typeof(field) == 'object' && body[i]._id)
            obj[i] = field._id;
        else
            obj[i] = field || null;
    }
    return obj;
}
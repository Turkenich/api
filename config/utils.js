exports.validateReq = function (req, fields) {
    var errs = [];
    if (req.query.force != '1') {
        for (var i = 0, field; field = fields[i]; i++) {
            if (!req.body[field]) errs.push('missing ' + field + '');
        }
    }
    return errs.length > 0 ? errs : false;
}

var assignBodyParams = function (obj, body) {
    for (var i in body) {
        var field = body[i];
        if (typeof(field) == 'object' && field && field._id) {
            obj[i] = field._id;
        } else if (typeof field == 'undefined' || field === "" || field === false) {
            obj[i] = null;
        } else {
            obj[i] = field;
        }
    }
    return obj;
}

exports.assignBodyParams = function (obj, body) {
    assignBodyParams(obj, body);
}

function auth(req){
    return (req.headers.authorization == "b30ab1857d2e3b95fd0359abbcebb2b0");
}
//default methods

exports.defaultMethods = [
    'list', 'get', 'create', 'update', 'delete'
];

exports.authenticate = function (req, res) {
    if (!auth(req)) res.send(401);
    res.send('ok');
};

exports.list = function (Model, req, res) {
    if (!auth(req)) res.send(401);
    Model.find({})
        .exec(function (err, Models) {
            res.send(Models);
        });
};

exports.create = function (Model, req, res) {

    if (!auth(req)) res.send(401);
    var model = new Model({});
    model.save(function (err, model) {
        if (err) {
            console.error(err.name);
            res.send(err)
        }
        else {
            res.send(model);
        }
    });
};

exports.get = function (Model, req, res) {
    if (!auth(req)) res.send(401);
    Model.findById(req.params.id)
        .exec(function (err, model) {
            res.send(err || model);
        });
};

exports.update = function (Model, req, res) {
    if (!auth(req)) res.send(401);
    Model.findById(req.params.id, function (err, model) {
        model = assignBodyParams(model, req.body);
        return model.save(function (err, model) {
            res.send(err || model);
            console.log(err || model);
        });
    });
};

exports.delete = function (Model, req, res) {
    if (!auth(req)) res.send(401);
    return Model.findById(req.params.id, function (err, Model) {
        return Model.remove(function (err) {
            if (!err) {
                var message = Model.name + ' [' + req.params.id + '] has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
}
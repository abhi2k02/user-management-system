var Userdb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: 'Content cannot be empty!'
            });
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while creating a create operation'
            });
        });
}

//retrive and return all users or a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `cannot find user with ${id}. User not found` })
                }
                else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occured while finding the user info'
                });
            });
    }
    else {
        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occured while finding the user info'
                });
            });
    }
}

// //update a new identified user by userid
exports.update = (req, res) => {
    //validate request
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: 'Data to update cannot be empty!'
            });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot update user with ${id}. User not found` })
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while updating user info'
            });
        });
}

// //delete a user with specified usedid
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot delete user with ${id}. User not found` })
            }
            else {
                res.send('User was deleted succesfully');
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while deleting user info'
            });
        });
}
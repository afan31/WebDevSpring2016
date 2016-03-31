module.exports = function(app, formModel) {

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/user/:userId/form/:formId", updateFormById);



    function findFormById(req,res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllFormsForUser(req,res) {
        var userId = req.params.userId;
        console.log("In User id " + userId);
        formModel.findAllFormsForUser(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createFormForUser(userId, form)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    res.json(form);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                });
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var userId = req.params.userId;
        var newForm = req.body;
        console.log(newForm.title);
        console.log("USER IDDDDDDDD ",userId);
        formModel.findAllFormsForUser(userId)
            .then(
                function(doc) {
                    console.log(doc);
                    for (var i = 0; i < doc.length; i++){
                        console.log(doc[i]);
                        if (doc[i].title === newForm.title){
                            console.log("IM HEREEEEEEEEEE");
                            return null;
                        }
                    }
                    formModel.updateFormById(formId,newForm)
                        .then(
                            function(doc) {
                                console.log("HELLLLLO", doc);
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );

                },
                function(err) {
                    res.status(400).send(err);
                });
    }

}

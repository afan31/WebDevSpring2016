module.exports = function(app, formModel) {

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);



    function findFormById(req,res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(userId);
        res.json(form);
    }

    function findAllFormsForUser(req,res) {
        var userId = req.params.userId;
        console.log("In User id " + userId);
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        console.log("Here in form service for create form" , form);
        console.log("user id " , +userId);
        var forms = formModel.createFormForUser(userId,form);
        res.json(forms);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var updatedForm = formModel.updateFormById(formId,newForm);
        res.json(updatedForm);
    }



}

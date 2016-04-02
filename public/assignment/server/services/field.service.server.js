module.exports = function(app, fieldModel) {

    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormId);
    app.put("/api/assignment/reorder/form/:formId/fields" , updateOrderOfFields);



    function findFieldByFormId(req,res) {
        //console.log("HEREEEE");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldByFormId(formId,fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllFieldsForForm(req,res) {
        var formId = req.params.formId;
        //console.log("In Form id " + formId);
        fieldModel.findAllFieldsForForm(formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        console.log("In formID service  ****************************", formId);
        console.log("In FieldID service", fieldId);
        fieldModel.deleteFieldByFormId(formId,fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        console.log(formId);
        var field = req.body;
        console.log("Here in form service for create form" , field);
        console.log("FORM IDDDDDDD" , formId);

        fieldModel.createFieldForForm(formId,field)
            .then(
                function(doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFormId(req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var newField = req.body;

        fieldModel.updateFieldByFormId(fieldId,formId,newField)
        //console.log("UPDATED FIELD ", fieldModel.updateFieldByFormId(fieldId,formId,newField));
       // fieldModel.findAllFieldsForForm(formId)
            .then(
                function(doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function  updateOrderOfFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        //console.log("updateOrderOfFields" + formId);
        //console.log("updateOrderOfFields FORM BODY" , fields);
        fieldModel.updateOrderOfFields(formId, fields)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}
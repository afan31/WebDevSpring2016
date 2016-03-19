module.exports = function(app, fieldModel) {

    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormId);
    app.put("/api/assignment/reorder/form/:formId/fields" , updateOrderOfFields);



    function findFieldByFormId(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldModel.findFieldByFormId(formId,fieldId);
        res.json(field);
    }

    function findAllFieldsForForm(req,res) {
        var formId = req.params.formId;
        console.log("In Form id " + formId);
        var fields = fieldModel.findAllFieldsForForm(formId);
        res.json(fields);
    }

    function deleteFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = fieldModel.deleteFieldByFormId(formId,fieldId);
        res.json(fields);
    }


    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        console.log("Here in form service for create form" , field);
        console.log("form id " , +formId);
        var fields = fieldModel.createFieldForForm(formId,field);
        res.json(fields);
    }

    function updateFieldByFormId(req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var newField = req.body;
        var updatedField = fieldModel.updateFieldByFormId(fieldId,formId,newField);
        res.json(updatedField);
    }

    function  updateOrderOfFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        console.log("updateOrderOfFields" + formId);
        console.log("updateOrderOfFields FORM BODY" , fields);
        var updatedFields = fieldModel.updateOrderOfFields(formId, fields);
        res.json(updatedFields);
    }

}
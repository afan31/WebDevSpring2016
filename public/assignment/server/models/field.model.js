var mock = require("./form.mock.json");
module.exports= function() {
    var api = {
        findFieldByFormId: findFieldByFormId,
        findAllFieldsForForm: findAllFieldsForForm,
        deleteFieldByFormId : deleteFieldByFormId,
        createFieldForForm : createFieldForForm,
        updateFieldByFormId : updateFieldByFormId,
        updateOrderOfFields : updateOrderOfFields
    };
    return api;

    function findFieldByFormId(formId, fieldId) {
        for (var u in mock) {
            if (mock[u]._id === formId) {
                for (var j in mock[u].fields){
                    if (mock[u].fields[j]._id === fieldId){
                        return mock[u].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function findAllFieldsForForm(formId) {
        console.log("findAllFieldsForForm in fields model" + formId);
        //var fieldsArr = [];
        var i = "";
        for (i in mock) {
            if (mock[i]._id == formId) {
                return mock[i].fields;
            }
        }
        //console.log("FIELDS ARRAY ", fieldsArr);
        return null;
    }

    function deleteFieldByFormId(formId, fieldId){
        for (var u in mock) {
            if (mock[u]._id === formId) {
                for (var j in mock[u].fields){
                    if (mock[u].fields[j]._id === fieldId){
                        mock[u].fields.splice(j,1);
                        return mock[u].fields;
                    }
                }
            }
        }
        return null;
    }

    function createFieldForForm(formId, field) {
        var id = (new Date).getTime();
        var createdField = {
            "_id": id,
            "label": field["label"],
            "type": field["type"],
            "placeholder": field["placeholder"],
            "options": field["options"]
        };
        console.log("CREATED FIELDDDDD " , createdField);
        for (var u in mock) {
            if (mock[u]._id === formId) {
                mock[u].fields.push(createdField);
                return mock[u].fields;
            }
        }
        return null;
    }

    function updateFieldByFormId(fieldId, formId, newField){
        var i = "";
        for (i in mock) {
            if (mock[i]._id == formId) {
                for (var j in mock[u].fields){
                    if (mock[u].fields[j]._id === fieldId){
                        var updatedField = {
                            "_id": newField["_id"],
                            "label": newField["label"],
                            "type": newField["type"],
                            "placeholder": newField["placeholder"]
                        };
                        mock[i].fields[j] = updatedField;
                        return mock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateOrderOfFields(formId, fields) {
        for (i in mock) {
            if (mock[i]._id == formId) {
                mock[i].fields = fields;
                return mock[i].fields;
            }
        }
        return null;
    }

}
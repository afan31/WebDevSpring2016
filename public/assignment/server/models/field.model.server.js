'use strict';

module.exports= function(formModel) {

    //load form schema
    var Form = formModel.getMongooseModel();


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
        return Form
            .findById(formId)
            .then(
                function(form){
                    return form.fields.id(fieldId);
                }
            );
    }

    function findAllFieldsForForm(formId) {
        console.log("findAllFieldsForForm in fields model" + formId);
        return Form.findById(formId).select("fields");
    }

    function deleteFieldByFormId(formId, fieldId){
        return Form
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function createFieldForForm(formId, field) {
        console.log("IN FORM MODEL ", formId);
        console.log("IN FIELD" , field);
        delete field._id;
        return Form.findById(formId)
            .then(
                function(form) {
                    console.log(form);
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function updateFieldByFormId(fieldId, formId, newField){


        return Form
            .findById(formId)
            .then(
                function(form){
                    console.log("HELLLLLLLLO");
                    console.log(newField.placeholder);
                    var field   = form.fields.id(fieldId);
                    //field._id  = newField._id;
                    field["id"] = newField._id;
                    field["label"] = newField.label;
                    field["type"] = newField.type;
                    //if(newField.placeholder != null && newField.placeholder.length != 0){
                        field["placeholder"] = newField.placeholder;
                    //}

                    //if(newField.options != null && newField.options.length != 0){
                        field["options"] = newField.options;
                    //}
                    //form.field = field;
                    console.log(form);

                    return form.save();
                }
            );
    }

    function updateOrderOfFields(formId, fields) {
        //for (i in mock) {
        //    if (mock[i]._id == formId) {
        //        mock[i].fields = fields;
        //        return mock[i].fields;
        //    }
        //}
        //return null;
        return Form
            .findById(formId)
            .then(
                function(form) {
                    //form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                    form.fields = fields;
                    // notify mongoose 'pages' field changed
                    form.markModified("fields");

                    form.save();
                }
            );
    }

}
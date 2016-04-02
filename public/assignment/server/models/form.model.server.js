//var mock = require("./form.mock.json");

// pass db and mongoose reference to model
module.exports= function(db, mongoose) {

    //load form schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create form model from schema
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        findFormById: findFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById : deleteFormById,
        createFormForUser : createFormForUser,
        updateFormById : updateFormById,
        getMongooseModel : getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return FormModel;
    }

    function findFormById(formId) {
        var form = FormModel.findById(formId);
        return form;
    }

    function findAllFormsForUser(userId) {
        return FormModel.find({ userId: userId});

    }

    function deleteFormById(index){
        var formsAfterDeletion = FormModel.remove ({ _id: index})
        return formsAfterDeletion;
    }

    function createFormForUser(userId, form) {
        //var deferred = q.defer();
        form.userId = userId;
        //{"userid":userid, "title":form.title,}
        var formCreated = FormModel.create(form);
        return formCreated;
    }

    function updateFormById(formId, newForm){
        var updatedForm = FormModel.update({_id : formId},
            {$set: newForm});
        return updatedForm;
    }

}
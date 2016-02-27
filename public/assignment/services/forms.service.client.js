"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService" , FormService);

    function FormService() {
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var id = (new Date).getTime();
            var createdForm = {
                "_id" : id,
                "userId" : userId,
                "title":form["title"]
            };
            forms.push(createdForm);
            callback(createdForm);
        }

        function findAllFormsForUser(userId, callback) {
            var formsArr = [];
            var i = "";
            for (i in forms) {
                if (forms[i].userId == userId) {
                    formsArr.push(forms[i]);
                }
            }
            callback(formsArr);
        }

        function deleteFormById(formId, callback){
            var i = "";
            for (i in forms) {
                if (forms[i]._id == formId) {
                    forms.splice(i,1);
                    callback(forms);
                    return;
                }
            }
        }

        function updateFormById(formId, newForm, callback) {
            var i = "";
            for (i in forms) {
                if (forms[i]._id == formId) {
                    var updatedForm = {
                        "_id": newForm["_id"],
                        "userId": newForm["userId"],
                        "title": newForm["title"]
                    };
                    forms[i] = updatedForm;
                    callback(forms[i]);
                    return;
                }
            }
        }
    }
})();



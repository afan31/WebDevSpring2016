var mock = require("./form.mock.json");
module.exports= function() {
    var api = {
        findFormById: findFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById : deleteFormById,
        createFormForUser : createFormForUser,
        updateFormById : updateFormById
    };
    return api;

    function findFormById(formId) {
        for (var u in mock) {
            if (mock[u]._id === formId) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        console.log("findAllFormsForUser in forms model" + userId);
        var formsArr = [];
        var i = "";
        for (i in mock) {
            if (mock[i].userId == userId) {
                formsArr.push(mock[i]);
            }
        }
        console.log("FORMS ARRAY ", formsArr);
        return formsArr;
    }

    function deleteFormById(formId){
        var i = "";
        for (i in mock) {
            if (mock[i]._id == formId) {
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    function createFormForUser(userId, form) {
        var id = (new Date).getTime();
        var createdForm = {
            "_id" : id,
            "userId" : userId,
            "title":form["title"]
        };
        mock.push(createdForm);
        console.log("FORM MOCK IN CREATE USER ",mock);
        return mock;
    }

    function updateFormById(formId, newForm){
        var i = "";
        for (i in mock) {
            if (mock[i]._id == formId) {
                var updatedForm = {
                    "_id": newForm["_id"],
                    "userId": newForm["userId"],
                    "title": newForm["title"]
                };
                mock[i] = updatedForm;
                return mock[i];
            }
        }
        return null;
    }

}
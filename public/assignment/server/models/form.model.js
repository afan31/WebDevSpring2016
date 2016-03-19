var mock = require("./form.mock.json");
module.exports= function(uuid) {
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

    function deleteFormById(index){
        console.log("IN INDEX DELETE FORM BY ID " +index);
        var i = "";
        for (i in mock) {
            if (mock[i]._id == index) {
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    function createFormForUser(userId, form) {
        var id = uuid.v1();
        var createdForm = {
            "_id" : id,
            "userId" : userId,
            "title":form["title"]
        };
        for (i in mock){
            if(mock[i].userId == userId && mock[i].title == form["title"]){
                return;
            }
        }
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
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http, $rootScope) {

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            findFormById : findFormById
        };
        return api;

        function createFormForUser(userId, form) {
            console.log("In Form service client ", userId);
            return $http.post("/api/assignment/user/" +userId +"/form", form);
        }

        function findAllFormsForUser(userId) {
            console.log ("findAllFormsForUser client service "+userId);
            return $http.get("/api/assignment/user/" +userId +"/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            console.log("In updateFormById - formId" +formId);
            console.log("In updateFormById - form object " +formId);
            return $http.put("/api/assignment/form/" + formId, newForm);
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }
    }
})();



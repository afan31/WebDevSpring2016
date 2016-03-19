"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http) {

        var api = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            updateField : updateField,
            getFieldForForm : getFieldForForm,
            reorderFields : reorderFields
        };
        return api;

        function createFieldForForm(formId, field) {
            console.log("In Field service client ", formId);
            return $http.post("/api/assignment/form/" +formId +"/field", field);
        }

        function getFieldsForForm(formId) {
            console.log ("getFieldsForForm client service "+formId);
            return $http.get("/api/assignment/form/" +formId +"/field");
        }

        function deleteFieldFromForm(formId, fieldId) {
            console.log("in client service - FormId", formId);
            console.log("in client service - fieldID ",  fieldId);
            return $http.delete("/api/assignment/form/" +formId+ "/field/" +fieldId);
        }

        function updateField(formId, fieldId, newfield) {
            console.log("In updateField - formId" +formId);
            console.log("In updateField - field object " +newfield);
            return $http.put("/api/assignment/form/" +formId+ "/field/" +fieldId, newfield);
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId+ "/field/" +fieldId);
        }

        function reorderFields(formId, fields){
            console.log("In reOrderFields - formId" +formId);
            console.log("In reOrderFields - fields" ,fields);
            return $http.put("/api/assignment/reorder/form/" +formId +"/fields", fields);
        }


    }
})();



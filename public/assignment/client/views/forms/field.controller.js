'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('FieldController', fieldController);

    function fieldController(FieldService, $routeParams, FormService) {
        var vm = this;
        vm.addField = addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;
        vm.editField = editField;
        vm.updateField = updateField

        function init() {
            //var userId = $routeParams.userId;
            console.log("In field controller");
            vm.formId = $routeParams.formId;
            FieldService
                .getFieldsForForm(vm.formId)
                .then(function (response) {
                        vm.fields = response.data;
                        console.log("In Fields controller - fields " , vm.fields);
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
            FormService
                .findFormById(vm.formId)
                .then(function (response){
                    vm.formName = response.data.title;
                },
                function (error) {
                    console.log(error.statusText);
                });
        }
        init();


        function addField(fieldIndex) {
            console.log("in Fields controller - addField ", fieldIndex);
            var fieldTypes = [
                //Single Line Text Field
                {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
                //Date Field
                {"_id": null, "label": "New Date Field", "type": "DATE"},
                //Dropdown Field
                {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]
                },
                //Checkboxes Field
                {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]
                },
                //Radio Buttons Field
                {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]
                },
                //Multi Line Text Field
                {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
            ];
            if (fieldTypes[fieldIndex] == undefined){
                return;
            }
            console.log(" The field to be added in the controller " ,fieldTypes[fieldIndex]);
            FieldService
                .createFieldForForm(vm.formId, fieldTypes[fieldIndex])
                .then(function (response) {
                        vm.fields = response.data;
                        console.log("In Fields controller " + vm.fields);
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function removeField(field){
            FieldService
            .deleteFieldFromForm(vm.formId, field._id)
                .then(function (response) {
                    vm.fields = response.data;
                },
                function (error) {
                    console.log(error.statusText);
                });
        }

        function cloneField(field){
            console.log("Field to be cloned in controller ", field);
            FieldService
                .createFieldForForm(vm.formId, field)
                .then(function (response) {
                        vm.fields = response.data;
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function editField(field) {
            //console.log("Field to be edited is ", field);
            vm.modalField = {
                "_id": field._id,
                "label": field.label,
                "type": field.type,
                "placeholder": field.placeholder
            };
            console.log("Modal field is ", vm.modalField);
            vm.fieldName = field.type;
            vm.fieldOptions = field.options;

            var options= [];
            if (field.type == "TEXT" || field.type == "TEXTAREA"){
                vm.showPlaceholder = true;
                vm.showOptions = false;
                vm.modalField.placeholder = field.placeholder;
            }

            else if (field.type == "OPTIONS" || field.type == "CHECKBOXES" || field.type == "RADIOS"){
                vm.showPlaceholder = false;
                vm.showOptions = true;
                for (var each in  vm.fieldOptions){
                    var singleOption = vm.fieldOptions[each].label + ":" + vm.fieldOptions[each].value + "\n";
                    options.push(singleOption);
                }
                vm.modalField.options = options.join("");
            }
            else {
                vm.showPlaceholder = false;
            }

            console.log("Modal field name is ", vm.fieldName);
            console.log("Modal field Options are ", vm.fieldOptions);
            console.log("Modal field Placeholder is ", vm.showPlaceholder);
            console.log("Modal field Options are 2nd ", vm.modalField.options);
        }

        function updateField(modalFieldObj) {
            var options = [];
            if (modalFieldObj.type === "OPTIONS" || modelFieldObj.type === "CHECKBOXES"
                || modelFieldObj.type === "RADIOS") {

                var optionsArray = modelFieldObj.options.split("\n");
                for (var i = 0; i < optionsArray.length; i++) {
                    var tempArray = optionsArray[i].split[":"];
                    options.push({
                        "label": tempArray[0],
                        "value": tempArray[1]
                    });
                }
                modalFieldObj["options"] = options;
            }
            FieldService
                .updateField(vm.formId, modelFieldObj._id, modalFieldObj)
                .then(function (response) {
                        vm.fields = response.data;
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }
    }
})();
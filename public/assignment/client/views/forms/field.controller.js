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
            console.log(vm.formId);
            FieldService
                .getFieldsForForm(vm.formId)
                .then(function (response) {
                        vm.fields = response.data.fields;
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
                {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
                //Email Text Field
                {"_id": null, "label": "Email Field", "type": "TEXT", "placeholder": "Email"},
                //Password Field
                {"_id": null, "label": "Password Field", "type": "PASSWORD", "placeholder": "Password"}
            ];
            if (fieldTypes[fieldIndex] == undefined){
                return;
            }
            console.log(" The field to be added in the controller " ,fieldTypes[fieldIndex]);
            FieldService
                    .createFieldForForm(vm.formId, fieldTypes[fieldIndex])
                .then(function (response) {
                        vm.fields = response.data.fields;

                        console.log("In Fields controller " , vm.fields);
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function removeField(field){

            console.log("FIELD ", field);
            FieldService
            .deleteFieldFromForm(vm.formId, field._id)
                .then(function (response) {
                    vm.fields = response.data.fields;
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
                        vm.fields = response.data.fields;
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
            //    vm.showPlaceholder = false;
            //    vm.showOptions = true;
            //    for (var each in  vm.fieldOptions){
            //        var singleOption = vm.fieldOptions[each].label + ":" + vm.fieldOptions[each].value + "\n";
            //        options.push(singleOption);
            //    }
            //    vm.modalField.options = options.join("");
            //}
                vm.showPlaceholder = false;
                vm.showOptions = true;
                var count = 0;
                //setting of options on modal view
                for (var each in vm.fieldOptions){
                    var option = vm.fieldOptions[each].label +":"+ vm.fieldOptions[each].value;
                    if(count < vm.fieldOptions.length - 1) {
                        option += "\n"
                    }
                    count++;
                    options.push(option);
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
        var tempArray = [];
        function updateField(modalFieldObj) {
            console.log("CONTROLLLER ", modalFieldObj);
            var options = [];
            if (modalFieldObj.type === "OPTIONS" || modalFieldObj.type === "CHECKBOXES"
                || modalFieldObj.type === "RADIOS") {

                var optionsArray = modalFieldObj.options.split("\n");
                console.log(optionsArray);
                for (var i = 0; i < optionsArray.length; i++) {
                    console.log(optionsArray[i]);
                    tempArray = optionsArray[i].split(":");
                    if(tempArray[0] === '' || tempArray[1] === ''){
                        return;
                    }
                    options.push({
                        "label": tempArray[0],
                        "value": tempArray[1]
                    });
                }
                modalFieldObj["options"] = options;
            }
            FieldService
                .updateField(vm.formId, modalFieldObj._id, modalFieldObj)
                .then(function (response) {
                    console.log("IN FIELD SERVICE for UPDATE ", response.data);
                        vm.fields = response.data.fields;
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }
    }
})();
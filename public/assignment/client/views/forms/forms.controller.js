'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('FormController', formController);

    function formController(UserService, $location, FormService){
        var vm = this;

        vm.addForm = addForm;
        vm.updateFormForUser = updateFormForUser;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        function init() {
            UserService
            .getCurrentUser()
                .then(function (response) {
                        console.log(response.data);
                        vm.currentUser = response.data;
                        console.log("IN FORM CONTROLLER " +vm.currentUser._id);
                        if(vm.currentUser){
                            FormService
                                .findAllFormsForUser(vm.currentUser._id)
                                .then(function (response){
                                    console.log(response.data);
                                    vm.forms = response.data;
                            });
                        }
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }
        init();

        function addForm(form) {
            if (!form) {
                return;
            }

            for ( var i = 0; i < vm.forms.length; i++){
                if (vm.forms[i].title == form.title){
                    alert("Form title already exists");
                    return;
                }
            }
            FormService
                .createFormForUser(vm.currentUser._id, form)
                .then(function(response){
                    if(response.data) {
                            FormService
                                .findAllFormsForUser(vm.currentUser._id)
                                .then(function (response){
                                    console.log(response.data);
                                    vm.forms = response.data;
                                    vm.form.title= undefined;
                                });
                        }
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function updateFormForUser(form) {
            console.log("FORM TITLE " +form.title);
            console.log("vm.form ", vm.form.title);
            for ( var i = 0; i < vm.forms.length; i++){
                if (vm.forms[i].title == form.title){
                    alert("Form title already exists");
                    return;
                }
            }
            console.log("In function controller for Update Form ", form._id);
            FormService
                .updateFormById(form._id, form,vm.currentUser._id)
                .then(function(response){
                        if(response.data) {
                            FormService
                                .findAllFormsForUser(vm.currentUser._id)
                                .then(function (response){
                                    console.log(response.data);
                                    vm.forms = response.data;
                                    vm.form.title= undefined;
                                });
                        }
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function deleteForm(index) {
            console.log("In function controller for delete ", +index);
            FormService
                .deleteFormById(index)
                .then(function(response){
                        if(response.data) {
                            vm.form =  null;
                            FormService
                                .findAllFormsForUser(vm.currentUser._id)
                                .then(function (response){
                                    console.log(response.data);
                                    vm.forms = response.data;
                                });
                        }
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function selectForm(selectedIndex) {
            var selectedForm = {
                "_id" : vm.forms[selectedIndex]._id,
                "title" : vm.forms[selectedIndex].title,
                "userId" : vm.forms[selectedIndex].userId
            };
            vm.form = selectedForm;
        }
    }
})();
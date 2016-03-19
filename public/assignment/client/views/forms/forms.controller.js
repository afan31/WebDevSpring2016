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
            console.log("in Form controller ",form);
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
            if (form.title === vm.form.title){
                vm.form.title = undefined;
                return;
            }
            console.log("In function controller for Update Form ", form._id);
            FormService
                .updateFormById(form._id, form)
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

    //function FormController($scope, $location, $rootScope, FormService){
    //    //console.log("Hello");
    //
    //    $scope.user = $rootScope.user;
    //
    //    if (!$scope.user){
    //        $location.url('/home');
    //    }
    //    if ($rootScope.user != undefined){
    //        var userId;
    //        userId = $rootScope.user._id;
    //
    //        FormService.findAllFormsForUser(
    //            userId,
    //            function (form) {
    //                //console.log(form);
    //                $scope.forms = form;
    //            }
    //        );
    //    }
    //
    //    // Declaration of event handler
    //    $scope.addForm = addForm;
    //    $scope.updateForm = updateForm;
    //    $scope.deleteForm = deleteForm;
    //    $scope.selectForm = selectForm;
    //    var indexSelected = -1;
    //
    //
    //    // Implementation of event handler
    //    function addForm(formObject){
    //        if (!formObject || !formObject.title){
    //            return;
    //        }
    //        FormService.createFormForUser(
    //            userId, formObject,
    //            function(form){
    //                FormService.findAllFormsForUser(
    //                    userId,
    //                    function(forms){
    //                        $scope.forms = forms;
    //                        $scope.form = {};
    //                        indexSelected = -1;
    //
    //                    }
    //                )
    //            }
    //        )
    //    }
    //
    //    function updateForm(formObject){
    //        if (!formObject || !formObject.title){
    //            return;
    //        }
    //        FormService.updateFormById(
    //            formObject._id, formObject,
    //            function(form){
    //                if (indexSelected >= 0){
    //                    $scope.forms[indexSelected] = form;
    //                    $scope.form = {};
    //                }
    //            }
    //        )
    //    }
    //
    //    function selectForm(formIndex){
    //        indexSelected = formIndex;
    //        var selectedForm = {
    //            "_id" : $scope.forms[formIndex]._id,
    //            "title" : $scope.forms[formIndex].title,
    //            "userId" : $scope.forms[formIndex].userId
    //        };
    //        $scope.form = selectedForm;
    //    }
    //
    //    function deleteForm(formIndex){
    //        FormService.deleteFormById(
    //            $scope.forms[formIndex]._id,
    //            function(forms){
    //                FormService.findAllFormsForUser (
    //                    userId,
    //                    function(form){
    //                        $scope.forms = form;
    //                        $scope.form = {};
    //                        indexSelected = -1;
    //                    }
    //                )
    //            }
    //        )
    //    }
    //}
})();
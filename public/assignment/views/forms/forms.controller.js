'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $location, $rootScope, FormService){

        $scope.user = $rootScope.user;

        if (!scope.user){
            $location.url('/home');
        }
        if ($rootScope.user != undefined){
            var userId;
            userId = $rootScope.user._id;

            FormService.findAllFormsForUser(
                userId,
                function (form) {
                    $scope.forms = form;
                }
            );
        }

        // Declaration of event handler
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        // Implementation of event handler
        function addForm(formObject){
            if (formObject == null || formObject.title == null){
                return
            }
            FormService.createFormForUser(
                user._id, formObject,
                function(form){
                    FormService.findAllFormsForUser(
                        userId,
                        function(forms){
                            var new_forms  =forms;
                            $scope.forms = new_forms;
                            $scope.form = {};

                        }
                    )
                }
            )
        }

        var indexSelected;
        function updateForm(formObject){
            if (formObject == null || formObject.title == null){
                return
            }
            FormService.updateFormById(
                formObject._id, formObject,
                function(form){
                    if (indexSelected >= 0){
                        $scope.forms[indexSelected] = form;
                        $scope.form = {};
                    }
                }
            )
        }

        function selectForm(formIndex){
            indexSelected = formIndex;
            var selectedForm = {
                "_id" : $scope.forms[formIndex]._id,
                "title" : $scope.forms[formIndex].title,
                "userId" : $scope.forms[formIndex].userId
            };
            $scope.form = selectedForm;
        }

        function deleteForm(formIndex){
            FormService.deleteFormById(
                $scope.forms[formIndex]._id,
                function(forms){
                    FormService.findAllFormsForUser (
                        userId,
                        function(form){
                            $scope.forms = form;
                            $scope.form = {};
                        }
                    )
                }
            )
        }
    }
})();
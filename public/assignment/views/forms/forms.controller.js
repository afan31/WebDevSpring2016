'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $location, $rootScope, FormService){
        //console.log("Hello");

        $scope.user = $rootScope.user;

        if (!$scope.user){
            $location.url('/home');
        }
        if ($rootScope.user != undefined){
            var userId;
            userId = $rootScope.user._id;

            FormService.findAllFormsForUser(
                userId,
                function (form) {
                    //console.log(form);
                    $scope.forms = form;
                }
            );
        }

        // Declaration of event handler
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var indexSelected = -1;


        // Implementation of event handler
        function addForm(formObject){
            if (!formObject || !formObject.title){
                return;
            }
            FormService.createFormForUser(
                userId, formObject,
                function(form){
                    FormService.findAllFormsForUser(
                        userId,
                        function(forms){
                            $scope.forms = forms;
                            $scope.form = {};
                            indexSelected = -1;

                        }
                    )
                }
            )
        }

        function updateForm(formObject){
            if (!formObject || !formObject.title){
                return;
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
                            indexSelected = -1;
                        }
                    )
                }
            )
        }
    }
})();
(function(){
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(FieldService) {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.model.fields.splice(end, 0,
                        scope.model.fields.splice(start, 1)[0]);
                    //scope.$apply();
                    FieldService
                        .reorderFields( scope.model.formId, scope.model.fields)
                        .then(function (response){
                            if (response.data){
                                scope.model.fields = response.data;
                            }
                        });
                }
            });
        }
        return {
            link: link
        }
    }
})();
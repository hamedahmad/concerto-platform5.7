
$(function()  {

    var dragoptions = {
        stack: ".ui-draggable", 
        revert: "invalid", 
        snap: ".platzhalter", 
        helper: "clone",
        //tolerance: "fit"       
    };

    var dropoptions = {
        drop: function(event,ui){
        ui.draggable.appendTo(this);
        }, 
        hoverClass: "accept"

    };

    var trashoptions = {
        accept: ".rechenzeichen",
        drop: function(event, ui){
        ui.draggable.remove();}, 
        activeClass: "opaque"
    };

    $(".antwort-element").draggable(dragoptions);
    $(".ablageziel, .ablagestart").droppable(dropoptions);

});



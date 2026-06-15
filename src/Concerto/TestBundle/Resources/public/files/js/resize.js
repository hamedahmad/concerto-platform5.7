$(function() {

    $('#balken-lila').resizable({
        handles: "e",
        alsoResize: '#balken-helper-lila',
        minWidth: 0,
        maxWidth: 440,

        start: function(event, ui) {
            $('#balken-lila').css('background-color', '#ceb8e1');
            $('#balken-helper-lila').removeClass("d-none");
        },
        stop: function(event, ui) {
            $('#balken-lila').css('background-color', '#510194');
        } 

    });

    $('#balken-gelb').resizable({
        handles: "e",
        alsoResize: '#balken-helper-gelb',
        minWidth: 0,
        maxWidth: 440,
        start: function(event, ui) {
            $('#balken-gelb').css('background-color', '#ffeeba');
            $('#balken-helper-gelb').removeClass("d-none");
        },
        stop: function(event, ui) {
            $('#balken-gelb').css('background-color', '#ffc107');
        } 
    });

    $('#balken-blau').resizable({
        handles: "e",
        alsoResize: '#balken-helper-blau',
        minWidth: 0,
        maxWidth: 440,
        start: function(event, ui) {
            $('#balken-blau').css('background-color', '#bdbde8');
            $('#balken-helper-blau').removeClass("d-none");
        },
        stop: function(event, ui) {
            $('#balken-blau').css('background-color', '#1313AD');
        } 
    });

    $('#balken-gruen').resizable({
        handles: "e",
        alsoResize: '#balken-helper-gruen',
        minWidth: 0,
        maxWidth: 440,
        start: function(event, ui) {
            $('#balken-gruen').css('background-color', '#c2e1b8');
            $('#balken-helper-gruen').removeClass("d-none");
        },
        stop: function(event, ui) {
            $('#balken-gruen').css('background-color', '#249401');
        } 
    });
   
});







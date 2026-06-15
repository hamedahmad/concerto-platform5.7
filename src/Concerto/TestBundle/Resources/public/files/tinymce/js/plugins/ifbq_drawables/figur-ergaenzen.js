$(function() {

    let isDrawing = false;

    let canvas = document.getElementById('canvas');
        canvas.startLineX = new Array();
        canvas.startLineY = new Array();
        canvas.endLineX = new Array();
        canvas.endLineY = new Array();
    let context = canvas.getContext('2d');    
    let rect = canvas.getBoundingClientRect(); 

    $('canvas').on('click', liniezeichnen);
    $('#undo').on('click', undoLine);

    function undoLine(e) {
        if (canvas.endLineX.length < 2) {
            $('#undo').addClass('d-none');
        } 
        if(!isDrawing) {     
            canvas.startLineX.pop();
            canvas.startLineY.pop();  
            canvas.endLineX.pop();
            canvas.endLineY.pop();
            context.strokeStyle = "#17a2b8";	
            redraw();
            context.beginPath();
            for(var i=0; i < canvas.startLineX.length; i++) {
                context.moveTo(startLineX[i], startLineY[i]);
                context.lineTo(endLineX[i], endLineY[i]);
            }  
    

            context.closePath();
            context.stroke(); 
        } 
 
     }

     function liniezeichnen(e) {
        startLineX = e.target.startLineX;
        endLineX = e.target.endLineX;
        startLineY = e.target.startLineY;
        endLineY = e.target.endLineY;
        context.lineJoin = "round";
        context.lineWidth = 3;
        context.strokeStyle = "#17a2b8";
        redraw(); 
        isDrawing = !isDrawing;
 
        if(isDrawing) {
            context.beginPath();
            for(var i=0; i < startLineX.length; i++) {
                context.moveTo(startLineX[i], startLineY[i]);
                context.lineTo(endLineX[i], endLineY[i]);
            }
            context.closePath();
            context.stroke(); 
            startLineX.push(e.clientX - rect.left);
            startLineY.push(e.clientY - rect.top);
        }
        
        if(!isDrawing) {
            endLineX.push(e.clientX - rect.left);
            endLineY.push(e.clientY - rect.top);
            context.beginPath();
            for(var i=0; i < startLineX.length; i++) {
                context.moveTo(startLineX[i], startLineY[i]);
                context.lineTo(endLineX[i], endLineY[i]);
            }
            context.closePath();
            context.stroke(); 
            $('#undo').removeClass('d-none');
        } 

      
     
        
    }

    $('canvas').mousemove(function(e){
        context = e.target.getContext('2d');
        rect = e.target.getBoundingClientRect(); 
       startLineX = e.target.startLineX;
        endLineX = e.target.endLineX;
        startLineY = e.target.startLineY;
        endLineY = e.target.endLineY; 
        redraw(); 
        context.strokeStyle = "#17a2b8";	
        context.beginPath();
        for(var i=0; i < startLineX.length; i++) {
            context.moveTo(startLineX[i], startLineY[i]);
            context.lineTo(endLineX[i], endLineY[i]);
        }
        context.closePath();
        context.stroke();  
        if (isDrawing) {
            context.strokeStyle = "#ccc";
            context.beginPath();
            context.moveTo(startLineX[startLineX.length-1], startLineY[startLineY.length-1]); 
            context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            context.stroke();
          }    
        });

        $('canvas').mouseleave(function(e){
            context = e.target.getContext('2d');
            rect = e.target.getBoundingClientRect(); 
            if (isDrawing) {
                startLineX.pop();
                startLineY.pop(); 
            }
            isDrawing = false;
            redraw();
            context.strokeStyle = "#17a2b8";	
            context.beginPath();
            for(var i=0; i < startLineX.length; i++) {
                context.moveTo(startLineX[i], startLineY[i]);
                context.lineTo(endLineX[i], endLineY[i]);
            }
            context.closePath();
            context.stroke();   
       });
     

        function redraw(){
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
    


});
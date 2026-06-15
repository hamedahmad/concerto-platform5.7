console.log('figur-ergaenzen.js');
LastTouchedX = null;
LastTouchedY = null;
tempStartPointX = null;
tempStartPointY = null;

startLineX = null;
endLineX = null;
startLineY = null;
endLineY = null;
let AktuelleBreit =3;

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
        //redraw();
        context.beginPath();
        for(var i=0; i < canvas.startLineX.length; i++) {
            context.moveTo(startLineX[i], startLineY[i]);
            context.lineTo(endLineX[i], endLineY[i]);
        } 
        context.closePath();
        context.stroke(); 
    } 

}

function AntwortenZeichnen(atwortObject,VarID){//StartXs:startLineX,StartYs:startLineY,EndXs:endLineX,EndYs:endLineY
    console.log(atwortObject);
    canvas= StartupObjects[VarID];
    context = canvas.getContext('2d'); 
    context.strokeStyle = "#17a2b8";
    startLineX = atwortObject.startxs;
    endLineX = atwortObject.endxs;
    startLineY = atwortObject.startys;
    endLineY = atwortObject.endys;
    canvas.startLineX = startLineX;
    canvas.startLineY = startLineY;
    canvas.endLineX = endLineX;
    canvas.endLineY = endLineY;
    context.beginPath();
    for(var i=0; i < startLineX.length; i++) {
        context.moveTo(startLineX[i], startLineY[i]);
        context.lineTo(endLineX[i], endLineY[i]);
    }
    const strok_value = canvas.hasAttribute('data-strock') ? parseInt(canvas.attributes['data-strock'].nodeValue) : 3;
    context.lineCap = "butt";
    context.lineWidth = strok_value;
    context.closePath();
    context.stroke(); 
}

function liniezeichnen(e) {
    DrawVarInput = e.target.attributes['data-var'].value;
    startLineX = e.target.startLineX;
    endLineX = e.target.endLineX;
    startLineY = e.target.startLineY;
    endLineY = e.target.endLineY;
    const strok_value = e.target.attributes['data-strock'] ? parseInt(e.target.attributes['data-strock'].value) : 3;
    context.lineWidth = strok_value;
    context.strokeStyle = "#17a2b8";
    context.lineCap = "butt";
    //redraw(); 
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
        for(var i=0; i < startLineX.length; i++)
        {
            startLineX[i] = Math.round(startLineX[i]);
            startLineY[i] = Math.round(startLineY[i]);
            endLineX[i] = Math.round(endLineX[i]);
            endLineY[i] = Math.round(endLineY[i]);
        }
        var draw_result={'startxs':startLineX,'startys':startLineY,'endxs':endLineX,'endys':endLineY};
        $('#'+DrawVarInput.toUpperCase()).val(JSON.stringify(draw_result));
    } 
}

function liniezeichnenTouch(e) {
    e.preventDefault();
    const { clientX, clientY } = e.touches ? e.touches[0] : e;    
	rect = e.target.getBoundingClientRect(); 
    DrawVarInput = e.target.attributes['data-var'].value;
    startLineX = e.target.startLineX;
    endLineX = e.target.endLineX;
    startLineY = e.target.startLineY;
    endLineY = e.target.endLineY;
    const strok_value = e.target.attributes['data-strock'] ? parseInt(e.target.attributes['data-strock'].value) : 3;
    context.lineWidth = strok_value;
    context.lineCap = "butt";
    AktuelleBreit = strok_value;
    context.strokeStyle = "#17a2b8";
    tempStartPointX = clientX - rect.left;
    tempStartPointY = clientY - rect.top;
    LastTouchedX = null;
    LastTouchedY = null;
}

function liniezeichnenStop() {


    isDrawing = false;
    //console.log('stopping')
    if (!LastTouchedX)
        return;
    
    startLineX.push(tempStartPointX);
    startLineY.push(tempStartPointY);
    context.lineWidth = AktuelleBreit;
    context.strokeStyle = "#17a2b8";
    //redraw(); 
    endLineX.push(LastTouchedX);
    endLineY.push(LastTouchedY);
    context.beginPath();
    for(var i=0; i < startLineX.length; i++) {
        context.moveTo(startLineX[i], startLineY[i]);
        context.lineTo(endLineX[i], endLineY[i]);
    }
    context.lineCap = "butt";
    context.closePath();
    context.stroke(); 
    $('#undo').removeClass('d-none');
    for(var i=0; i < startLineX.length; i++)
    {
        startLineX[i] = Math.round(startLineX[i]);
        startLineY[i] = Math.round(startLineY[i]);
        endLineX[i] = Math.round(endLineX[i]);
        endLineY[i] = Math.round(endLineY[i]);
    }
    var draw_result={'startxs':startLineX,'startys':startLineY,'endxs':endLineX,'endys':endLineY};
    $('#' + DrawVarInput.toUpperCase()).val(JSON.stringify(draw_result));
    LastTouchedX = null;
    LastTouchedY = null;
    tempStartPointX = null;
    tempStartPointY = null;
    startLineX = null;
    endLineX = null;
    startLineY = null;
    endLineY = null;
}

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function ChangeToUmlaute(text){
    
  ToReturn =text.replace(/_oe_/g, "ö");
  ToReturn =ToReturn.replace(/_OE_/g, "Ö");
  ToReturn =ToReturn.replace(/_ae_/g, "ä");
  ToReturn =ToReturn.replace(/_AE_/g, "Ä");
  ToReturn =ToReturn.replace(/_ue_/g, "ü");
  ToReturn =ToReturn.replace(/_UE_/g, "Ü");
  ToReturn =ToReturn.replace(/_ss_/g, "ß");
  
  return(ToReturn)
}

function jsonEscape(str)  {
    return str.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "");
}

function GetAnswerObject(answervalue){
    for(var i=0;i<StartupObjects.length;i++){
        var obj = StartupObjects[i];
          if(obj.attr('data-value')==answervalue)
            return obj;
    }
}

/*	if(RemoteAnswer){ 
  console.log(RemoteAnswer);
      AntwortenZeichnen(RemoteAnswer[0],RemoteAnswer[1]);
}*/

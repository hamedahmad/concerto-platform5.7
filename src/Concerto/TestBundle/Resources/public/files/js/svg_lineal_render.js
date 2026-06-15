console.log('svg_lineal_render.js');

var antwort = (answers.length) ? JSON.parse(answers.replace(/\n/g, '')) : {};
if(typeof ISEDITSEITE !== "undefined" && ISEDITSEITE)
{
    console.log('tmp_aktiv_svg','edit mode');
    antwort[$('#var_name').val()] = window.btoa($('#response').val());
}	
var totalPixels = 0; // z.B. 800
var schrittSteps = {};//totalPixels*defaultSchritte/defaultMTotal; // z.B. 800*0.1/1.6 = 50
minX = {};//defaultMinX;
maxX = {};//defaultMaxX;
total = 0;//defaultMTotal;
schritt = {};//defaultSchritte;
PfeilKoordinaten = {};

function replaceImagesWithSvg()
{
    const images = document.querySelectorAll('img');
    images.forEach((img,idx) => {
        // Check if it's an SVG file
        const isSvg = img.src.toLowerCase().indexOf('.svg')>3;
        
        if (isSvg && img.getAttribute('data-option') != null)
        {
            fetchLinealSvg(img); 
        }
    });
}

function fetchLinealSvg(img)
{
    fetch(img.src)
    .then(response => response.text())
    .then(svgText => {
        const parser = new DOMParser();
        const svgElement = parser.parseFromString(svgText, 'image/svg+xml').querySelector('svg');
        if (svgElement) {
            const var_name = img.getAttribute('data-option');
            minX[var_name] = parseInt(svgElement.getAttribute('minX') || defaultMinX);
            maxX[var_name] = parseInt(svgElement.getAttribute('maxX') || defaultMaxX);
            total= parseFloat(svgElement.getAttribute('total') || defaultMTotal);
            schritt[var_name] = parseFloat(svgElement.getAttribute('schritt') || defaultSchritte);
            totalPixels = maxX[var_name] - minX[var_name]; // z.B. 800
            schrittSteps[var_name] = totalPixels*schritt[var_name]/total; // z.B. 800*0.1/1.6 = 50

            prepairSvg(svgElement,img);
        }
    })
    .catch(error => console.error('Failed to fetch SVG:', error));
}

function prepairSvg(svgElement,img)
{
    const var_name = img.getAttribute('data-option');
    svgElement.setAttribute('id', 'ifbq_var_svg_'+var_name || '');
    // Copy attributes (except draggable and src)
    ['id', 'class', 'style', 'width', 'height', 'title', 'alt'].forEach(attr => {
        if (img.hasAttribute(attr)) {
            svgElement.setAttribute(attr, img.getAttribute(attr));
        }
    });
    const arrowNode = svgElement.querySelector('.ifbq-hand-pfeil');
    arrowNode.setAttribute('id', 'ifbq_pfile_arrow_'+var_name);

    img.parentNode.replaceChild(svgElement, img);
    prepairArrow(svgElement,var_name);
    prepairAnswers(var_name);
    handleArrow(svgElement,var_name);
}

function prepairAnswers(varName) {
    let value = atob(antwort[varName] || '');

    if(value.length == 0 || value == '#99#')
    {
        antwort[varName] = [];
        $('#'+varName).val('#99#');
        return;
    }
    else
    {
        dragging = false;
        antwort[varName] = value;
        setValue(value,varName);
    }
}
function prepairArrow(svg,var_name) {

    PfeilKoordinaten[var_name] = [];
    const arrow = document.getElementById("ifbq_pfile_arrow_"+var_name);
    
    if (arrow && arrow.tagName === "polygon") {
        const points = arrow.points;
    
        for (let i = 0; i < points.length; i++) {
            PfeilKoordinaten[var_name].push({ x: points[i].x, y: points[i].y });
        }
    }
    else {
        console.error("Polygon mit id 'ifbq_pfile_arrow_"+var_name+"' ist nicht gefunden ODER nicht ein Polygon-Element.");
    }
}

function handleArrow(svg,var_name) {

	svg.addEventListener("pointerdown", e => {
        dragging = true;
        updateFromEvent(e,var_name);
      });
  
      svg.addEventListener("pointermove", e => {
        if (dragging) updateFromEvent(e,var_name);
      });
  
      svg.addEventListener("pointerup", () => dragging = false);
      svg.addEventListener("pointerleave", () => dragging = false);
}

function updateFromEvent(e,var_name) {
    const svg = document.getElementById("ifbq_var_svg_"+var_name);
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
    let cursorX = Math.max(cursor.x,minX[var_name]);
    cursorX = Math.min(cursorX,(maxX[var_name]));
    const xPositionRudet = cursorX-minX[var_name]; // z.B. 501
    const anzahlSchritt = Math.round(xPositionRudet/schrittSteps[var_name]); // z.B. 501/50 = 10,02 -> 10
    const positionValue = anzahlSchritt * schritt[var_name]; // z.B. 10*0.1 = 1
    setValue(positionValue,var_name);
}

function setValue(value,var_name)
{
    const valueSchritt = Math.round(value/schritt[var_name]); // z.B. 1,03 -> 1
    const x = minX[var_name] + (valueSchritt * schrittSteps[var_name]);
	const arrow = document.getElementById("ifbq_pfile_arrow_"+var_name);
    const bbox = arrow.getBBox();
    const halbWidth = bbox.width/2;
    const punctY = bbox.y + bbox.height;

    const neuePunkte = PfeilKoordinaten[var_name].map(p => {
        const offsetX = p.x - PfeilKoordinaten[var_name][0].x; // Berechnung des Offsets basierend auf der ursprünglichen Position
        return `${offsetX+x},${p.y}`; // Verschiebung des Punktes um den berechneten Offset
    });
    arrow.setAttribute(
      "points", neuePunkte.join(" ")
    );

    antwort[var_name] = value;
    $('#'+var_name).val(value);
    $(`#antwort`).val(btoa(JSON.stringify(antwort)));
    console.log(antwort);
}

replaceImagesWithSvg();
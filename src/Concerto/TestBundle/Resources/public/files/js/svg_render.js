console.log('tmp_aktiv_svg','svg_render.js');
var Markierungsfarbe = defaultMarkColor;
var antwort = (answers.length) ? JSON.parse(answers.replace(/\n/g, '')) : {};
if(typeof ISEDITSEITE !== "undefined" && ISEDITSEITE)
{
    console.log('tmp_aktiv_svg','edit mode');
    antwort[$('#var_name').val()] = window.btoa($('#response').val());
}	
// Function to replace img tags with object tags

function replaceImagesWithObjects() {
// Get all img elements
    const images = document.querySelectorAll('img');

    images.forEach((img,idx) => {
        // Check if it's an SVG file
        const isSvg = img.src.toLowerCase().indexOf('.svg')>3;
        
        if (isSvg)
        {
            // Create object element
            if(img.getAttribute('data-option') == null)
                return;

            const var_name = img.getAttribute('data-option');
            const obj = document.createElement('object');
            obj.setAttribute('data', img.src);
            obj.setAttribute('type', 'image/svg+xml');
            obj.setAttribute('id', 'svg_object_parent_'+var_name);
            
            // Copy attributes (except draggable and src)
            ['id', 'class', 'style', 'width', 'height', 'title', 'alt'].forEach(attr => {
                if (img.hasAttribute(attr)) {
                    obj.setAttribute(attr, img.getAttribute(attr));
                }
            });
            
            // Replace img with object
            img.parentNode.replaceChild(obj, img);
            
            // Handle SVG loading
            obj.addEventListener('load', function() {
                const svgDoc = obj.contentDocument;
                const svgElement = svgDoc.querySelector('svg');
                // Example: Control SVG content here
                if (svgElement) 
                {
                    svgElement.setAttribute('data-option', img.getAttribute('data-option') || '');
                    svgElement.setAttribute('zweite-farbe', img.getAttribute('zweite-farbe') || '#55ff99');
                    svgElement.setAttribute('id', 'svg_parent_'+var_name);                    
                }
            });
        }
    });
    prepairSvgs();
}

function changeColor(item, index) {
    const grandParentSvg = item.parentElement.closest("svg");
    const var_name = grandParentSvg.getAttribute('data-option');

    if (item.classList.contains('clickbar-item-clicked')) {
        item.classList.remove('clickbar-item-clicked');
        antwort[var_name] = antwort[var_name].filter(i=>i != index);
     } else {
        const startWert = $('#'+var_name).val();
        const value = startWert.length>0 && startWert!=='#99#' ? $('#'+var_name).val() : '[]';
        antwort[var_name] = JSON.parse(value);
        antwort[var_name].push(index);
        item.classList.add('clickbar-item-clicked');
    }

    $('#'+var_name).val(JSON.stringify(antwort[var_name]));
    $('#'+var_name+'_count').val(antwort[var_name].length);
    $(`#antwort`).val(btoa(JSON.stringify(antwort)));
}

function prepairSvgs() {
    const svgs = document.querySelectorAll('object[type="image/svg+xml"]');
    svgs.forEach(svg => {
        svg.addEventListener('load', function()
        {
            const svgDoc = svg.contentDocument;
            injectStylesIntoSvg(svgDoc);
            const svgElement = svgDoc.querySelector('svg');            
            const var_name = svgElement.getAttribute('data-option');
            if (svgElement) {
                const rect_elements = svgDoc.querySelectorAll('.clickbar-item');
                rect_elements.forEach((el, index) => 
                {
                    const itemIndex = index+1;
                    el.style.cursor = 'pointer';
                    el.setAttribute('data-index', itemIndex);
                    el.addEventListener("click", function () {
                        changeColor(this, itemIndex);
                    });
                });
                prepairAnswers(var_name);
            }
        });
    });
}

function prepairAnswers(varName,outAntwort = null)
{
    const objectElement = document.getElementById('svg_object_parent_'+varName);
    const objectDoc = objectElement.contentDocument;
    let value = outAntwort ? atob(outAntwort) : atob(antwort[varName] || '');

    if(value.length == 0 || value == '#99#')
    {
        antwort[varName] = [];
        $('#'+varName).val('#99#');
        $('#'+varName+'_count').val('0');
        return;
    }
    else
    {
        value = JSON.parse(value);
        antwort[varName] = value;
        value.forEach(i=>{
            const obj = objectDoc.querySelector(`[data-index="${i}"]`);
            changeColor(obj,i);
        });        
        $('#'+varName+'_count').val(value.length);
    }
}

function injectStylesIntoSvg(svgDoc) {
    const svgElement = svgDoc.querySelector('svg');
    Markierungsfarbe = svgElement.getAttribute('farbe') || defaultMarkColor;
    const style = svgDoc.createElementNS('http://www.w3.org/1999/xhtml', 'style');
    style.textContent = `
        .clickbar-item-clicked {
            fill: ${Markierungsfarbe} !important; /* Light green */
        }
    `;
    svgElement.appendChild(style);
}

replaceImagesWithObjects();
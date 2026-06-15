console.log('svg_editor');

    function ShowSvgSettings(selectedNode,tmp)
    {
        if(tmp === undefined)
        {
            const vn = $('#item_template').val();
            tmp = vn == 'tmp_aktiv_svg' ? 'svg_type' : 'lineal_svg_type';
        }
        console.log('svg_editor');
        editor = tinyMCE.activeEditor;
        editor.ui.registry.addIcon('edit-icon', '<svg width="32px" height="32px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M823.3 938.8H229.4c-71.6 0-129.8-58.2-129.8-129.8V215.1c0-71.6 58.2-129.8 129.8-129.8h297c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7h-297c-24.5 0-44.4 19.9-44.4 44.4V809c0 24.5 19.9 44.4 44.4 44.4h593.9c24.5 0 44.4-19.9 44.4-44.4V512c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v297c0 71.6-58.2 129.8-129.8 129.8z" fill="#3688FF"></path><path d="M483 756.5c-1.8 0-3.5-0.1-5.3-0.3l-134.5-16.8c-19.4-2.4-34.6-17.7-37-37l-16.8-134.5c-1.6-13.1 2.9-26.2 12.2-35.5l374.6-374.6c51.1-51.1 134.2-51.1 185.3 0l26.3 26.3c24.8 24.7 38.4 57.6 38.4 92.7 0 35-13.6 67.9-38.4 92.7L513.2 744c-8.1 8.1-19 12.5-30.2 12.5z m-96.3-97.7l80.8 10.1 359.8-359.8c8.6-8.6 13.4-20.1 13.4-32.3 0-12.2-4.8-23.7-13.4-32.3L801 218.2c-17.9-17.8-46.8-17.8-64.6 0L376.6 578l10.1 80.8z" fill="#5F6379"></path></g></svg>'); 
        editor.windowManager.open({
            title: 'Svg Datei Information V.1',
            width: 730,
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'input',
                        name: 'path',
                        label: 'Path',
                        placeholder: '../bundles/concertopanel/files/DATEI_NAME.svg'
                    },
                    {
                        type: 'input',
                        name: 'var_name',
                        label: 'Variablename',
                        placeholder: 'Soll unique sein'
                    },
                    {
                        type: 'input',
                        name: 'width',
                        label: 'Breite',
                        inputMode: 'number'
                    },
                    {
                        type: 'input',
                        name: 'height',
                        label: 'Höhe',
                        inputMode: 'number'
                    }
                ]
            },
            buttons: [
                {
                    type: 'submit',
                    text: 'Ok',
                    buttonType: 'primary'
                },
                {
                    type: 'cancel',
                    text: 'Abbrechen'
                },
                {
                    type: 'custom',
                    text: 'Bild prüfrn',
                    name: 'edit-svg',
                    buttonType: 'secondary',
                    icon: 'edit-icon',
                    align: 'start'
                }
            ],
            initialData: {
                path: selectedNode && selectedNode.getAttribute ? selectedNode.getAttribute('src') : '../bundles/concertopanel/files/',
                var_name: selectedNode && selectedNode.getAttribute ? selectedNode.getAttribute('data-option') : '',
                width: selectedNode && selectedNode.getAttribute ? selectedNode.getAttribute('width') : '',
                height: selectedNode && selectedNode.getAttribute ? selectedNode.getAttribute('height') : ''
            },
            onAction: (api, details) => {
            if (details.name === 'edit-svg') {
                const data = api.getData();
                if(data.var_name.length)
                {
                    if(tmp == 'lineal_svg_type')
                        ShowLinearEditor(data.path,data.var_name);
                    else
                        ShowImageEditor(data.path,data.var_name);
                }
                else
                {
                alert('Geben Sie bitte die Variablename ein;');
                }
            }
            },
            onSubmit: function(api) {
                const data = api.getData();
                const img = `<img mceNonEditable="true" src="${data.path}" width="${data.width}" height="${data.height}" data-type="${tmp}" data-option="${data.var_name}" />`;
                editor.selection.setContent(img);
                api.close();
            }
        });
    }

    function ShowLinearEditor(path,var_name)
    {
        editor = tinyMCE.activeEditor;
        editor.windowManager.open({
            width: 730,
            title: 'Svg Datei bearbeiten',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'htmlpanel', 
                        html: `<p> Bitte wählen Sie den Teil aus, den Sie <b>als Pfeil</b> in diesem Bild festlegen möchten.</p><p><img id="svg_image_editor_bild" src="${path}" alt="Preview" style="max-width: 100%; margin-bottom: 15px;" />
                            definierte Parameter:<br>
                            <span id="zusatzlichtext"></span>
                        </p>
                        <p style="text-align:center;">
                            ausgewählte Zeiger:<br>
                            <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250"  id="svg_ausgewaehlt"></svg>
                        </p>`
                    }    
                ]
            },
            buttons: [
                {
                    type: 'submit',
                    text: 'Herunterladen',
                    buttonType: 'primary',
              	    icon: 'save',
                },
                {
                    type: 'cancel',
                    text: 'schließen'
                }
            ],
            onSubmit: function(api) {
                const svgElement = document.getElementById('svg_image_editor_bild');
                if (svgElement)
                {
                    const clonedSvg = svgElement.cloneNode(true);
                    const svgText = new XMLSerializer().serializeToString(clonedSvg);
                    
                    const blob = new Blob([svgText], { type: 'image/svg+xml' });
                    const blobUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = `${var_name || 'edited'}.svg`; // Use var_name or default to 'edited.svg'
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link); // Clean up the link

                } else {
                    console.error('Object element not found.');
                }
            }
        });

        const img = document.getElementById('svg_image_editor_bild');
        if (img) {
            img.addEventListener('load', function () {
                console.log('Image loaded:', img.src);
                fetchLinealSvg(img);
            });
        } else {
            console.error('Image element not found in the popup.');
        }
    }

    function fetchLinealSvg(img) {
        fetch(img.src)
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgElement = parser.parseFromString(svgText, 'image/svg+xml').querySelector('svg');
            if (svgElement) {
                prepairLinealSvg(svgElement,img)
            }
        })
        .catch(error => console.error('Failed to fetch SVG:', error));
    }

    function prepairLinealSvg(svgElement,img)
    {
        // Copy attributes (except draggable and src)
        ['id', 'class', 'style', 'width', 'height', 'title', 'alt'].forEach(attr => {
            if (img.hasAttribute(attr)) {
                svgElement.setAttribute(attr, img.getAttribute(attr));
            }
        });//ifbq-hand-pfeil
        minX = svgElement.getAttribute('minX') ? parseFloat(svgElement.getAttribute('minX') || '0') :'<small style="color:red;font-size:10px;">NICHT DEFINIERT</small>';
        maxX = svgElement.getAttribute('minX') ? parseFloat(svgElement.getAttribute('maxX') || '0') :'<small style="color:red;font-size:10px;">NICHT DEFINIERT</small>';
        total = svgElement.getAttribute('minX') ? parseFloat(svgElement.getAttribute('total') || '0') :'<small style="color:red;font-size:10px;">NICHT DEFINIERT</small>';
        schritt = svgElement.getAttribute('schritt') ? parseFloat(svgElement.getAttribute('schritt') || '0') :'<small style="color:red;font-size:10px;">NICHT DEFINIERT</small>';
        const zusaetzlicheText = `minX:${minX} , maxX:${maxX}, schritt:${schritt}`;
        $('#zusatzlichtext').html(zusaetzlicheText);
        img.parentNode.replaceChild(svgElement, img);
        handleArrow(svgElement);
    }

    function handleArrow(svgElement)
    {
        if (!svgElement) {
            console.error('SVG element is not available.');
            return;
        }
    
        const allNodes = svgElement.querySelectorAll('*');     
        // Iterate over each node
        allNodes.forEach(node => {
            // Make the node clickabare by changing the cursor style
            node.style.cursor = 'pointer';
            if(node.classList.contains('ifbq-hand-pfeil'))
            {                
                $('#svg_ausgewaehlt').show(300);
                appendCenteredElement(document.getElementById('svg_ausgewaehlt'), node.cloneNode(true));
            }

            node.addEventListener('click', function () {
                document.getElementById('svg_ausgewaehlt').innerHTML = '';
                $('#svg_ausgewaehlt').hide();
                if (node.classList.contains('ifbq-hand-pfeil')) {
                    node.classList.remove('ifbq-hand-pfeil');
                 } else {
                    $('.ifbq-hand-pfeil').removeClass('ifbq-hand-pfeil'); // Remove class from all other nodes
                    $('#svg_ausgewaehlt').show(300);
                    appendCenteredElement(document.getElementById('svg_ausgewaehlt'), node.cloneNode(true));
                    node.classList.add('ifbq-hand-pfeil');
                }
            });
        });
    }

    function appendCenteredElement(svgElement, newElement) {
        // Append the new element to the root <svg> temporarily to calculate its bounding box
        svgElement.appendChild(newElement);
    
        // Get the bounding box of the new element
        const bbox = newElement.getBBox();
    
        // Get the dimensions of the root <svg>
        const svgWidth = svgElement.viewBox.baseVal.width || svgElement.getBoundingClientRect().width;
        const svgHeight = svgElement.viewBox.baseVal.height || svgElement.getBoundingClientRect().height;
    
        // Calculate the center position
        const centerX = (svgWidth - bbox.width) / 2 - bbox.x;
        const centerY = (svgHeight - bbox.height) / 2 - bbox.y;
    
        // Apply translation to center the element
        newElement.setAttribute('transform', `translate(${centerX}, ${centerY})`);
    }

    function ShowImageEditor(path,var_name) {

        editor = tinyMCE.activeEditor;
        editor.windowManager.open({
            title: 'Svg Datei bearbeiten',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'htmlpanel', 
                        html: `<p> Bitte wählen Sie die Teile aus, die Sie als <b>aktive Bereiche</b> in diesem Bild festlegen möchten.</p><p><img id="svg_image_editor_bild" src="${path}" alt="Preview" style="max-width: 100%; margin-bottom: 15px;" /></p>`
                    }    
                ]
            },
            buttons: [
                {
                    type: 'submit',
                    text: 'Herunterladen',
                    buttonType: 'primary',
              	    icon: 'save',
                },
                {
                    type: 'cancel',
                    text: 'schließen'
                }
            ],
            onSubmit: function(api) {
                const objectElement = document.getElementById('svg_image_editor_bild');
                if (objectElement) {
                    const svgDoc = objectElement.contentDocument;
                    const svgElement = svgDoc.querySelector('svg');
    
                    if (svgElement) {

                        const clonedSvg = svgElement.cloneNode(true);

                        // Clean up the cloned SVG
                        cleanUpSvg(clonedSvg);
                        const svgText = new XMLSerializer().serializeToString(clonedSvg);
                        
                        const blob = new Blob([svgText], { type: 'image/svg+xml' });
                        const blobUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.download = `${var_name || 'edited'}.svg`; // Use var_name or default to 'edited.svg'
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link); // Clean up the link
                    } else {
                        console.error('SVG element not found in the object.');
                    }
                } else {
                    console.error('Object element not found.');
                }
            }
        });

        const img = document.getElementById('svg_image_editor_bild');
        if (img) {
            img.addEventListener('load', function () {
                console.log('Image loaded:', img.src);
                replaceImagesWithObject(img,var_name);
            });
        } else {
            console.error('Image element not found in the popup.');
        }
    }
    
    function replaceImagesWithObject(img,var_name) {
    
        // Check if it's an SVG file
        const isSvg = img.src.toLowerCase().indexOf('.svg')>3;
        
        if (isSvg)
        {
            const obj = document.createElement('object');
            obj.setAttribute('data', img.src);
            obj.setAttribute('type', 'image/svg+xml');
            obj.setAttribute('id', 'ifbq_svg_bild_editor');
            
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
                injectStylesIntoSvg(svgDoc);
                const svgElement = svgDoc.querySelector('svg');
                svgElement.setAttribute('id', 'aktiv_svg_'+var_name);
                prepairSvg(svgElement);
            });
        }
    }

    function prepairSvg(svgElement) {
        if (!svgElement) {
            console.error('SVG element is not available.');
            return;
        }
    
        const allNodes = svgElement.querySelectorAll('*');     
        // Iterate over each node
        allNodes.forEach(node => {
            // Make the node clickabare by changing the cursor style
            node.style.cursor = 'pointer';
    
            // Add a click event listener to the node
            node.addEventListener('click', function () {
                if (node.classList.contains('clickbar-item')) {
                    node.classList.remove('clickbar-item');
                    document
                 } else {
                    node.classList.add('clickbar-item');
                }
            });
        });
    }

    function injectStylesIntoSvg(svgDoc) {
        const style = svgDoc.createElementNS('http://www.w3.org/1999/xhtml', 'style');
        style.textContent = `
            .clickbar-item {
                fill: #90ee90 !important; /* Light green */
                stroke: #000000 !important; /* Black border */
                stroke-width: 2px;
            }
        `;
        svgDoc.querySelector('svg').appendChild(style);
    }

    function cleanUpSvg(svgElement) {
        const styleTags = svgElement.querySelectorAll('style');
        styleTags.forEach(styleTag => {
            styleTag.remove();
        });
    
        const allNodes = svgElement.querySelectorAll('*');
    
        allNodes.forEach(node => {
            if (node.style.cursor === 'pointer') {
                node.style.cursor = ''; // Reset the cursor style
            }
        });
        }
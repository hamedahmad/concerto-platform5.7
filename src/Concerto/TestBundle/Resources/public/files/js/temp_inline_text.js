console.log('tmp_inline_text');
var LastKeyboardCartePos = null;
var inlineoriginalwidth = [];
var INVALUE = null;
var savedRange = null;
var savedSelection = null;
var focused = [];
var listendTo = [];
var selectedFrac = null;

class ContentEditableHandler {
    
    constructor(element) {
      this.element = element;
      if(element)
        this.init();
    }

    init() {
        console.log('ContentEditableHandler');
      // Clean on input
      this.element.addEventListener('input', () => this.clean());
      
      // Handle backspace
      this.element.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') this.handleBackspace(e);
      });

      this.element.addEventListener('mouseup', (e) => {
        removeAllBr(this.element);
        const var_name = this.element.getAttribute('data-option');
        setItemFocused(var_name);        
      });

      this.element.addEventListener('blur', (e) => {
        const var_name = this.element.getAttribute('data-option');
        RemoveFocusedItem(var_name);       
      });

      this.element.addEventListener('keyup', (e) => {
        const var_name = this.element.getAttribute('data-option');
        getCurrentCursorPosition(this.element);
        CleanInput(var_name);
      });
      
      // Initial cleanup
      this.clean();
    }
    
    clean() {
      // Remove all <br> tags that are alone      
      const emptyBrs = this.element.querySelectorAll('br:only-child');
      emptyBrs.forEach((br) => {
        const parent = br.parentNode;
        if (parent && parent.textContent.trim() === '') {
          parent.innerHTML = '';
        }
      });
      //removeAllBr(this.element);
      // Ensure there's always a placeholder for cursor
      if (this.element.innerHTML === '') {
        this.element.innerHTML = '\u200B';
      }
    }
    
    handleBackspace(e) {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      
      const range = selection.getRangeAt(0);
      const container = range.startContainer;
      const parent = container.parentElement;
      
      // If we're deleting the last character and content will be empty
      if (parent === this.element && 
          parent.textContent.length === 1 && 
          range.collapsed) {
        e.preventDefault();
        parent.innerHTML = '\u200B';
        
        // Reset cursor
        const newRange = document.createRange();
        newRange.selectNodeContents(parent);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
}

    function getCurrentCursorPosition(element) {
        let position = 0;
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const preRange = range.cloneRange();
            preRange.selectNodeContents(element);
            preRange.setEnd(range.endContainer, range.endOffset);
            position = preRange.toString().length;
        }
        console.log('Current cursor position:', position);
        
        return position;
    }

    function removeAllBr(element) {
        if (window.jQuery && element.jquery) {
        // It's a jQuery object
        element.find('br').remove();
        } else if (element.querySelectorAll) {
        // It's a DOM element
        element.querySelectorAll('br').forEach(br => br.remove());
        }
    }

    function preventMeineEvent(event, obj, mode) {
        event.preventDefault();
        updateSupSelected(obj, mode);
    }

    function createTeil(event, obj, mode) {
        event.preventDefault();
        if(aktuelleObjekt == null)
            return;
        const varName = $(obj).attr('data-option');
        $(obj).addClass('an');
        savedSelection = window.getSelection();
        savedRange = savedSelection.getRangeAt(0);
        keyboardMode = "default";
        $('.format-but').hide();
        $('.format-but.an').show();
        $(`#frag_pop_${varName}`).removeClass('hidden');
    }

    function setFraction(obj,cancle)
    {
        keyboardMode = "contentEditable";
        const varName = $(obj).attr('data-option');    
        const mainInput = document.getElementById('text_input_var_item_' + varName);
        const popUp = $(`#frag_pop_${varName}`);
        const containerBottom = document.getElementById('resulttext').getBoundingClientRect().bottom;
        if(cancle)
        {
            popUp.find('.pop-up-div').val('');
            popUp.find('.pop-down-div').val('');
            removeclassAn(document.getElementById('ifbq_tiele_'+varName));
            popUp.addClass('hidden');
            return;
        }
        const upValue = popUp.find('.pop-up-div').val();
        const downValue = popUp.find('.pop-down-div').val();

        if(selectedFrac!= null)
        {
            selectedFrac.querySelector('up-div').innerText = upValue;
            selectedFrac.querySelector('down-div').innerText = downValue;
            selectedFrac = null;
            removeclassAn(document.getElementById('ifbq_tiele_'+varName));
            popUp.addClass('hidden');
            return;
        }

        const fractionHtml = `<fraction-div><up-div contenteditable='false'>${upValue}</up-div> <down-div contenteditable='false'>${downValue}</down-span></fraction-div>`;
        let platz = $(fractionHtml);
        let insertedNode = platz[0];
        
        savedRange.insertNode(insertedNode);

        const spaceNode = document.createTextNode('\u00A0'); // or ' '

        insertedNode.parentNode.insertBefore(
            spaceNode,
            insertedNode.nextSibling
        );

        savedRange.setStart(spaceNode, 1);
        savedRange.setEnd(spaceNode, 1);

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);
        
        if(!listendTo.includes(varName))
            setFractionAsButton(varName);

        $(`#frag_pop_${varName}`).removeClass('hidden');
        $(`#ifbq_tiele_${varName}`).removeClass('hidden');
        popUp.find('.pop-up-div').val('');
        popUp.find('.pop-down-div').val('');
        popUp.addClass('hidden');

        removeclassAn(document.getElementById('ifbq_tiele_'+varName));
        $('#input_var_item_' + varName).find('br').remove();
        setCursorToEnd(varName, true);
    }
    
    function setFractionAsButton(varName)
    {
        const mainInput = document.getElementById('text_input_var_item_' + varName);
        mainInput.addEventListener('click', function (event) {
            if (['UP-DIV','DOWN-DIV'].includes(event.target.tagName))
            {
                keyboardMode = "default";
                const popUp = $(`#frag_pop_${varName}`);
                const upDiv = popUp.find('.pop-up-div');
                const downDiv = popUp.find('.pop-down-div');
                const clicedObject = event.target.parentNode;
                selectedFrac = clicedObject;
                const upValue = clicedObject.querySelector('up-div').innerText;
                const downValue = clicedObject.querySelector('down-div').innerText;
                upDiv.val(upValue);
                downDiv.val(downValue);
                $('.format-but').hide();
                $('.format-but.an').show();
                popUp.removeClass('hidden');

                const containerBottom = document.getElementById(`testContainer`).getBoundingClientRect().bottom;
                const popUpBottom = popUp[0].getBoundingClientRect().bottom;
                if(popUpBottom > containerBottom)
                {
                    popUp.addClass('top');
                }
                else
                {
                    popUp.removeClass('top');
                }
            }
        });
        if(!listendTo.includes(varName))
            listendTo.push(varName);
    }

    function setCursorAtEnd(div) 
    {
        div.focus();

        // Ensure there's a text node at the end
        let lastNode = div.lastChild;
        if (!lastNode || lastNode.nodeType !== Node.TEXT_NODE) {
        // Create a text node if the last child isn't a text node
        const textNode = document.createTextNode('');
        div.appendChild(textNode);
        lastNode = textNode;
        }
        
        const range = document.createRange();
        const selection = window.getSelection();
        
        // Set cursor at the end of the last text node
        range.setStart(lastNode, lastNode.length);
        range.collapse(true);
        
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function setClickableFraction()
    {
        const fracItems = document.querySelectorAll('fraction-div');
        fracItems.forEach(element => {
            const varName = element.closest('.div-input').getAttribute('data-option');
            setFractionAsButton(varName);
        });
    }

    function getFrac(varName) {
        return `<div class="teil format-but hidden" id="ifbq_tiele_${varName}" data-option="${varName}" onmousedown="createTeil(event,this,'teil');">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 110 100">
                        <rect x="30" y="10" width="40" height="30" fill="white" stroke="gray" stroke-width="2"></rect>
                        <line x1="20" y1="50" x2="80" y2="50" stroke="black" stroke-width="4"></line>
                        <rect x="30" y="60" width="40" height="30" fill="white" stroke="gray" stroke-width="2"></rect>
                    </svg>
                </div>`;
    }

    function getSubSub(varName) {
        return `<span class="format-but sup" id="sup_${varName}" data-option="${varName}" onmousedown="preventMeineEvent(event,this,'sup');" ><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" enable-background="new 0 0 52.001 52.001" version="1.1" xml:space="preserve">
            <g class="layer"><g id="svg_1" transform="translate(0.5 0) translate(-0.5 0) translate(1.33319 5.832) scale(0.957689 0.934076) translate(-1.33319 -5.832) translate(1.35227 5.84836) matrix(0.508369 0 0 0.555148 1.5851 -3.41858)"> <g id="svg_2" transform="translate(-0.25 0) translate(0 0.25) translate(-0.25 0) translate(-0.25 0) translate(-0.25 0) translate(-0.25 0) translate(2.72501 17.549) matrix(0.443618 0 0 0.393537 -5.43584 -11.3938)">  <path d="m47.74,41.76l-13.79,-15.76l13.79,-15.76c2.35,-2.34 2.35,-6.14 0,-8.48c-2.34,-2.35 -6.14,-2.34 -8.48,0l-13.26,15.15l-13.26,-15.15c-2.34,-2.34 -6.14,-2.34 -8.48,0c-2.35,2.34 -2.35,6.14 0,8.48l13.79,15.76l-13.79,15.76c-2.35,2.34 -2.35,6.14 0,8.48c2.34,2.35 6.14,2.35 8.48,0l13.26,-15.15l13.26,15.15c2.34,2.35 6.14,2.35 8.48,0c2.35,-2.34 2.35,-6.14 0,-8.48z" id="svg_3"/> </g></g><text font-family="Monospace" font-size="12.13" font-weight="bold" id="svg_19" stroke="#000000" stroke-width="0" text-anchor="middle" x="14.93" xml:space="preserve" y="8.38">y</text>
            </g>
            </svg></span>
                    <span class="sub format-but" id="sub_${varName}" data-option="${varName}" onmousedown="preventMeineEvent(event,this,'sub');" ><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" enable-background="new 0 0 52.001 52.001" version="1.1" xml:space="preserve">
            <g class="layer"><g id="svg_1" transform="translate(0 0.25) matrix(0.486859 0 0 0.51855 2.8695 -1.59593)"> <g id="svg_2" transform="translate(-0.25 0) translate(0 0.25) translate(-0.25 0) translate(-0.25 0) translate(-0.25 0) translate(-0.25 0) translate(2.72501 17.549) matrix(0.443618 0 0 0.393537 -5.43584 -11.3938)">  <path d="m47.74,41.76l-13.79,-15.76l13.79,-15.76c2.35,-2.34 2.35,-6.14 0,-8.48c-2.34,-2.35 -6.14,-2.34 -8.48,0l-13.26,15.15l-13.26,-15.15c-2.34,-2.34 -6.14,-2.34 -8.48,0c-2.35,2.34 -2.35,6.14 0,8.48l13.79,15.76l-13.79,15.76c-2.35,2.34 -2.35,6.14 0,8.48c2.34,2.35 6.14,2.35 8.48,0l13.26,-15.15l13.26,15.15c2.34,2.35 6.14,2.35 8.48,0c2.35,-2.34 2.35,-6.14 0,-8.48z" id="svg_3"/> </g></g><text font-family="Monospace" font-size="11.22" font-weight="bold" id="svg_19" stroke="#000000" stroke-width="0" text-anchor="middle" x="14.93" xml:space="preserve" y="13.59">y</text>
            </g>
            </svg></span>`;
    }

    function getFracSubSub(frac, sub, varName) {
        return (frac + sub).length > 0 ? `<div class="sup-sub" id= "knopf_sup_sub_${varName}">    
        ${sub}${frac}
        </div>` : '';
    }

    function removeclassAn(obj) {
        const varName = $(obj).attr('data-option');
        const parentItem = $('#text_input_var_item_' + varName);
        $('#input_var_item_' + varName)
            .val(parentItem.html().replace(/contenteditable="true"/g, '').replace(/contenteditable="false"/g, '').replace(/\uFEFF/g, '').replace(/<span><\/span>/g, ""));
        $(obj).removeClass('an');
        $('.format-but').show();
    }

    function updateSupSelected(obj, mode) {
        const varName = $(obj).attr('data-option');
        //const MainId = 'text_input_var_item_' + varName;
        if ($(obj).hasClass('an')) {
            removeclassAn(obj, mode);
            //setCursorToEnd(varName, true);
        }
        else {
            //setCursorToEnd(varName, true);
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const selectedText = range.toString(); // Get the selected text
            let platz = document.createElement(mode);
            platz.innerHTML = selectedText + '&#xFEFF;';
            range.insertNode(platz);
            const newRange = document.createRange();
            newRange.selectNodeContents(platz);
            newRange.collapse(false); // place cursor at the end of the sup
            // Update the selection
            selection.removeAllRanges();
            selection.addRange(newRange);
            $(obj).addClass('an');
            $('.format-but').hide();
            $('.format-but.an').show();
        }
    }

    function CleanInput(varName){    
        const parentItem = $('#text_input_var_item_' + varName);
        $('#input_var_item_' + varName).find('br').remove();
        $('#input_var_item_' + varName)
            .val(parentItem.html().replace(/contenteditable="true"/g, '')
            .replace(/contenteditable="false"/g, '')
            .replace(/<br\s*\/?>/g, '')
            .replace(/\uFEFF/g, '').replace(/<span><\/span>/g, "")
            .trim());
    }

    function RemoveFocusedItem(varName)
    {
        focused = focused.filter(item => item !== varName);
        $('#ifbq_tiele_' + varName).addClass('hidden');
        CleanInput(varName);
    }

    function setCursorToEnd(var_name, erstelle)
    {
        if(!focused.includes(var_name))
            focused.push(var_name);
        
        const feildId = 'text_input_var_item_' + var_name;
        const editor = document.getElementById(feildId);
    
        editor.innerHTML = editor.innerHTML.trim() + (!editor.innerHTML.endsWith('&nbsp;') && editor.innerHTML.length ? "&nbsp;" : ''); // Remove the temporary placeholder
        setCursorAtEnd(editor);
    }

    function jsonEscape(str) {
        return str.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "");
    }

    $.fn.textWidth = function (_text, _font) {//get width of text with font.  usage: $("div").textWidth();
        var fakeEl = $('<span>').hide().appendTo(document.body).text(_text || this.val() || this.text()).css('font', _font || this.css('font')),
            width = fakeEl.width();
        fakeEl.remove();
        return width;
    };

    function setItemFocused(varName)
    {
        aktuelleObjekt = 'text_input_var_item_' + varName;
        $('#ifbq_tiele_' + varName).removeClass('hidden');
        if(!focused.includes(varName))
        {
            focused.push(varName);
            //setCursorAtEnd(document.getElementById(aktuelleObjekt),true); 
        }   
    }

    testRunner.controllerProvider.register("linearTest", function ($scope) {//tmp_inline_text
        $scope.responseOptions = main_response_options;

        $scope.answers = [];

        try {
            if (answersjsontext.length > 0) {
                answersjsontext = answersjsontext.replace(/contenteditable="true"/g, '').replace(/\uFEFF/g, '').replace(/<span><\/span>/g, "");
                $scope.answers = JSON.parse(jsonEscape(answersjsontext));
            }
        }
        catch (e) {
            $scope.answers = {};
        }

        function b64_to_utf8(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            const retUTF = decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return ChangeToUmlaute(retUTF);
        }

        var MainStr = $('#rawtext').val();
        var $rawtext = MainStr;
        var $resulttext = "";

        var MainStr = MainStr.replace(/#__#/g, '#_130_#');

        if (MainStr.indexOf('#_') >= 0) {
            $rawtext = MainStr.split(/#_[^]+?_#/g);
            var width_array = MainStr.match(/#_[^]+?_#/g);

            $resulttext = "";
            FiledTastatur = {};

            for (i = 0; i < $rawtext.length; i++) {
                var inputitem = "";
                if (i < $scope.responseOptions.length) {
                    var var_name = $scope.responseOptions[i].varname;
                    var var_value = $scope.answers && $scope.answers[var_name] ? b64_to_utf8($scope.answers[var_name]).replace('#99#', '') : '';

                    const InnenInfo = width_array[i].replace('#_', '').replace('_#', '');

                    const InfoArray = InnenInfo.split('_');

                    let Style = '';
                    let zusaetzlich_class = '';
                    InfoArray.forEach((element) => {
                        if (element.indexOf('h') == 0) {
                            const numb = element.replace('h', '');
                            Style += 'height:' + numb + 'px;'
                        }
                        else if (element.indexOf('emfs') == 0) {
                            const numb = element.replace('emfs', '');
                            Style += 'font-size:' + numb + 'em;';
                        }
                        else if (element.indexOf('fs') == 0) {
                            const numb = element.replace('fs', '');
                            Style += 'font-size:' + numb + 'px;';
                            if (InnenInfo.indexOf('_h') == -1)
                                Style += 'height:' + (parseInt(numb) + 2) + 'px;';
                        }
                        else if (element == 'b')
                            Style += 'font-weight:bold;'
                        else if (element == 'c')
                            Style += 'text-align:center;'
                        else if (element == 'kl' && element != '')
                            zusaetzlich_class = 'kein-unter-border'
                        else if (element != 'nz' && element != '' && element != 'frac')
                            Style += 'width:' + element + 'px;'
                    });

                    if (Style.indexOf('width') < 0) {
                        Style += 'width:130px;'
                    }
                    const Frac = InfoArray.includes('frac') ? getFrac(var_name) : '';
                    const SupSub = InfoArray.includes('lvl') ? getSubSub(var_name) : '';
                    const FracSubSub = getFracSubSub(Frac, SupSub, var_name);
                    const input_typ = InnenInfo.indexOf('nz') >= 0 ? "nur-zahlen" : "";
                    const pattern = InnenInfo.indexOf('nz') >= 0 ? ' pattern="[0-9,]"' : "";
                    const inputmode = InnenInfo.indexOf('nz') >= 0 ? ' inputmode="numeric"' : "";
                    if (Frac != '' || SupSub != '') {
                        INVALUE = var_value.replace(/\uFEFF/g, '').replace(/<span><\/span>/g, "") + '<span>&#xFEFF;</span>';
                        var_value = INVALUE.replace(/contenteditable="true"/g, '').replace(/\uFEFF/g, '').replace(/<span><\/span>/g, "");
                        inputitem = `<div class="input-inline-container">
                            <div class="frac-pop hidden" id="frag_pop_${var_name}">
                                    <div class="pop-title-div">Bruch eingeben</div>
                                    <div><input class="ifbq-keyboard-input pop-up-div" value="" name="up_div_${var_name}" id="up_div_${var_name}" /></div>
                                    <hr class="pop-hr"/>
                                    <div><input class="ifbq-keyboard-input pop-down-div" value="" name="down_div_${var_name}"  id="down_div_${var_name}"/></div>
                                    <div><span class="pop-down-btn" data-option="${var_name}" onclick="setFraction(this,true)">Abbrechen</span> <span class="pop-down-btn" data-option="${var_name}" onclick="setFraction(this)">OK</span></div>
                                </div>
                            <div contenteditable="true" data-option="${var_name}" id="text_input_var_item_${var_name}" class="ifbq-keyboard-input flexible hoch input-var-item flex-h div-input ${CTEXT} ${input_typ} colors-haburg-blau-color colors-haburg-blau-bg ${zusaetzlich_class}" placeholder=" " style="${Style}">
                                ${INVALUE}
                            </div>
                            ${FracSubSub}
                            <input id="input_var_item_${var_name}" name="${var_name}" value="${var_value}" type="hidden">
                        </div>`;
                    }
                    else {
                        INVALUE = var_value;
                        inputitem = `<input autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off" id="input_var_item_${var_name}" name="${var_name}" type="text" value="${var_value}" ${pattern} ${inputmode} class="ifbq-keyboard-input flexible input-var-item ${CTEXT} ${input_typ} colors-haburg-blau-color colors-haburg-blau-bg ${zusaetzlich_class}" placeholder=" " style="${Style}">`;
                    }

                    if (!Object.keys(FiledTastatur).includes(var_name) && typeof TastaturTyp != 'undefined' && TastaturTyp != '')
                        FiledTastatur[var_name] = TastaturTyp;
                }
                $resulttext += $rawtext[i] + inputitem;
            }
        }
        else {
            $resulttext = $rawtext;
        }

        if ($rawtext.length < 1) {
            $('#rawtext').val('');
        }

        $('#resulttext').html(StartTag + $resulttext + "</div>");

        /*** FRACTION SET */
        $('up-div').attr('contenteditable', 'false');    
        $('down-div').attr('contenteditable', 'false');
        setClickableFraction();
        document.querySelectorAll('div[contenteditable="true"]').forEach(editor => {
            new ContentEditableHandler(editor);
        });
        /********* */

        if (typeof resetKeyBoard != 'undefined')
            resetKeyBoard();
        $(".nur-zahlen").on('input', function (e) {
            $(this).val($(this).val().replace(/[^0-9,+-.]/g, ''));
        });

        $('.input-var-item').on('focus', function () {
            keyboardMode = this.getAttribute('contenteditable') === 'true'
                ? "contentEditable" 
                : "default";
            setlContainerZeigenInput(this.id);
        });

        var trackerarray = new Array();
        $('.flexible').on('input', delay(function (event) {
            const objName = $(this).hasClass('div-input') ? $(this).attr('data-option') : $(this).attr('name');
            if (!trackerarray[objName] || trackerarray[objName] != $(this).val()) {
                update_click_loger(objName, event.which, $(this).val());
                trackerarray[objName] = $(this).val();
            }
            if (!inlineoriginalwidth[objName])
                inlineoriginalwidth[objName] = $(this).width();

            var options = { padding: 10, minWidth: $(this).width(), maxWidth: 1000 };
            
            let textToCalculate = '';
            if($(this).hasClass('div-input'))
            {
                let htmlToCalc = $(this).html();
                htmlToCalc = htmlToCalc.replace(/<fraction-div>(.*?)<\/fraction-div>/g, '**');
                
                // Use a temporary DOM element to parse the modified HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlToCalc;
                
                // Extract plain text content
                textToCalculate = tempDiv.textContent.trim() || tempDiv.innerText.trim() || '';
            }
            var curr_width = $(this).hasClass('div-input') ? (textToCalculate.length * 8) + options.padding : $(this).textWidth() + options.padding;
            $(this).css({ width: Math.max(inlineoriginalwidth[objName], curr_width) });
        }, 100));
        
        $().click

        InitAutoComplete();
    });

console.log('MIX main v2.4 loaded');
var MainQuestion = "";
var general_object_index = 0;

var allAnswers = {};
var answers = {};
var MC_SPALTEN = new Array();

var CheckedArray = [];
var mixoriginalwidth = [];
var trackerarray = [];
var StartupObjects = [];
var context = null;
var canvas = undefined;//$('canvas')[0];//document.getElementById('canvas');
var DrawResponseOptions = [];
var DragDropResponseOptions = [];
var DrawVarInput = "";
var isDrawing = false;
var rect = null;
var OldParent = null;
var NewParent = null;
var sub_label = '';
var savedRange = null;
const editStatus = (typeof ISEDITSEITE !== 'undefined' && ISEDITSEITE)
//answersjsontext = {};

var AnsweredValues = [];

try {

    var answersjsontext = ANSWERS_VAR;
    if (answersjsontext && answersjsontext.length > 0)
        allAnswers = JSON.parse(jsonEscape(answersjsontext));
    console.log('allAnswers: ', allAnswers);
    answers = allAnswers;
}
catch (e) {
    console.log('error mit answers', e);
    allAnswers = {};
}

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
        //removeAllBr(this.element);
        const var_name = this.element.getAttribute('data-option');
        setItemFocused(var_name);        
      });

      this.element.addEventListener('blur', (e) => {
        const var_name = this.element.getAttribute('data-option');
        RemoveFocusedItem(var_name);       
      });

      this.element.addEventListener('keyup', (e) => {
        const var_name = this.element.getAttribute('data-option');
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

function jsonEscape(str) {
    return str.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "");
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function ChangeToUmlaute(text) {

    ToReturn = text.replace(/_oe_/g, "ö");
    ToReturn = ToReturn.replace(/_OE_/g, "Ö");
    ToReturn = ToReturn.replace(/_ae_/g, "ä");
    ToReturn = ToReturn.replace(/_AE_/g, "Ä");
    ToReturn = ToReturn.replace(/_ue_/g, "ü");
    ToReturn = ToReturn.replace(/_UE_/g, "Ü");
    ToReturn = ToReturn.replace(/_ss_/g, "ß");

    return (ToReturn)
}

function b64_to_utf8(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    const retUTF = decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return ChangeToUmlaute(retUTF);
}

function uncheck(item) {
    var radioid = item.attr('id');
    var radioname = item.attr('name');
    if (item.prop('checked') && CheckedArray.indexOf(radioid) > -1) {
        item.prop('checked', false);
        CheckedArray.splice($.inArray(radioid, CheckedArray), 1);
    }
    else {
        $('input:radio[name=' + radioname + ']').each(function () {
            var itemtoRemove = $(this).attr('id');
            if (CheckedArray.indexOf(itemtoRemove) > -1)
                CheckedArray.splice($.inArray(itemtoRemove, CheckedArray), 1);
        });
        CheckedArray.push(radioid)
    }
    update_click_loger(radioname, $('#' + radioid).prop('checked'), $('#' + radioid).val());
}


$.fn.textWidth = function (_text, _font) {//get width of text with font.  usage: $("div").textWidth();
    var fakeEl = $('<span>').hide().appendTo(document.body).text(_text || this.val() || this.text()).css('font', _font || this.css('font')),
        width = fakeEl.width();
    fakeEl.remove();
    return width;
};
/***********************************BRUCH FUNCTIONS ******************************* */

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
        platz.innerHTML = selectedText;
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
    $('#input_var_item_' + varName)
        .val(parentItem.html().replace(/contenteditable="true"/g, '')
        .replace(/contenteditable="false"/g, '')
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

    function setCursorInLastSpan()
    {
        // 1. Find all spans that contain the zero-width non-breaking space
        const spans = document.querySelectorAll('span');
        const targetSpans = Array.from(spans).filter(span => span.innerHTML === '\uFEFF');
    
        if (targetSpans.length > 0) {
            const lastSpan = targetSpans[targetSpans.length - 1];
            
            // 2. Create a new range
            const range = document.createRange();
            const selection = window.getSelection();
        
            // 3. Select the content inside the last span
            // Using index 1 ensures the cursor is after the character
            range.setStart(lastSpan.childNodes[0], 1);
            range.collapse(true);
        
            // 4. Remove any existing selections and apply the new one
            selection.removeAllRanges();
            selection.addRange(range);
        
            // Optional: Ensure the element is focused if it's in a contentEditable area
            lastSpan.focus();
        }
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

        savedRange = document.createRange();
        const selection = document.getSelection();

        // Set cursor at the end of the last text node
        savedRange.setStart(lastNode, lastNode.length);
        savedRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(savedRange);
        setCursorInLastSpan();
    }

    function setClickableFraction()
    {
        const fracItems = document.querySelectorAll('fraction-div');
        fracItems.forEach(element => {
            const varName = element.closest('.div-input').getAttribute('data-option');
            setFractionAsButton(varName);
        });
    }

    function setFraction(obj,cancle)
    {
        keyboardMode = "contentEditable";
        const varName = $(obj).attr('data-option');   
        const popUp = $(`#frag_pop_${varName}`);
        
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
    }

    function removeclassAn(obj) {
      const varName = $(obj).attr('data-option');
      const parentItem = $('#text_input_var_item_' + varName);
      $('#input_var_item_' + varName)
          .val(parentItem.html().replace(/contenteditable="true"/g, '').replace(/contenteditable="false"/g, '').replace(/\uFEFF/g, '').replace(/<span><\/span>/g, ""));
      $(obj).removeClass('an');
      $('.format-but').show();
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


/*****************************************DRAG FUNCTIONS ///////////////////////////////////////*****************/

function GetAnswerObject(answervalue) {
    for (var i = 0; i < StartupObjects.length; i++) {
        var obj = StartupObjects[i];
        if (obj.attr('data-value') == answervalue)
            return obj;
    }
}

function resetAllValues(originalobj) {
    /*if(NewParent.attr('id')==OldParent.attr('id'))
        return;*/
    FelderInhalte = {}
    $('.ablageziel').each(function (i, obj) {
        var varname = $(this).attr('data-var');
        var inObject = $(this).children();
        var neuvalue = (inObject && inObject.attr('data-value')) ? inObject.attr('data-value') : '';
        var attrAnzahlablage = $(this).attr('data-anzahl');
        const wiederholbar = (typeof attrAnzahlablage !== 'undefined'
            && attrAnzahlablage !== false
            && attrAnzahlablage != ''
            && parseInt(attrAnzahlablage) != 0);

        if ($(this).hasClass('goal_block')) {
            const inhalten = Array.from(this.childNodes);
            if (!FelderInhalte[varname])
                FelderInhalte[varname] = [];
            inhalten.forEach((item) => {
                if ($(item).hasClass('goal_block')) {
                    FelderInhalte[varname].push(item.attributes['data-value'].value)
                    AnhangInfos[varname] = [];
                }
            });
        }

        if (!neuvalue || wiederholbar)
            $(this).droppable("enable");
        else if ($(this).attr('data-option') != 'true')
            $(this).droppable("disable");
    });
    rebindDraggables();
}

function resetValues() {
    for (var res in DragDropResponseOptions) {
        const varname = DragDropResponseOptions[res].varname;
        AnhangInfos[varname] = [];
        const inObject = $('#dragable_' + varname).children();
        const neuvalue = (inObject && inObject.attr('data-value')) ? getObjectValues(inObject, varname) : '';
        if ($('#' + varname).val() != 'ifbq_nur_zumzahl')
            $('#' + varname).val(neuvalue);
    }
}


function rebindDraggables() {
    var dragoptions = {
        helper: "clone",
        revert: true,
        revertDuration: 0,
        stack: ".antwort-element",
        start: function (event, ui) { OldParent = $(this).parent() },
        stop: function () {
            NewParent = $(this).parent();
            rebindDraggables();

            let OptionalRemove = OldParent.attr('data-option') == 'true' &&
                OldParent.children() &&
                OldParent.children().length == 0
            const KeinMultiContainer = typeof OldParent.attr('data-anzahl') == 'undefined' ||
                OldParent.attr('data-anzahl') == '' ||
                OldParent.attr('data-anzahl') == '1'

            if (NewParent.attr('id') != OldParent.attr('id') && !OptionalRemove && KeinMultiContainer)
                OldParent.empty();

            OldParent.droppable("enable");
            setTimeout(function () {
                resetValues();
            }, 300);
        }
    };
    $(".antwort-element").draggable(dragoptions);
    $(".antwort-element").unbind('mouseup');
    $(".goal_block .antwort-element").unbind('dblclick');
    $(".goal_block .antwort-element").unbind('touchstart');
    $(".goal_block .antwort-element").dblclick(function (e) {
        antwortAuslassen(this)
    });

    $(".goal_block .antwort-element").on("taphold", function (e) {
        antwortAuslassen(this)
    });

    $(".goal_block .antwort-element").on("touchstart", function (e) {
        if (!tapped) {
            tapped = setTimeout(function () {
                tapped = null
            }, 300);
        } else {
            clearTimeout(tapped);
            tapped = null
            antwortAuslassen(this)
        }
        e.preventDefault()
    });

}

function antwortAuslassen(obj) {
    const originalid = $(obj).attr('original');
    const AntwortBlock = $(obj).parent();
    const AntwortValue = $(obj).attr('data-value');


    if (originalid == $(AntwortBlock).attr('id')) return;

    update_click_loger($(AntwortBlock).attr('data-var'), 'del', $(obj).attr('data-value'));//Ziehl-Value

    if ($('#' + originalid).children().length < 1) {
        $('#' + originalid).append($(obj).clone());
    }
    $(obj).remove();
    const FrageBlockID = '#' + AntwortBlock.attr('data-var');
    const AntwortInput = $(FrageBlockID).val();

    if (AntwortInput[0] == '[') {
        const jsonAtwort = JSON.parse(AntwortInput).filter((item) => {
            return item != AntwortValue
        });

        if (jsonAtwort.length) {
            $(FrageBlockID).val(JSON.stringify(jsonAtwort));
        }
        else {
            $(FrageBlockID).val('');
        }
    }
    else {
        $(FrageBlockID).val('');
    }
    rebindDraggables();
    resetValues();
}

function getObjectValues(obj, varname) {
    const toReturn = [];
    if (obj.length == 1) {
        const currval = obj[0].attributes['data-value'].value;
        AnhangInfos[varname].push(currval);
        return currval;
    }
    else {
        const userValues = [];
        for (i = 0; i < obj.length; i++) {
            const currval = obj[i].attributes['data-value'].value;
            AnhangInfos[varname].push(currval);
            //if(!userValues.includes(currval))
            //{
            userValues.push(currval);
            toReturn.push(currval);
            //}
        }
    }
    return (toReturn.length == 1) ? toReturn[0] : JSON.stringify(toReturn);
}

/***************************************************TEMPLATES HANDLING***********************************/

function AddInputTextList(sub_question, sub_item_config, obj_settings) {
    $RO = jQuery.parseJSON(sub_item_config);

    mainList = $('#text_input_list');
    mainList.empty();
    var obj_example = obj_settings[1];
    var specialstyle = "";
    var disabled = '';

    mainList.append('<ol class="check-box-list" id="lst_text_' + general_object_index + '" type=""></ol>')
    var list_class = ($RO.response_options.length > 1) ? '' : 'oneline';
    $.each($RO.response_options, function (key, data) {
        var var_value = allAnswers && allAnswers[data.varname] ? b64_to_utf8(allAnswers[data.varname]).replace('#99#', '') : '';
        if (obj_example.length > 0) {
            var_value = obj_example;
            specialstyle = 'style="color:black;background-color:#CFCFCF;display: block;"'
            disabled = 'disabled';
        }

        $('#lst_text_' + general_object_index).append('<li class="' + list_class + '" ' + specialstyle + '>' +
            ' <textarea  autofocus autocomplete="off" id="input_var_item_' + key + '_' + data.varname + '" autocorrect="off" autocapitalize="off" class="ifbq-keyboard-input single-input colors-haburg-blau-color colors-haburg-blau-bg" name="' + data.varname + '" ' + disabled + '>' + var_value + '</textarea></li>');
    })

    $('#MAIN_Content').append(sub_label + '<div ' + specialstyle + '>' + sub_question + mainList.html() + '</div>');
    /*if(data && !Object.keys(FiledTastatur).includes(data.varname) && typeof TastaturTyp != 'undefined' && TastaturTyp!='')
        FiledTastatur[data.varname] = TastaturTyp;*/

    $('.single-input').keyup(delay(function (event) {
        var today = new Date();
        var atime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (!trackerarray[$(this).attr('name')] || trackerarray[$(this).attr('name')] != $(this).val()) {
            update_click_loger($(this).attr('name'), event.which, $(this).val(), atime);
            trackerarray[$(this).attr('name')] = $(this).val();
            $(this).css({ height: 'auto', padding: 0 });
            $(this).css({ height: $(this)[0].scrollHeight });
        }
    }, 200));

    general_object_index++;
}

function Add_MMC(sub_template, sub_question, sub_item_config) {

    $RO = jQuery.parseJSON(sub_item_config);

    mainList = $('#text_input_list');
    mainList.empty();

    var MainTable = sub_label + '<div>' + sub_question + '<table class="check-box-table">' +
        '	<tbody id="tbl_table_' + general_object_index + '">' +
        '		<tr id="tbl_header_' + general_object_index + '">' +
        '			<td>' + $RO.text2 + '</td>' +
        '		</tr>' +
        '	</tbody>' +
        '</table></div></div>';

    $('#MAIN_Content').append(MainTable)

    var index = 0;
    $.each($RO.answer_options, function (key, tantwort) {
        $('#tbl_header_' + general_object_index).append('			<td>' + tantwort + '</td>')
        index++;
    })

    var rowIndex = 0;
    $.each($RO.response_options, function (key, option) {
        NewRow = '	<tr><td>' + option.label + '</td>'
        index = 1;
        $.each($RO.answer_options, function (key, tantwort) {
            var checked = allAnswers && allAnswers[option.varname] && b64_to_utf8(allAnswers[option.varname]).replace('#99#', '') == index ? 'checked' : '';
            if (checked != '')
                CheckedArray.push('input_response_' + general_object_index + '_' + rowIndex + '_' + index);

            NewRow += '			<td><div class="radiobtn"><input autofocus autocomplete="off" autocorrect="off" autocapitalize="off" class="option-input checkbox" onclick="uncheck($(this))" id="input_response_' + general_object_index + '_' + rowIndex + '_' + index + '" name="' + option.varname + '" type="radio" value="' + index + '" ' + checked + ' /><label for="input_response_' + general_object_index + '_' + rowIndex + '_' + index + '"></label></div></td>';
            index++;
        });
        $('#tbl_table_' + general_object_index).append(NewRow + '</tr>');
        rowIndex++;
    });
    general_object_index++;
}

function Add_MC(sub_template, sub_question, sub_item_config, obj_settings) {

    mainList = $('#text_input_list');
    mainList.empty();
    $RO = jQuery.parseJSON(sub_item_config);
    var text2 = ($RO.text2) ? $RO.text2 : '';
    var special_list_mc = '', mc_center_question = '';

    if (text2.length > 0) {
        special_list_mc = 'special-list-mc';
        mc_center_question = 'mc_center_question';
    }
    sub_question = '<span class="' + mc_center_question + '">' + sub_question + '</span>';

    var obj_zrows = obj_settings[0];
    var obj_example = obj_settings[1];

    var obj_hrows = $RO.horizontal;
    var obj_brows = $RO.borders;


    var tmpContainer = 'MAIN_Content';
    if (obj_zrows && obj_zrows != 'NULL') {
        tmpContainer = 'mc_spalte_' + obj_zrows;
        if (MC_SPALTEN.indexOf(obj_zrows) < 0) {
            $('#MAIN_Content').append('<div class="mc_spalte" id="' + tmpContainer + '"></div>');
            MC_SPALTEN.push(obj_zrows);
        }

    }

    var itemListContainer = '<ol type="A" class="' + mc_center_question + ' ' + special_list_mc + '" id="lst_text_' + general_object_index + '"></ol>';
    var itemListBlock = "li";


    if (obj_hrows && obj_hrows == '1') {
        itemListContainer = '<div class="item-list-container" id="lst_text_' + general_object_index + '"></div>';
        itemListBlock = "span"

        mainList.append(itemListContainer)
        var index = 0;
        var disabled = '';
        $.each($RO.response_options, function (key, data) {
            var checked = allAnswers && allAnswers[data.varname] && b64_to_utf8(allAnswers[data.varname]).replace('#99#', '') == data.value ? 'checked' : '';

            disabled = (obj_example != '') ? 'disabled' : '';
            if (checked == '' && obj_example == data.value && obj_example != '') {
                checked = 'checked';
                sub_question = '<span class="' + mc_center_question + '" style="color:black;background-color:#CFCFCF;display: block;">' + sub_question + '</span>';
            }

            if (checked != '')
                CheckedArray.push('input_response_' + key + '_' + general_object_index);

            var ohne_borders = (obj_brows && obj_brows == '0') ? 'no-borders' : '';

            $('#lst_text_' + general_object_index).append('<' + itemListBlock + '>' +
                '<div class="radiobtn-h">' +
                '      <input autofocus autocomplete="off" autocorrect="off" autocapitalize="off" id="input_response_' + key + '_' + general_object_index + '" name="' + data.varname + '" onclick="uncheck($(this))" type="radio" value="' + data.value + '"  ' + checked + ' ' + disabled + ' />' +
                '       <label class="rdoChecker" for="input_response_' + key + '_' + general_object_index + '">' +
                '  		<div class="item-block-h ' + ohne_borders + '">' +
                '  			<div class="item-block-h-center">' + data.label + '</div>' +
                '  		</div>' +
                '  	</label>' +
                ' </div>' +
                '</' + itemListBlock + '>');
            index++;
        })
    }
    else {
        mainList.append(itemListContainer)
        var index = 0;
        $.each($RO.response_options, function (key, data) {
            var checked = allAnswers && allAnswers[data.varname] && b64_to_utf8(allAnswers[data.varname]).replace('#99#', '') == data.value ? 'checked' : '';
            disabled = (obj_example != '') ? 'disabled' : '';
            if (checked == '' && obj_example == data.value && obj_example != '') {
                checked = 'checked';
                sub_question = '<span class="' + mc_center_question + '" style="color:black;background-color:#CFCFCF;display: block;">' + sub_question + '</span>';
            }

            if (checked != '')
                CheckedArray.push('input_response_' + key + '_' + general_object_index);

            $('#lst_text_' + general_object_index).append('<' + itemListBlock + '>' +
                '   <div class="radiobtn"> <input autofocus autocomplete="off" autocorrect="off" autocapitalize="off" id="input_response_' + key + '_' + general_object_index + '" onclick="uncheck($(this))" name="' + data.varname + '" type="radio" value="' + data.value + '"  ' + checked + ' ' + disabled + ' />' +
                '       <label class="rdoChecker" for="input_response_' + key + '_' + general_object_index + '">' + data.label + '</label>' +
                '  </div>' +
                '</' + itemListBlock + '>');
            index++;
        })
    }

    $('#' + tmpContainer).append(sub_label + '<div class="special-list">' + sub_question + "" + mainList.html() + '<span class="' + mc_center_question + '">' + text2 + '</span></div></div>');

    general_object_index++;
}

function getFracSubSub(frac, sub, varName) {
    return (frac + sub).length > 0 ? `<div class="sup-sub" id= "knopf_sup_sub_${varName}">    
    ${sub}${frac}
    </div>` : '';
}

function AddInlineText(sub_template, sub_question, sub_item_config) {
    let CTEXT = "";
    let StartTag = "<div>";

    if (CTEXT_VAR == '1' || CTEXT_VAR == '2') {
        CTEXT = `inline_ctext${CTEXT_VAR}`;
        StartTag = '<div class="inline_text_div">';
    }

    $RO = jQuery.parseJSON(sub_item_config);

    var MainStr = sub_question.replace(/#__#/g, '#_130_#');
    $rawtext = MainStr.split(/#_[^]+?_#/g);
    var width_array = MainStr.match(/#_[^]+?_#/g);

    $resulttext = '';
    let FracItemsExists = false;
    for (i = 0; i < $rawtext.length; i++) {
        var inputitem = "";
        if (i < $RO.response_options.length && width_array) {
            var var_name = $RO.response_options[i].varname;
            var var_value = allAnswers && allAnswers[var_name] ? b64_to_utf8(allAnswers[var_name]).replace('#99#', '') : '';

            const InnenInfo = width_array[i].replace('#_', '').replace('_#', '');
            const InfoArray = InnenInfo.split('_');
            let Style = '';
            let zusaetzlich_class  = '';
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
                FracItemsExists = true;
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
                inputitem = '<input autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off" id="input_var_item_' + var_name + '" name="' + var_name + '" type="text" '+pattern+' '+inputmode+' value="' + var_value + '" class="ifbq-keyboard-input flexible input-var-item ' + CTEXT + ' ' + input_typ + ' colors-haburg-blau-color colors-haburg-blau-bg" placeholder=" " style="' + Style + '">';
            }
        }
        $resulttext += $rawtext[i] + inputitem;
    }

    if ($rawtext.length < 1) {
        $('#rawtext').val('');
    }

    /******************************************************************************************************/

    $('#MAIN_Content').append(sub_label + StartTag + $resulttext + '</div></div>');
    if (FracItemsExists) {
        /*** FRACTION SET */
        $('up-div').attr('contenteditable', 'false');    
        $('down-div').attr('contenteditable', 'false');
        setClickableFraction();
        document.querySelectorAll('div[contenteditable="true"]').forEach(editor => {
            new ContentEditableHandler(editor);
        });
        /********* */
        $('.input-var-item').on('focus', function () {
            keyboardMode = this.getAttribute('contenteditable') === 'true'
                ? "contentEditable" 
                : "default";
            setlContainerZeigenInput(this.id);
        });
    }
    /******************************************************************************************************/
    trackerarray = new Array();

    $('.flexible').keyup(delay(function (event) {
        if (!mixoriginalwidth[$(this).attr('name')]) {
            mixoriginalwidth[$(this).attr('name')] = $(this).width();
        }
        var today = new Date();
        var atime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (!trackerarray[$(this).attr('name')] || trackerarray[$(this).attr('name')] != $(this).val()) {
            update_click_loger($(this).attr('name'), event.which, $(this).val(), atime);
            trackerarray[$(this).attr('name')] = $(this).val();

            var options = { padding: 10, minWidth: $(this).width(), maxWidth: 1000 };
            var curr_width = $(this).textWidth() + options.padding;
            $(this).css({ width: Math.max(mixoriginalwidth[$(this).attr('name')], curr_width) });
        }
    }, 100));
    /******************************************************************************************************/
    general_object_index++;
}

/**********************************************DRAW********************************************/

function stepBack(itemid, buttonObj) {
    $(buttonObj).removeClass('d-none');
    let canvasObj = $('#drawable_' + itemid)[0]
    let contextObj = canvasObj.getContext('2d');
    if (canvasObj.startLineX.length < 1)
        return;

    canvasObj.startLineX.splice(-1, 1);
    canvasObj.startLineY.splice(-1, 1);
    canvasObj.endLineX.splice(-1, 1);
    canvasObj.endLineY.splice(-1, 1);
    contextObj.clearRect(0, 0, context.canvas.width, context.canvas.height);
    contextObj.beginPath();
    for (var i = 0; i < canvasObj.startLineX.length; i++) {
        contextObj.moveTo(canvasObj.startLineX[i], canvasObj.startLineY[i]);
        contextObj.lineTo(canvasObj.endLineX[i], canvasObj.endLineY[i]);
    }
    contextObj.closePath();
    contextObj.stroke();
    $(buttonObj).removeClass('d-none');
    var draw_result = { 'startxs': canvasObj.startLineX, 'startys': canvasObj.startLineY, 'endxs': canvasObj.endLineX, 'endys': canvasObj.endLineY };
    $('#' + itemid.toUpperCase()).val(JSON.stringify(draw_result));
}


const mouseMoveListener = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    //e.stopImmediatePropagation();
    context = e.target.getContext('2d');
    rect = e.target.getBoundingClientRect();
    startLineX = e.target.startLineX;
    endLineX = e.target.endLineX;
    startLineY = e.target.startLineY;
    endLineY = e.target.endLineY;
    redraw();
    context.strokeStyle = "#17a2b8";
    context.beginPath();
    for (var i = 0; i < startLineX.length; i++) {
        context.moveTo(startLineX[i], startLineY[i]);
        context.lineTo(endLineX[i], endLineY[i]);
    }
    context.closePath();
    context.stroke();
    if (isDrawing) {
        context.strokeStyle = "#ccc";
        context.beginPath();
        context.moveTo(startLineX[startLineX.length - 1], startLineY[startLineY.length - 1]);

        context.lineTo(clientX - rect.left, clientY - rect.top);
        context.stroke();
    }
}

function mouseMoveTouchListener(e) {
    e.preventDefault();
    const { clientX, clientY } = e.touches[0];

    isDrawing = !isDrawing;
    if (!isDrawing)
        return;

    context = e.target.getContext('2d');
    rect = e.target.getBoundingClientRect();
    startLineX = e.target.startLineX;
    endLineX = e.target.endLineX;
    startLineY = e.target.startLineY;
    endLineY = e.target.endLineY;
    redraw();
    context.strokeStyle = "#17a2b8";
    context.beginPath();
    for (var i = 0; i < startLineX.length; i++) {
        context.moveTo(startLineX[i], startLineY[i]);
        context.lineTo(endLineX[i], endLineY[i]);
    }
    context.closePath();
    context.stroke();
    context.strokeStyle = "#ccc";
    context.beginPath();
    context.moveTo(tempStartPointX, tempStartPointY);
    LastTouchedX = clientX - rect.left;
    LastTouchedY = clientY - rect.top;
    context.lineTo(LastTouchedX, LastTouchedY);
    context.stroke();
}

function StartZeichen(DrawResponseOptions) {
    var idx = 0;
    $('canvas').each(function () {
        canvas = $('canvas')[idx]
        StartupObjects[$(this).attr('data-var').toLowerCase()] = canvas;
        canvas.startLineX = new Array();
        canvas.startLineY = new Array();
        canvas.endLineX = new Array();
        canvas.endLineY = new Array();
        context = canvas.getContext('2d');
        rect = canvas.getBoundingClientRect();

        this.addEventListener('mousedown', liniezeichnen);
        this.addEventListener('mouseup', liniezeichnen);
        this.addEventListener('mousemove', mouseMoveListener);

        this.addEventListener('touchstart', liniezeichnenTouch);
        this.addEventListener('touchend', liniezeichnenStop);
        this.addEventListener('touchmove', mouseMoveTouchListener);

        $(this).mouseleave(function (e) {
            //alert($(this).attr('id'))
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
            for (var i = 0; i < startLineX.length; i++) {
                context.moveTo(startLineX[i], startLineY[i]);
                context.lineTo(endLineX[i], endLineY[i]);
            }
            context.closePath();
            context.stroke();
        });
        idx++;
    });
    for (const res of DrawResponseOptions) {
        const varname = res.varname;
        var currData = '';
        if (answers && answers[varname] && !editStatus) {
            decoded = editStatus ? answers[varname] : window.atob(answers[varname]);
            currData = decoded.replace("#99#", '');
        }
        $('#felder').append('<input type="text" style="display:none;" name="' + varname + '" id="' + varname.toUpperCase() + '" value="">');
        $('#' + varname).val(currData);

        if (($('#drawable_' + varname.toLowerCase()).length > 0 || $('#drawable_' + varname).length > 0) && currData.length > 0 || editStatus) {
            if (ANTWORT_VAR != '#99#') {
                const jsonAnswer = editStatus ? JSON.parse(ANTWORT_VAR) : JSON.parse(currData);
                AntwortenZeichnen(jsonAnswer, varname.toLowerCase());
            }
        }
    }

    $('canvas').each(function () {
        let item = '<span class="btn btn-ruekgengig" onClick="stepBack(\'' + $(this).attr('data-var') + '\',$(this))">löschen</span>';
        let itemwidth = $(this).width();
        $(this).wrap('<div class="draw-block" style="width:' + itemwidth + 'px;"></div>');
        $(item).insertBefore(this);
    });
}

function InitDraw(sub_template, sub_question, sub_item_config) {
    var script = document.createElement('script');
    $('#MAIN_Content').append(sub_label + '<div>' + sub_question + '</div></div>');
    $RO = jQuery.parseJSON(sub_item_config);
    DrawResponseOptions = $RO.response_options;
    if ($('script[src="../bundles/concertopanel/files/js/figur-ergaenzen.js"]').length > 0) {
        StartZeichen(DrawResponseOptions);
    }
    else {
        script.onload = function () {
            StartZeichen(DrawResponseOptions);
        }
        script.src = "../bundles/concertopanel/files/js/figur-ergaenzen.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}

function InitLenialSvg(sub_template, sub_question, sub_item_config)
{    
    const SvgResponseOptions = jQuery.parseJSON(sub_item_config).response_options;
    SvgResponseOptions.forEach(item=>{
        const itemVarName = item['varname'];
        $('#felder').append(`<input type="text" name="${itemVarName}" value="" id="${itemVarName}">`);
    });

    $('#MAIN_Content').append('<div>' + sub_question + '</div>');

    if ($('script[src="../bundles/concertopanel/files/js/svg_lineal_render.js"]').length <1) {
        
        answers = answers ? JSON.stringify(answers) : JSON.stringify([]);
        var script = document.createElement('script');
        script.src = "../bundles/concertopanel/files/js/svg_lineal_render.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    else
    {
        if(antwort)
        {
            Object.entries(antwort).forEach(([key, value]) => {
                antwort[key] = btoa(value);
            });
        }	
        replaceImagesWithSvg();
    } 
}

function InitAktivSvg(sub_template, sub_question, sub_item_config)
{       
    const SvgResponseOptions = jQuery.parseJSON(sub_item_config).response_options;
    SvgResponseOptions.forEach(item=>{
        const itemVarName = item['varname'];
        $('#felder').append(`<input type="text" name="${itemVarName}" value="" id="${itemVarName}">`);
    });

    $('#MAIN_Content').append('<div>' + sub_question + '</div>');

    if ($('script[src="../bundles/concertopanel/files/js/svg_render.js"]').length <1) {
        antwort = answers ? JSON.stringify(answers) : JSON.stringify({a:[],c:0});
        antwort = (answers.length) ? JSON.parse(answers.replace(/\n/g, '')) : {};
        var script = document.createElement('script');
        script.src = "../bundles/concertopanel/files/js/svg_render.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    else
    {
        antwort = answers ?? {};
        replaceImagesWithObjects();
    }
}

    
function reSizeTestArea(thisblock,event){
    if ( typeof update_click_loger != 'function' )
        return;
        var currName = thisblock.attr('name');
        var textvalue = thisblock.val();
    if(!texttrackerarray[currName] || texttrackerarray[currName] !=textvalue){
        update_click_loger(currName,event.which, textvalue);
        texttrackerarray[currName] = textvalue
        thisblock.css({'height':thisblock.get(0).scrollHeight,'padding':0});/**/
    }
}

function InitBruch(sub_question, sub_item_config, obj_settings)
{
    
    $RO = jQuery.parseJSON(sub_item_config);

    mainList = $('#text_input_list');
    mainList.empty();
    var obj_example = obj_settings[1];
    var specialstyle = "";
    var disabled = '';

    const inputTemplate =`
            <li class="_CLASS_">
            <div class="input-inline-container">
            <div class="frac-pop hidden" id="frag_pop__VARNAME_">
            <div class="pop-title-div">Bruch eingeben</div>

            <div><input class="ifbq-keyboard-input pop-up-div" id="up_div__VARNAME_" name="up_div__VARNAME_" value="" /></div>

            <hr class="pop-hr" />
            <div><input class="ifbq-keyboard-input pop-down-div" id="down_div__VARNAME_" name="down_div__VARNAME_" value="" /></div>

            <div><span class="pop-down-btn" data-option="_VARNAME_"  data-index="${general_object_index}" onclick="setFraction(this,true)">Abbrechen</span> <span class="pop-down-btn" data-option="_VARNAME_"  data-index="${general_object_index}" onclick="setFraction(this)">OK</span></div>
            </div>

            <div autocapitalize="off" autocomplete="off" autocorrect="off" data-index="${general_object_index}" class="ifbq-keyboard-input div-input input-var-item colors-haburg-blau-color colors-haburg-blau-bg" contenteditable="true" data-option="_VARNAME_" id="text_input_var_item__VARNAME_" placeholder=" ">_VARVAL_</div>
                    
            <div class="sup-sub" id="knopf_sup_sub__VARNAME_">
            <div 
                class="teil format-but hidden" 
                data-option="_VARNAME_" 
                id="ifbq_tiele__VARNAME_" 
                onmousedown="createTeil(event,this,'teil');"
            >
                <svg height="20" viewbox="0 0 110 100" width="20" xmlns="http://www.w3.org/2000/svg"> <rect fill="white" height="30" stroke="gray" stroke-width="2" width="40" x="30" y="10"></rect> <line stroke="black" stroke-width="4" x1="20" x2="80" y1="50" y2="50"></line> <rect fill="white" height="30" stroke="gray" stroke-width="2" width="40" x="30" y="60"></rect> </svg>
            </div>
            </div>
            <textarea class="hidden" id="input_var_item__VARNAME_" name="_VARNAME_">_VARVALENC_</textarea></div>
            </li>`;

    mainList.append('<ol class="check-box-list" id="resulttext' + general_object_index + '" type=""></ol>')
    
    var list_class = ($RO.response_options.length > 1) ? '' : 'oneline';

    $.each($RO.response_options, function (key, data) {
        var var_value = allAnswers && allAnswers[data.varname] ? b64_to_utf8(allAnswers[data.varname]).replace('#99#', '') : '';
       if (obj_example.length > 0) {
            var_value = obj_example;
            specialstyle = 'style="color:black;background-color:#CFCFCF;display: block;"'
            disabled = 'disabled';
        }
        const itemItem = inputTemplate.replace('_CLASS_',list_class)
            .replace(/_VARNAME_/g,data.varname)
            .replace(/_VARVAL_/g,(var_value.trim())+' ')
            .replace(/_VARVALENC_/g,var_value);

        $('#resulttext' + general_object_index).append(itemItem);

    });

    $('#MAIN_Content').append(sub_label + '<div ' + specialstyle + '>' + sub_question + mainList.html() + '</div>');
    
    replaceWithBreak();

    general_object_index++;

    $('up-div').attr('contenteditable', 'false');    
    $('down-div').attr('contenteditable', 'false');
    setClickableFraction();
    const editor = document.querySelector('[contenteditable="true"]');
    new ContentEditableHandler(editor);

    $('.input-var-item').on('focus', function () {
        keyboardMode = this.getAttribute('contenteditable') === 'true'
            ? "contentEditable" 
            : "default";
        setlContainerZeigenInput(this.id);
    });
}

function replaceWithBreak()
{
    document.getElementById('MAIN_Content').addEventListener('keydown', (e) => {
        if (e.target.contentEditable === 'true' && e.key === 'Enter') {
          e.preventDefault();
      
          const selection = window.getSelection();
          if (!selection.rangeCount) return;

          const range = selection.getRangeAt(0);
          range.deleteContents();

          const br = document.createElement('br');
          range.insertNode(br);

          // Move cursor after the first <br>
          range.setStartAfter(br);
          range.setEndAfter(br);
          selection.removeAllRanges();
          selection.addRange(range);
        }
    });
}

/**********************************************DRAG********************************************************/

const AnhangInfos = {};
function InitDrag(sub_template, sub_question, sub_item_config) {
    $('#MAIN_Content').append(sub_label + '<div>' + sub_question + '</div></div>');
    $RO = jQuery.parseJSON(sub_item_config);
    console.log($RO)

    $('.antwort-element').each(function () {
        this.setAttribute('original', $(this).parent().attr('id'));
        if ($(this).parent().attr('data-option') && $(this).parent().attr('data-option') == 'true') {
            $(this).addClass('cloner')
        }
    });

    DragDropResponseOptions = $RO.response_options;


    for (var res in DragDropResponseOptions) {
        var varname = DragDropResponseOptions[res].varname;
        const mainid = '#dragable_' + varname;
        if ($(mainid).children().length < 1)
            $(mainid).addClass('goal_block');

        var currData = '';
        if (answers && answers[varname]) {
            decoded = window.atob(answers[varname]);
            currData = decoded.replace("#99#", '');
        }

        if (!$('#' + varname).length || $('#' + varname).length <= 0) {
            if ($(mainid).hasClass('goal_block')) {
                $('#felder').append('<input type="text" style="display:none;" name="' + varname + '" id="' + varname + '">');
                $('#' + varname).val(currData);
            }
            else {
                $('#felder').append('<input type="text" style="display:none;" name="' + varname + '" id="' + varname + '" value="ifbq_nur_zumzahl">');
            }
        }
    }

    var dropoptions =
    {
        drop: function (event, ui) {
            update_click_loger($(this).attr('data-var'), 'drop', $(ui.draggable).attr('data-value'));//Ziehl-Ursprung
            const attrAnzahlablage = $(this).attr('data-anzahl');
            const CurrentChild = $(this).children().length ? $(this).children()[0] : null;
            const OriginalParent = $(CurrentChild).attr('original');
            const ist_ziehl = $(this).hasClass('goal_block');
            const aktuelleKinder = Object.entries($(this).context.childNodes).map((kind) => {
                return $(kind[1]).attr('data-value')
            })
            if ($(ui.helper).hasClass('ablagestart') && $(ui.helper).hasClass('cloner') && ist_ziehl) {
                $(this).append(ui.draggable.clone().removeClass('ablagestart'));
            }
            else if (ist_ziehl || $(this).attr('id') != $(ui).attr('original')) {
                $(this).append(ui.draggable);
            }
            else {
                $(this).append(ui.draggable.addClass('ablagestart'));
            }

            if (CurrentChild && attrAnzahlablage && ist_ziehl) {
                if (attrAnzahlablage && parseInt(attrAnzahlablage) < $(this).children().length) {
                    //antwortAuslassen(CurrentChild)
                    //$(CurrentChild).remove();
                }
            }
            resetAllValues(ui.draggable);
        },
        accept: function (ui) {
            const isSourse = !$(this).hasClass('goal_block')
                && $(this).children().length == 0
                && $(this).attr('id') == $(ui).attr('original');

            const istZiehl = $(this).hasClass('goal_block') || isSourse;

            if (istZiehl) {
                const itemValue = $(ui).attr('data-value');
                const varname = $(this).attr('id').replace('dragable_', '');
                const bereitsHigefuegt = AnhangInfos[varname].includes(itemValue)
                //console.log(istZiehl,$(this).attr('id'),itemValue)

                const attrAnzahlablage = $(this).attr('data-anzahl');
                const wiederholbar = (typeof attrAnzahlablage !== 'undefined'
                    && attrAnzahlablage !== false
                    && attrAnzahlablage != ''
                    && parseInt(attrAnzahlablage) > 1
                );
                const acceptedChildren = wiederholbar ? $(this).children().length < parseInt(attrAnzahlablage) : true;

                const dataGrenze = $(this).attr('data-grenze');
                const grenzteLlist = wiederholbar && (typeof dataGrenze !== 'undefined') ? atob(dataGrenze).split(',') : [];

                const acceptedGrenzte = grenzteLlist.length && grenzteLlist.includes(itemValue) || !grenzteLlist.length || attrAnzahlablage == 1;
                //console.log(itemValue,acceptedChildren,acceptedGrenzte,wiederholbar,attrAnzahlablage);
                return acceptedChildren && acceptedGrenzte && parseInt(attrAnzahlablage) > AnhangInfos[varname].length;// && !bereitsHigefuegt ||  ui && $(this).children().attr('data-value') == $(ui).attr('data-value') 
            }
            else {
                return false;
            }/**/
            //return istZiehl;
        },
        hoverClass: "accept",
        helper: "clone"
    };


    rebindDraggables();
    $(".ablageziel").droppable(dropoptions);

    $('.ablageziel').sortable({
        placeholder: "ui-state-highlight",
    });


    if (Object.keys(answers).length > 0) {
        $('.ablageziel').each(function (i, obj) {
            var varname = $(this).attr('data-var');
            var id = $(this).attr('id');
            var inObject = $(this).children();
            if (inObject && inObject.attr('data-value')) {
                StartupObjects.push(inObject);
            }
        });

        const usedCloner = [];
        $('.ablageziel').each(function (i, obj) {
            var varname = $(this).attr('data-var');
            var cloner = $(this).attr('data-option') == 'true'
            const ist_goal_block = $(this).hasClass('goal_block');
            var id = $(this).attr('id');
            if (answers && answers[varname]) {
                var decoded = window.atob(answers[varname]);
                var currData = decoded.replace("#99#", '')
                if (currData.length > 0) {
                    if (currData[0] == "[") {
                        const jsonData = JSON.parse(currData);
                        jsonData.forEach(element => {
                            if (ist_goal_block) {
                                usedCloner.push(varname);
                                $(this).append(GetAnswerObject(element).clone().removeClass('ablagestart'));
                                AnsweredValues.push(element);
                                const AntwortBlock = $("span[data-value='" + element + "']");
                                const parentId = AntwortBlock.attr('original');
                                if ($('#' + parentId).attr('data-option') == "false")
                                    $('#' + parentId).empty();
                            }
                        });
                    }
                    else {
                        if (ist_goal_block) {
                            $(this).append(GetAnswerObject(currData).clone().removeClass('ablagestart'));
                            AnsweredValues.push(currData);
                            const AntwortBlock = $("span[data-value='" + currData + "']");
                            const parentId = AntwortBlock.attr('original');
                            if ($('#' + parentId).attr('data-option') == "false")
                                $('#' + parentId).empty();
                        }
                    }
                }
                else {

                }
            }
        });
        rebindDraggables();

    }
    for (var res in DragDropResponseOptions) {
        const varname = DragDropResponseOptions[res].varname;
        AnhangInfos[varname] = [];
    }
}
/******************************************************************************************************/
function SetInterface(sub_variablename, sub_template, sub_question, sub_item_config, obj_settings) {
    switch (sub_template) {
        case 'tmp_text':
            AddInputTextList(sub_question, sub_item_config, obj_settings);
            //if(typeof resetKeyBoard !='undefined' && (typeof keyboardAttached =='undefined' || !keyboardAttached))
            //	resetKeyBoard();
            break;
        case 'tmp_mc':
            Add_MC(sub_template, sub_question, sub_item_config, obj_settings);
            break;
        case 'tmp_mmc':
            Add_MMC(sub_template, sub_question, sub_item_config);
            break;
        case 'tmp_inline_text':
            AddInlineText(sub_template, sub_question, sub_item_config);
            //if(typeof resetKeyBoard !='undefined' && (typeof keyboardAttached =='undefined' || !keyboardAttached))
            //	resetKeyBoard();
            break;
        case 'tmp_drag':
            InitDrag(sub_template, sub_question, sub_item_config);
            break;
        case 'tmp_draw':
            InitDraw(sub_template, sub_question, sub_item_config);
            break;
        case 'tmp_aktiv_svg':
            InitAktivSvg(sub_template, sub_question, sub_item_config);
            break;            
        case 'tmp_lineal_svg':
            InitLenialSvg(sub_template, sub_question, sub_item_config);
            break;          
        case 'tmp_text_extend':
            InitBruch(sub_question, sub_item_config, obj_settings);
            break;
        default:
            AddInlineText(sub_question);
        //if(typeof resetKeyBoard !='undefined' && (typeof keyboardAttached =='undefined' || !keyboardAttached))
        //resetKeyBoard();
    }
}

$(document).ready(function ()
{
    console.log('tmp_mix');
    xml = $("#xml_data").val();
    if (xml.length > 0)
    {
        xmlDoc = $.parseXML(xml),
        $xml = $(xmlDoc),
        MainQuestion = $xml.find('main').text();

        $('#MAIN_Content').append('<div style="display:block;margin:10px 10px 25px 10px;">' + MainQuestion + '</div>')

        $felds = $xml.find("felds");

        FiledTastatur = {};
        $.each($felds, function (i, item) {
            var sub_variablename = $(this).children('variablename').text();
            var sub_template = $(this).children('item_template').text();
            sub_label = '<div class="mix_test_item"><span CLASS="lbl_mix">' + $(this).children('obj_label').text() + ' </span>';
            var sub_question = $(this).children('question:first').text();
            var sub_item_config = $(this).children('item_config:first').text();
            var obj_settings = new Array($(this).children('obj_zrows:first').text(), $(this).children('item_example:first').text());
            const TastaturArt = $(this).children('aktive_tastatur').text();
            SetInterface(sub_variablename, sub_template, sub_question, sub_item_config, obj_settings);

            $RO = jQuery.parseJSON(sub_item_config);
            $RO.response_options.forEach((element) => {
                FiledTastatur[element.varname] = TastaturArt;
            });
        });
        $('#text_input_list').empty();
    }
});

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
function verkleinenErsteBuchstabe(word) {
    return word.charAt(0).toLowerCase() + word.slice(1);
}

/*!
* jQuery UI Touch Punch 0.2.3
*
* Copyright 2011–2014, Dave Furfero
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Depends:
*  jquery.ui.widget.js
*  jquery.ui.mouse.js
*/
!function (a) { function f(a, b) { if (!(a.originalEvent.touches.length > 1)) { a.preventDefault(); var c = a.originalEvent.changedTouches[0], d = document.createEvent("MouseEvents"); d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d) } } if (a.support.touch = "ontouchend" in document, a.support.touch) { var e, b = a.ui.mouse.prototype, c = b._mouseInit, d = b._mouseDestroy; b._touchStart = function (a) { var b = this; !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown")) }, b._touchMove = function (a) { e && (this._touchMoved = !0, f(a, "mousemove")) }, b._touchEnd = function (a) { e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1) }, b._mouseInit = function () { var b = this; b.element.bind({ touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd") }), c.call(b) }, b._mouseDestroy = function () { var b = this; b.element.unbind({ touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd") }), d.call(b) } } }(jQuery);
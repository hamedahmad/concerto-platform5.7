console.log('EDIT START v2.0.0');
let AnswreList = '';
var answeroptioncount = 0;
var varcount = 0;
var paramcount = 0;
var lesetextval = '';
var SelectedItemText = '';
var CurrZusaetsliche = '';
let bundle_has_kinder = false;
let aufgabe_has_kinder = false;
let cod_multi_has_kinder = false;
let alleFragen = [];
let CurrentMaxId = 0;
let CurrentMaxMainId = 0;
let CurrentDropMenuId = '';
let dropdowns_items = [];
let wortlist_items = [];
let searchTermIndex = 0;
let current_dropdowns_antwort_list = [];
let CurrKartHinterGrund = '#C2DEf3';
let SearchHash = null;

const editIcon='PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKICAgIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxyZWN0IHg9IjE4MS40MzEiIHk9Ii0xNC4yMSIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxIC0wLjcwNzEgMC43MDcxIDAuNzA3MSAtMTA2LjAzNjcgMjU2LjAwODQpIiBzdHlsZT0iZmlsbDojRjRBMDI2OyIgd2lkdGg9IjE0OS4xNjEiIGhlaWdodD0iNTQwLjQyMyIvPgo8cGF0aCBzdHlsZT0iZmlsbDojQ0E0NjNEOyIgZD0iTTQyMy45NjYsMTY4LjM5MWwtODAuMzIzLTgwLjMyM2wyMS42MjItMjEuNjIyYzE2LjY2Mi0xNi42NjIsNDMuNjc3LTE2LjY2Miw2MC4zMzksMGwxOS45ODQsMTkuOTg0CiAgIGMxNi42NjIsMTYuNjYyLDE2LjY2Miw0My42NzcsMCw2MC4zMzlMNDIzLjk2NiwxNjguMzkxeiIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRUZFRkVGOyIgcG9pbnRzPSIxNjEuODU5LDQzMC40MTIgNTIuODc2LDQ1OS4wOTIgODEuNTU2LDM1MC4xMDkgIi8+CjxnPgogICAKICAgICAgIDxyZWN0IHg9IjE4OC4xNDYiIHk9IjkyLjg1NCIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxIDAuNzA3MSAtMC43MDcxIDAuNzA3MSAyNDMuODAxNSAtNzguMTY3KSIgc3R5bGU9ImZpbGw6IzYxQUNEMjsiIHdpZHRoPSI1Ni4yMjIiIGhlaWdodD0iMzI0LjcxNSIvPgogICAKICAgICAgIDxyZWN0IHg9IjIyNy43NCIgeT0iMTMzLjAxMiIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxIDAuNzA3MSAtMC43MDcxIDAuNzA3MSAyODMuOTYyMyAtOTQuODA3OCkiIHN0eWxlPSJmaWxsOiM2MUFDRDI7IiB3aWR0aD0iNTcuMzY4IiBoZWlnaHQ9IjMyNC43MTUiLz4KPC9nPgo8cmVjdCB4PSIzMTAuNzg5IiB5PSIxMjEuNDk2IiB0cmFuc2Zvcm09Im1hdHJpeCgtMC43MDcxIC0wLjcwNzEgMC43MDcxIC0wLjcwNzEgNTI1LjM2NzQgNTA2LjUwMzYpIiBzdHlsZT0iZmlsbDojRUZFRkVGOyIgd2lkdGg9IjExMy41OSIgaGVpZ2h0PSI0NS44OTciLz4KPHBhdGggZD0iTTUwOC40MywzODUuNzE1TDM2Ni4xNTcsMjQzLjQ0MWw4OC4wNTMtODguMDUzYzIxLjM4OC0yMS4zODgsMjEuMzg4LTU2LjE5MSwwLTc3LjU4bC0xOS45ODQtMTkuOTg0CiAgIGMtMjEuMzkxLTIxLjM4OC01Ni4xOTEtMjEuMzg4LTc3LjU4MSwwbC04OC4wNTMsODguMDUzTDEyNi4yODYsMy41NzFjLTQuNzYyLTQuNzYtMTIuNDc4LTQuNzYtMTcuMjQxLDBMMy41NywxMDkuMDQ2CiAgIGMtNC43Niw0Ljc2LTQuNzYsMTIuNDc5LDAsMTcuMjQxbDE0Mi4zMDcsMTQyLjMwNmwtNzIuNTkxLDcyLjU5MWMtMS42NzEsMS41NDgtMi45MiwzLjU0NC0zLjUxOSw1LjgyM0w0MS4wODgsNDU1Ljk4OQogICBjLTEuMTAzLDQuMTkyLDAuMTA0LDguNjU2LDMuMTcsMTEuNzIyYzIuMzE2LDIuMzE2LDUuNDI4LDMuNTcxLDguNjIxLDMuNTcxYzEuMDM0LDAsMi4wNzUtMC4xMzIsMy4xMDEtMC40MDFsMTA4LjAzMi0yOC40MjkKICAgYzIuNDQ5LTAuNDMyLDQuNzI3LTEuNTkzLDYuNTExLTMuMzc2bDcyLjkyLTcyLjkyTDM4NS43MTUsNTA4LjQzYzIuMzgxLDIuMzgxLDUuNSwzLjU3MSw4LjYyLDMuNTcxczYuMjM5LTEuMTksOC42Mi0zLjU3MQogICBsMTA1LjQ3NC0xMDUuNDc0QzUxMy4xOTEsMzk4LjE5NSw1MTMuMTkxLDM5MC40NzYsNTA4LjQzLDM4NS43MTV6IE0xNjEuOTAxLDQxMy4yMTZsLTIzLjMyNi0yMy4zMjdsMjEyLjM3LTIxMi4zN2wyMy4zMjgsMjMuMzI2CiAgIEwxNjEuOTAxLDQxMy4yMTZ6IE00MTYuOTg2LDc1LjA2NWwxOS45ODQsMTkuOTgzYzExLjg4MiwxMS44ODMsMTEuODgyLDMxLjIxNywwLDQzLjA5OWwtMTMuMDAyLDEzLjAwMmwtNjMuMDgzLTYzLjA4MwogICBsMTMuMDAyLTEzLjAwMkMzODUuNzY2LDYzLjE4Miw0MDUuMTAzLDYzLjE4Miw0MTYuOTg2LDc1LjA2NXogTTM0My42NDMsMTA1LjMwOGw2My4wODMsNjMuMDgzbC0xNS4yMTIsMTUuMjE0bC02My4wODMtNjMuMDgzCiAgIEwzNDMuNjQzLDEwNS4zMDh6IE0yOS40MzEsMTE3LjY2Nmw4OC4yMzUtODguMjM1bDMyLjI1MiwzMi4yNTJsLTE4LjE1NCwxOC4xNTRjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0MQogICBjMi4zODEsMi4zODEsNS41LDMuNTcxLDguNjIsMy41NzFzNi4yMzktMS4xOSw4LjYyLTMuNTcxbDE4LjE1NC0xOC4xNTRsMjMuMzI2LDIzLjMyNmwtMzYuMDA1LDM2LjAwNQogICBjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0MWMyLjM4MSwyLjM4MSw1LjUsMy41NzEsOC42MiwzLjU3MXM2LjIzOS0xLjE5LDguNjItMy41NzFsMzYuMDA2LTM2LjAwNmw0My42MjcsNDMuNjI3CiAgIGwtODguMjM1LDg4LjIzNUwyOS40MzEsMTE3LjY2NnogTTMxMS4xODgsMTM3Ljc2MWwyMi41MTYsMjIuNTE2bC0yMTIuMzcsMjEyLjM3bC0yMi41MTUtMjIuNTE2TDMxMS4xODgsMTM3Ljc2MXogTTg3Ljk0NCwzNzMuNzM4CiAgIGw1MC4yODcsNTAuMjg3bC02OC4yNDcsMTcuOTU5TDg3Ljk0NCwzNzMuNzM4eiBNMzk0LjMzNSw0ODIuNTdMMjYwLjY4MSwzNDguOTE3bDg4LjIzNS04OC4yMzVsNDQuNDA1LDQ0LjQwNWwtMTguMTU0LDE4LjE1NAogICBjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0MWMyLjM4MSwyLjM4MSw1LjUsMy41NzEsOC42MiwzLjU3MWMzLjEyLDAsNi4yMzktMS4xOSw4LjYyLTMuNTcxbDE4LjE1NC0xOC4xNTRsMjMuMzI2LDIzLjMyNgogICBsLTM2LjAwNSwzNi4wMDNjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0YzIuMzgxLDIuMzgxLDUuNSwzLjU3MSw4LjYyLDMuNTcxYzMuMTIsMCw2LjIzOS0xLjE5MSw4LjYyLTMuNTcxbDM2LjAwNS0zNi4wMDMKICAgbDMxLjQ0LDMxLjQ0TDM5NC4zMzUsNDgyLjU3eiIvPjwvc3ZnPg==';


console.log('EDIT')

function  logFocus(){}

/*********************************************** HTML EDITORE***************************/

if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    // Check sender origin to be trusted
    //if (event.origin !== "<?=CONCETRO_SITE ?>") return;

    var data = event.data;      
    if (typeof(window[data.func]) == "function") {
        window[data.func].call(null, data.message,data.data);
    }
}

function parentFuncName(message,data) {
   if(message=='end_add')
    {
        window.location.reload();   
    }
}

function removeEditor() {
    SelectedIndex = -1;
    $('#wysiwyg').jqte();
    $('#dialog-modal').dialog('destroy');
}

function setSelectedClass(size)
{
  	const instr = $('.jqte_editor').text();
  	$("#dialog-modal").html('<textarea id="wysiwyg" data-origin="textarea" style="height: 113px; width: 204px;">&lt;span class="style24"&gt;zu&lt;/span&gt;</textarea>');
	$("#wysiwyg").val('<span style="font-size:'+size+'px;" class="style'+size+'">'+instr+'</span>');
  	addTinyMCE($("#wysiwyg").val())
}

function addTinyMCE(data) {
    $('#wysiwyg').val(data);
    $('#wysiwyg').jqte();
  	const s16='<div class="jqte_tool unselectable" role="button" unselectable="on" style="user-select: none;">'+
    '	<a class="jqte_tool unselectable" unselectable="on" style="user-select: none;" onclick="setSelectedClass(16)">16</a>'+
    '</div>';
    const s18='<div class="jqte_tool unselectable" role="button" unselectable="on" style="user-select: none;">'+
    '	<a class="jqte_tool unselectable" unselectable="on" style="user-select: none;" onclick="setSelectedClass(18)">18</a>'+
    '</div>';
    const s24='<div class="jqte_tool unselectable" role="button" unselectable="on" style="user-select: none;">'+
    '	<a class="jqte_tool unselectable" unselectable="on" style="user-select: none;" onclick="setSelectedClass(24)">24</a>'+
    '</div>';
  	$('.jqte_toolbar').append(s16).append(s18).append(s24)

}

function changeStimulusFormat(item) {
    var index = $(item).attr('data-value');
    if ($(item).prop('checked')) {
        $('#optionvarlabel' + index).addClass('hidden');
        $('#stimulus_html_format' + index).html($('#optionvarlabel' + index).val());
        $('#stimulus_html_container' + index).removeClass('hidden');
        addHTMLData(index);
    }
    else {
        $('#optionvarlabel' + index).removeClass('hidden');
        $('#stimulus_html_container' + index).addClass('hidden');
    }
}

let SelectedIndex = -1;
function addHTMLData(index) {
    SelectedIndex = index;
    $('#dialog-modal').dialog({
        modal: true,
        show: "fade",
        hide: "fade",
        open: function () {
            addTinyMCE($('#optionvarlabel' + SelectedIndex).val())
        },
        buttons: {
            OK: function () {
                $('#optionvarlabel' + SelectedIndex).val($('#wysiwyg').val());
                $('#stimulus_html_format' + SelectedIndex).html($('#wysiwyg').val());
                if ($('#item_template').val() == 'tmp_mc') {
                    changeMCAnswerOption(SelectedIndex);
                    setAnswreList();
                }
                removeEditor();
            },
            abrechnen: function () {
                removeEditor();
            }
        }
    });
}

/*********************************************** ***************************/
function changeLabel(obj) {
    const objID = $(obj).attr('id');
    const objVal = '(' + $(obj).val() + ')';
    $('#' + objID + '_label').text(objVal);
}

function getAktuelleVarList(ID,selectedID)
{
  	let varList = `<select id="${ID}">
			<option value="">auswählen...</option>`;
	$('.algemein-option-block .variabelsblock input').each((index,input)=>
  {
		if($(input).val().length)
		{
			const Selected = selectedID && selectedID == $(input).val() ? 'selected' : '';
			varList+=`<option value="${$(input).val()}" ${Selected}>${$(input).val()}</option>`;
		}
	});
	return varList+=`</select>`;
}

function addAutoparam(data)
{
  const TextListTemplate = $('#TempTextListBlock');
  const dataZeigen_nach = data.zeigen_nach !== undefined ? data.zeigen_nach : '';
  const TextListBlock = TextListTemplate.html()
  .replace(/_ID_/g,data.idx)
  .replace(/_abhaengig_von_list_/g,getAktuelleVarList(`textlistabhaengig_von${data.idx}`,data.abhaengig_von))
  .replace(/_liste_name_/g,data.liste_name)
  .replace(/_zeigen_nach_/g,dataZeigen_nach)
  .replace(/_varname_/g, getAktuelleVarList(`textlistvanmame_ID_${data.idx}`,data.varname));
  $('.auto-block').append(TextListBlock)
}

function getNewAutoparam(TextListen)
{
	if(TextListen.length)
    {
      TextListen.forEach((element,idx)=>
      {
          element['idx'] = idx;
		  addAutoparam(element);
      });
    }
  	else
  	{
      	idx=0;
      	$('.auto-block').children().each((index,elem)=>{
        	idx= Math.max(idx,parseInt($(elem).attr('data-option'))+1)
        })
		data = {
        	idx:idx,
          	zeigen_nach :3,
          	liste_name :"",
          	abhaengig_von :"-",
          	varname :"-",
        };
      addAutoparam(data);
  	}
}

function getNewParameter(k, v)
{
    let key = (k) ? k : '';
    let value = (v) ? v : '';
    var index = ++paramcount;
    var newvar = '<div class="langer-block paramblock" id="paramblock' + index + '">';
    newvar += $('.pair-template').html()
        .replace('_param_', 'name="paramname[]" data-value="' + index + '" id="paramname' + index + '" value="' + key + '"')
        .replace('_value_', 'name="paramvalue[]" data-value="' + index + '" id="paramvalue' + index + '" value="' + value + '"')
        .replace('_RemoveVar_', index);
    newvar += "</div>";
    return newvar;
}

function getNewMMCVar(index, res_ops, res_stim)
{
    var res_op = (res_ops) ? res_ops[index] : null;
    var varname = (res_op) ? res_op.varname : '';
    var label = (res_op) ? res_op.label : '';
    var stimulusCheck = (res_stim && res_stim[index]) ? 'checked' : '';
    var stimulus_html_hidden = (res_stim && res_stim[index]) ? '' : ' hidden';
    var stimulus_text_hidden = (res_stim && res_stim[index]) ? ' hidden' : '';
    var newvar = '<div class="langer-block variabelsblock" id="variabelsblock' + index + '">';
    newvar += $('.mmc-variabels-template').html()
        .replace('_variable_', varname)
        .replace(/_IDX_/g, index)
        .replace('_loesung_options_', AnswreList)
        .replace(/_LABEL_/g,  label)
        .replace('_stimuluscheck_', stimulusCheck)
        .replace('_stimulus_html_hidden_', stimulus_html_hidden)
        .replace('_stimulus_text_hidden_', stimulus_text_hidden)
        .replace('_block_num_v_', (index + 1))
        .replace('_block_num_s_', (index + 1));
    newvar += "</div>";
    return newvar;
}

function getNewMCAnswer(index, ans_op, res_stim) {
    var label = (ans_op) ? ans_op : '';
    var stimulusCheck = (res_stim && res_stim[index - 1]) ? ' checked' : '';
    var stimulus_html_hidden = (res_stim && res_stim[index - 1]) ? '' : ' hidden';
    var stimulus_text_hidden = (res_stim && res_stim[index - 1]) ? ' hidden' : '';
    var newvar = '<div class="langer-block answerblock" id="answerblock' + index + '">';
    newvar += $('.mc-all-answer').html()
        .replace('_stimulus_', 'name="optionanswer[]" data-value="' + index + '" id="optionvarlabel' + index + '" onKeyup="changeMCAnswerOption(' + index + ');" value="' + label + '"')
        .replace('_html_stimulus_', 'id="html_stimulus_' + index + '" data-value="' + index + '" ' + stimulusCheck)
        .replace('_stimulus_html_hidden_', stimulus_html_hidden)
        .replace('_stimulus_text_hidden_', stimulus_text_hidden)
        .replace('_stimulus_html_formated_text_', label)
        .replace('_stimulus_html_format_', 'id="stimulus_html_format' + index + '" data-value="' + index + '"')
        .replace('_stimulus_html_container_', 'id="stimulus_html_container' + index + '" data-value="' + index + '"')
        .replace('_RemoveVar_', index)
        .replace('_htmlindex_', index)
        .replace('_block_num_a_', index);
    newvar += "</div>";
    AnswreList += '<option class="answerlistitem' + index + '" value="' + index + '">' + label + '</option>';
    $('.answertoptionlist').html(AnswreList);
    return newvar;
}

function getNewMMCAnswer(index, ans_op, lbl) {
    var newAnswer = '<div class="kleiner-block" id="answerblock' + index + '">';
    newAnswer += $('.answer-option-list_template').html()
        .replace('_block_num_a_', lbl)
        .replace(/_IDX_/g, index)
        .replace('_ANS_OP_', ans_op)
    newAnswer += "</div>";
    return newAnswer;
}

function getNewMixBlock(index, varname, label, zeile_nummer) {
    var newItem = '<div class="langer-block variabelsblock" id="variabelsblock' + index + '">';
    newItem += $('.mix-template').html()
        .replace('_vanmame_', 'name="vanmame[]" data-value="' + index + '" id="vanmame' + index + '" value="' + varname + '"')
        .replace('_label_', 'name="label[]" id="label' + index + '" value="' + label + '"')
        .replace('_zeilennummer_', 'name="zeile_nummer[]" data-value="' + index + '" id="zeile_nummer' + index + '" value="' + zeile_nummer + '"')
        .replace('_RemoveVar_', index)
    newItem += "</div>";
    return newItem;
}

function getNewAlgemeinBlock(index, varname, label) {
    var newVar = '<div class="kleiner-block variabelsblock" id="variabelsblock' + index + '">';
    newVar += $('.algemein-template').html()
        .replace('_vanmame_', 'name="vanmame[]" id="vanmame' + index + '" value="' + varname + '"')
        .replace('_block_num_v_', index)
        .replace('_RemoveVar_', index)
    newVar += "</div>";
    return newVar;
}

function setAnswreList() {
    AnswreList = "";
    var index = 0
    $('input[name^="answerlbl"]').each(function () {
        index++;
        $(this).attr('data-value', index);
        AnswreList += '<option class="answerlistitem' + index + '" value="' + (index + 1) + '">' + $(this).val() + '</option>';
    });
}

function setMCAnswreList() {
    AnswreList = "";
    var index = 0
    $('input[name^="optionanswer"]').each(function () {
        index++;
        $(this).attr('data-value', index);
        AnswreList += '<option class="answerlistitem' + index + '" value="' + index + '">' + $(this).val() + '</option>';
    });
    answeroptioncount = index;
}

function RemoveAnswerOption(index) {
    if (confirm('Sind Sie sicher dass,Sie diese Antwortmöglichkeit löchen wollen?')) {
        $('#answerblock' + index).remove();
        $('.answerlistitem' + index).remove();
        changeMMCAnswerOption();
    }
}

function RemoveVar(index) {
    if (confirm('Sind Sie sicher dass,Sie diese Variableoption löchen wollen?')) {
        $('#variabelsblock' + index).remove();
    }
}

function RemoveParameter(index) {
    if (confirm('Sind Sie sicher dass,Sie diese Parameter löchen wollen?')) {
        $('#paramblock' + index).remove();
    }
}

function RemoveAutoParameter(index) {
    if (confirm('Sind Sie sicher dass,Sie diese Autocomplete-Einstellung löchen wollen?')) {
        $('#textlistvariabelsblock' + index).remove();
    }
}

function RemoveMCAntwort(index) {
    if (confirm('Sind Sie sicher dass,Sie diese Antwort-Text löchen wollen?')) {
        $('#answerblock' + index).remove();
        setMCAnswreList();
        $('#optionanswer').html(AnswreList);
        $('#optionanswer').val($('#optionanswer').attr('data-value'));
    }
}

function changeMMCAnswerOption()
{
	const AnswerOptionArray = [];
    const AnsweredArray = [];
    let index = 0;
    $('input[name^="answerlbl"]').each(function ()
    {
        const id = $(this).attr('data-option');
        const label = $(this).val();
      	if(label =='_ANS_OP_')
          return;
        index++;
        AnswerOptionArray.push(`<option class="answerlistitem${index}" value="${id}">${label}</option>`);
    })
        
    index = 0;
    $('input[name^="answerlbl"]').each(function ()
    {
        index++;
        $(this).attr('data-option',index);
    });

    const AnsetrOptionList = AnswerOptionArray.join('');
        
    $('select[name^="optionanswer"]').each(function () {
        AnsweredArray.push($(this).val());
    });

    index = 0;
    $('select[name^="optionanswer"]').each(function ()
    {
        $(this).html(AnsetrOptionList);
        $(this).val(AnsweredArray[index]);
        index++;
    });

    index = 0;
    Array.from($('#optionanswer0')[0].children).forEach((item,idx)=>
    {
        index = idx+1;
        const clasName = $(item).attr('class')
        $('.'+clasName).attr('value',index);
    });
}

function setMMCCorrectAnswerValues() {
    $('select[name^="optionanswer"]').each(function () {
        $(this).val($(this).attr('data-value'));
    });
}

function changeMCAnswerOption(index) {
    var answervalue = $('#optionvarlabel' + index).val();
    $('.answerlistitem' + index).html(answervalue);
    setMCAnswreList();
}

    function getNewSpeedBlock(index, varname, label, speed_value) {
        var newItem = '<div class="langer-block variabelsblock" id="variabelsblock' + index + '">';
        newItem += $('.speed-template').html()
            .replace('_vanmame_', 'name="vanmame[]" data-value="' + index + '" id="vanmame' + index + '" value="' + varname + '"')
            .replace('_label_', 'name="label[]" id="label' + index + '" value="' + label + '"')
            .replace('_value_', 'name="speed_value" data-value="' + index + '" id="speed_value' + index + '" value="' + speed_value + '"')
            .replace('_RemoveVar_', index)
        newItem += "</div>";
        return newItem;
    }

function createJsonUI(tmpl, confs) {
    confblock = $('#item_configs');
    const OriginalParams = ['response_options', 'correct_answers', 'answer_options', 'stimulus'];
    var lesetextval = confs.frage_text_name;
    $('#texteditblock').hide();
    $('.hide-tmp-edit').hide();
    if (lesetextval && lesetextval.length > 0) {
        $('#lesetext_einbinden').prop('checked', true);
        $('#frage_text_name').val(lesetextval);
        $('#lesetext_block').show();
        OriginalParams.push('frage_text_name');
        OriginalParams.push('flip_temp');
    }

    const res_ops = confs.response_options;
    $('.tmp-edit-option').addClass('hidden');
    switch (tmpl) {
        case 'tmp_satz_test':
        case 'tmp_wort_test':
          var MainConfBlock = '<div class="algemein-option-block">';
          answeroptioncount = 0;
          for (var key in res_ops) {
              var res_op = res_ops[key];
              var label = res_op.label;
              var varname = res_op.varname;
              var speed_value = res_op.value;
              answeroptioncount++;
              MainConfBlock += getNewSpeedBlock(answeroptioncount, varname, label, speed_value);
          }

          MainConfBlock += '</div>';

          elmnt = $('.btn-var');
          MainConfBlock += elmnt[0]['outerHTML'];

          MainConfBlock += '<div class="parameter-block"></div>';
          elmnt = $('.btn-param');
          MainConfBlock += elmnt[0]['outerHTML'];

          MainConfBlock += '<div class="auto-block"></div>';
          confblock.append(MainConfBlock);

          $('.btn-add').click(function () {
              newOption = getNewSpeedBlock(++answeroptioncount, '', '', '', '');
              $('.algemein-option-block').append(newOption);
          });
          $('.btn-param').click(function () {
              $('.parameter-block').append(getNewParameter());
          });
          break;
        case 'tmp_mmc':
            ans_ops = confs.answer_options;
            res_ans = confs.correct_answers;
            res_stim = confs.stimulus;
            if (res_ops) {
                var MainConfBlock = '<div class="mmc-answer-option-block" style="border-top: 1px lightblue solid;">';
                for (a = 0; a < ans_ops.length; a++) {
                    MainConfBlock += getNewMMCAnswer(a, ans_ops[a], (a + 1))
                    answeroptioncount++;
                }

                MainConfBlock += "</div>";
                var elmnt = $('.btn-option');
                MainConfBlock += elmnt[0]['outerHTML'];

                MainConfBlock += '<div class="mmc-variabels-block">';
                for (r = 0; r < res_ops.length; r++) {
                    MainConfBlock += getNewMMCVar(r, res_ops, res_stim);
                    varcount++;
                }

                MainConfBlock += "</div>";
                var elmnt = $('.btn-answer');
                MainConfBlock += elmnt[0]['outerHTML'];

                MainConfBlock += '<div class="parameter-block"></div>';
                var elmnt = $('.btn-param');
                MainConfBlock += elmnt[0]['outerHTML'];

                confblock.append(MainConfBlock);
                changeMMCAnswerOption();
                Object.values(res_ans).forEach((element,idx) =>
                {                    
                    $('#optionanswer' + idx).val(element);
                    $('#optionanswer' + idx).attr('data-value', element);
                });
            }
            else {
                confblock.append(MainConfBlock);
            }

            $('.btn-option').click(function () {
                newOption = getNewMMCAnswer(answeroptioncount++, '', answeroptioncount);
                $('.mmc-answer-option-block').append(newOption);
                setMMCCorrectAnswerValues();
            });

            $('.btn-answer').click(function () {
                $('.mmc-variabels-block').append(getNewMMCVar(varcount++));
            });

            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });
        
            console.log('mmc');
            break;
        case 'tmp_mc':
            console.log('mc');
            var res_stim = confs.stimulus;
            answeroptioncount = 0;
            if (res_ops) {
                var varname = res_ops[0]['varname'];
                var res_ans = confs.correct_answers[varname];
                var MainConfBlock = '<div class="mmc-answer-option-block">';
                var AllAnswers = '<div class="mc-variabels-block">';
                for (var key in res_ops) {
                    var answeroptionval = parseInt(res_ops[key]['value']);
                    var answeroptionlbl = res_ops[key]['label'];
                    AllAnswers += getNewMCAnswer(answeroptionval, answeroptionlbl, res_stim);
                    answeroptioncount = (answeroptioncount < answeroptionval) ? answeroptionval : answeroptioncount;
                }

                AllAnswers += '</div>';
                MainConfBlock += $('.mc-answer-option').html()
                    .replace('_variable_', 'name="optionvarname" id="optionvarname" value="' + varname + '"')
                    .replace('_loesung_', 'name="optionanswer" id="optionanswer" onchange="$(this).attr(\'data-value\',$(this).val());" data-value="" class="answertoptionlist"')
                    .replace('_loesung_options_', AnswreList)

                MainConfBlock += "</div>";

                MainConfBlock += AllAnswers;

                var elmnt = $('.btn-answer');
                MainConfBlock += elmnt[0]['outerHTML'];

                MainConfBlock += '<div class="parameter-block"></div>';
                 elmnt = $('.btn-param');
                MainConfBlock += elmnt[0]['outerHTML'];

                confblock.append(MainConfBlock);
                $('#optionanswer').val(res_ans);
                $('#optionanswer').attr('data-value', res_ans);
            }
            else {

                MainConfBlock += '<div class="parameter-block"></div>';
                 elmnt = $('.btn-param');
                MainConfBlock += elmnt[0]['outerHTML'];
                confblock.append(MainConfBlock);
            }

            $('.btn-add').click(function () {
                newOption = getNewMCAnswer(++answeroptioncount, '', answeroptioncount);
                $('.mc-variabels-block').append(newOption);
                $('#optionanswer').val($('#optionanswer').attr('data-value'));
            });

            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });
            break;
        case 'tmp_mix':
            var MainConfBlock = '<div class="mix-option-block">';
            answeroptioncount = 0;
            for (var key in res_ops) {
                var res_op = res_ops[key];
                var varname = res_op.varname;
                var label = res_op.label;
                var zeile_nummer = (res_op.zeile_nummer) ? res_op.zeile_nummer : '';
                MainConfBlock += getNewMixBlock(key, varname, label, zeile_nummer);
                answeroptioncount++;
            }

            MainConfBlock += '</div>';

             elmnt = $('.btn-item');
            MainConfBlock += elmnt[0]['outerHTML'];


            MainConfBlock += '<div class="parameter-block"></div><div class="auto-block"></div>';
             elmnt = $('.btn-param');
            MainConfBlock += elmnt[0]['outerHTML'];
            confblock.append(MainConfBlock);
            $('.btn-add').click(function () {
                newOption = getNewMixBlock(++answeroptioncount, '', '', '');
                $('.mix-option-block').append(newOption);
            });

            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });
            break;
        case 'tmp_edit':
            console.log('tinyMCE1');
            questionEditor = tinyMCE.activeEditor;
            $('#texteditblock').show();
            $('.hide-tmp-edit').show();

            $('.tmp-edit-option').removeClass('hidden');
            break;
        case 'tmp_double_mc':
            let ischecked = confs.untereinander && confs.untereinander == 1 ? 'checked' : '';
            var MainConfBlock = '<div><span class="chkLabel">Untereinander?</span>';
            MainConfBlock += $('#toggle_template').html()
                .replace('_ID_', 'untereinander')
                .replace('_name_', '')
                .replace('_checked_', ischecked)
                .replace('_FORID_', 'untereinander');
            MainConfBlock += '</div><br/>';
            MainConfBlock += '<div id="jstree_frage" class="jstree-frage"></div>';

            confblock.html(MainConfBlock);
            startDoubleMC(confs.answer_options[0]);
            break;
        default:
            var MainConfBlock = '<div class="algemein-option-block">';
            answeroptioncount = 0;
            for (var key in res_ops) {
                var res_op = res_ops[key];
                var varname = res_op.varname;
                answeroptioncount++;
                MainConfBlock += getNewAlgemeinBlock(answeroptioncount, varname);

            }

            MainConfBlock += '</div>';

             elmnt = $('.btn-var');
            MainConfBlock += elmnt[0]['outerHTML'];

            MainConfBlock += '<div class="parameter-block"></div>';
            elmnt = $('.btn-param');
            MainConfBlock += elmnt[0]['outerHTML'];

            MainConfBlock += '<div class="auto-block"></div>';
            elmnt = $('.btn-auto');
            MainConfBlock += elmnt[0]['outerHTML'];
            confblock.append(MainConfBlock);

            $('.btn-add').click(function () {
                newOption = getNewAlgemeinBlock(++answeroptioncount, '', '');
                $('.algemein-option-block').append(newOption);

                if($('#item_template').val() == 'tmp_drag' || $('#item_template').val() == 'tmp_dropdown')
                {
                    $('.algemein-option-block .x').hide();
                    $('.algemein-option-block .variabelsblock input').prop('disabled',true);
                }
            });
            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });
   
            if(tmpl == 'tmp_drag' || tmpl == 'tmp_dropdown' )
            {
                $('.algemein-option-block .x').hide();
                $('.algemein-option-block .variabelsblock input').prop('disabled',true);
                $('#item_configs .btn-add').hide();
            }

            break;
    }

    for (let key in confs) {
        if (!OriginalParams.includes(key)) {
            paramcount++;
            var value = (confs[key]) ? confs[key] : '';
            if ((key!= 'einzelantwortreicht' || value == '1') && key!='tastatur' && key!="TextListen")         
                $('.parameter-block').append(getNewParameter(key, value));
        }
    }
  
  	if(confs.TextListen && confs.TextListen.length)
  		getNewAutoparam(confs.TextListen);
            
    $('.btn-auto').click(function () {
      $('.auto-block').append(getNewAutoparam([]));
    });
  	
  	if(confs.tastatur && confs.tastatur!='0')
  		setTastaturInfo(confs.tastatur);
}

function setConfiguration() {
    confblock = $('#item_configs');
    var item_template = $('#item_template').val();
    var resultConfig = { response_options: [], correct_answers: {}, answer_options: [], stimulus: []};

    if (!$('#item_config').val() || $('#item_config').val() == "") {
        $('#item_config').val('');
        return;
    }

    delete resultConfig.Untereinander;
    if ($('#einzelantwortreicht').val() == '1')
        resultConfig['einzelantwortreicht'] = 1;
    if ($('#tastatur').val() != '0')
        resultConfig['tastatur'] = $('#tastatur').val();
  	
  	if($('.auto-block .variabelsblock').length)
    {
      resultConfig['TextListen'] = [];
      $('.auto-block .variabelsblock').each((index,block)=>
      {
          const ID = $(block).attr('data-option');
          const zeigen_nach = $(`#textlistzeigen_nach${ID}`).val();
          const liste_name = $(`#textlistliste_name${ID}`).val();
          const abhaengig_von = $(`#textlistabhaengig_von${ID}`).val();
          const varname = $(`#textlistvanmame_ID_${ID}`).val();
          if(varname.length)
          {
            const data = {
              varname: varname,
              liste_name: liste_name,
              abhaengig_von: abhaengig_von,
              zeigen_nach: zeigen_nach
            }
			resultConfig['TextListen'].push(data);
          }
      });
    }
  
    switch (item_template) {			
		case 'tmp_lineal_svg':
            questionEditor = tinyMCE.activeEditor;
            $('#temporary_element').html(tinyMCE.editors[$('#question').attr('id')].getContent());
			const l_elements = $('#temporary_element').find('[data-type="lineal_svg_type"]');
        	resultConfig = { response_options: []};
            l_elements.each(function (index) {
                resultConfig.response_options.push({ varname: $(this).attr('data-option')});
            });
            break;
        case 'tmp_aktiv_svg':
            questionEditor = tinyMCE.activeEditor;
            $('#temporary_element').html(tinyMCE.editors[$('#question').attr('id')].getContent());
			const elements = $('#temporary_element').find('[data-type="svg_type"]');
        	resultConfig = { response_options: []};
            elements.each(function (index) {
                resultConfig.response_options.push({ varname: $(this).attr('data-option')});
            });
            break;
        case 'tmp_satz_test':
        case 'tmp_wort_test':
           $('input[name^="vanmame"]').each(function ()
            {
                var index = $(this).attr('data-value');
                var lbl = $('#label' + index).val();
                var speed_value = $('#speed_value' + index).val();
                var vn = $(this).val();
                let optionObject = { varname: vn, label: lbl , value: speed_value}
                resultConfig.response_options.push(optionObject);
            });

            delete resultConfig.stimulus;
            delete resultConfig.correct_answers;
            delete resultConfig.answer_options;
            break;
        case 'tmp_dropdown':
			
            resultConfig = JSON.parse($('#item_config').val())
            if ($('#einzelantwortreicht').val() == '1')
                resultConfig['einzelantwortreicht'] = 1;
			if(!resultConfig.stimulus)
              resultConfig.stimulus =[];
            $('input[name^="optionvarname"]').each(function () {
                var index = $(this).attr('data-value');
                var stim = $('#html_stimulus_' + index).prop('checked') ? 1 : 0;
                resultConfig.stimulus.push(stim);
            });

            delete resultConfig.single;
            delete resultConfig.korrektur;

            break;
        case 'tmp_mmc':
            
            $('input[name^="optionvarname"]').each(function ()
            {
                var index = $(this).attr('data-value');
                if(index == '_IDX_')
                    return;

                var varname = $(this).val();
                var label = $('#optionvarlabel' + index).val() ? $('#optionvarlabel' + index).val().replace(/"/g, "'") : "";
                var stim = $('#html_stimulus_' + index).prop('checked') ? 1 : 0;
                resultConfig.response_options.push({ varname: varname, label: label });
                resultConfig.correct_answers[varname] = $('#optionanswer' + index).val() ? $('#optionanswer' + index).val().replace(/"/g, "'") : "";
                resultConfig.stimulus.push(stim);
            });

            $('input[name^="answerlbl"]').each(function () {
              	const val = $(this).val();
              	if(val == '_ANS_OP_')
                  return;
                const answerlbl = val.length ? val.replace(/"/g, "'") : "";
                resultConfig.answer_options.push(answerlbl);
            });            
            break;
        case 'tmp_mc':

            var varname = $('#optionvarname').val();
            $('input[name^="optionanswer"]').each(function () {
                var index = $(this).attr('data-value');
                var label = $(this).val().replace(/"/g, "'");
                var value = index;
                var stim = $('#html_stimulus_' + index).prop('checked') ? 1 : 0;
                resultConfig.response_options.push({ varname: varname, value: value, label: label });
                resultConfig.stimulus.push(stim);
            });

            resultConfig.correct_answers[varname] = ($('#optionanswer').val()) ? $('#optionanswer').val().replace(/"/g, "'") : "";
            delete resultConfig.answer_options;
            break;
        case 'tmp_mix':
            $('input[name^="vanmame"]').each(function () {
                var index = $(this).attr('data-value');
                var lbl = $('#label' + index).val();
                var zeile_nummer = $('#zeile_nummer' + index).val();
                var vn = $(this).val();

                let optionObject = { varname: vn, label: lbl }

                if (zeile_nummer)
                    optionObject['zeile_nummer'] = zeile_nummer;

                resultConfig.response_options.push(optionObject);
            });

            delete resultConfig.stimulus;
            delete resultConfig.correct_answers;
            delete resultConfig.answer_options;
            break;
        case 'tmp_edit':
            questionEditor = tinyMCE.activeEditor;
            $('#temporary_element').html(tinyMCE.editors[$('#question').attr('id')].getContent());
            $('#temporary_element .text_edit_block').each(function (index) {
                resultConfig.response_options.push({ varname: requestVarName+"_" + index });
            });
            $('#temporary_element').html('');
            resultConfig['single'] = $('#single').val();
            resultConfig['korrektur'] = $('#korrektur').val();
            resultConfig['gross'] = $('#gross').val();
            delete resultConfig.stimulus;
            delete resultConfig.correct_answers;
            delete resultConfig.answer_options;
            break;
        case 'tmp_double_mc':
            var varname = $('#var_name').val();
            VariableListResult = $('#jstree_frage').jstree(true).get_json()[0];
            resultConfig['untereinander'] = $('#untereinander').prop('checked') ? 1 : 0;
            fillVariablelist(VariableListResult, resultConfig);
			
            resultConfig.answer_options.push($('#jstree_frage').jstree(true).get_json()[0].children);

            delete resultConfig.stimulus;
            delete resultConfig.correct_answers;
            delete resultConfig.single;
            delete resultConfig.korrektur;
            break;
        default:
            $('input[name^="vanmame"]').each(function () {
                var vn = $(this).val();
                resultConfig.response_options.push({ varname: vn });
            });

            delete resultConfig.stimulus;
            delete resultConfig.correct_answers;
            delete resultConfig.answer_options;
            break;
    }
	
    if ($('#frage_text_name').val() && $('#frage_text_name').val().length > 0) {
        resultConfig['frage_text_name'] = "";
        resultConfig.frage_text_name = $('#frage_text_name').val().replace(/"/g, "'");
        resultConfig['flip_temp'] = "flip";
    }

    $('input[name^="paramname"]').each(function () {//einzelantwortreicht
        var index = $(this).attr('data-value');
        var paramname = $(this).val();
        if (!resultConfig[paramname]) {
            if (paramname != 'einzelantwortreicht' || $('#einzelantwortreicht').val() == '1') {
                var paramvalue = $('#paramvalue' + index).val();
                resultConfig[paramname] = paramvalue;
            }
        }
    });

    if (!$('#frage_text_name').val() || $('#frage_text_name').val().length <= 0) {
        delete resultConfig.flip_temp;
        delete resultConfig.frage_text_name;
    }
    $('#item_config').val(JSON.stringify(resultConfig));
}

function fillVariablelist(root, resultConfig) {
    if (root.children.length > 0) {
        if (root.data.node_type == 0)
            resultConfig.response_options.push({ varname: root.text });
        $.each(root.children, function (index, value) {
            fillVariablelist(value, resultConfig);
        });
    }
}

function checkVariablesInEdito()
{
    const QuestionContent = tinyMCE.get('question').getContent();

    $('#testHtml').append('<div id="temporary_div" class="tmp-add-remove-block" style="display:none;"></div>');
    $('#temporary_div').html(QuestionContent);

    answeroptioncount = 0;
    $('.algemein-option-block').empty();
    $('#temporary_div .ablageziel').each(function() {
        const this_var_name = $(this).attr('data-var');
        const newOption = getNewAlgemeinBlock(++answeroptioncount, this_var_name);
        $('.algemein-option-block').append(newOption);
    })

    $('#testHtml .tmp-add-remove-block').remove();
}

function getCssStyle(styles,attrAnzahlablage)
{
    const splitted = styles.split(';');
	let widthdthCss = false;
  
    const result = splitted.filter((item)=>{
        const doupleSplited = item.split(':');
        if(attrAnzahlablage !='1')
        {
            widthdthCss = doupleSplited[0].trim() != 'min-height' && doupleSplited[0].trim() != 'min-width' && doupleSplited[0] != ''
              		&& doupleSplited[0].trim() != 'width' && doupleSplited[0].trim() != 'height' && doupleSplited[0] != ''
        }
        else
        {
            widthdthCss = doupleSplited[0].trim() != 'width' && doupleSplited[0].trim() != 'height' && doupleSplited[0] != ''
        }
		return widthdthCss && doupleSplited[0].trim() != 'background-color'
    })

    return result.length ? result.join(';')+';' : '';
}
    
/************************* TEMP-EDIT **********************************/

function ShowTextBlockSetting() {
    if ($('#item_template').val() == 'tmp_mix') {
        alert('Diese Function ist nich verfügbar mit Mix-Typ');
        return false;
    }

    questionEditor = tinyMCE.activeEditor;

    if (SelectedItemText.length < 1 && questionEditor.selection.getContent().length > 0) {
        SelectedItemText = questionEditor.selection.getContent({ format: 'text' });
        let result_block = '<span class="text_edit_block mceNonEditable" >' + SelectedItemText + '</span>';
        questionEditor.insertContent(result_block);
        SelectedItemText = '';
        return;
    }
    console.log('adding new textblock');
    questionEditor.windowManager.open({
        title: 'Erstellen Sie einen Textblock',
        width: 770,
        height: 100,
        body:
        {
            type: 'panel',
            items: [{
                type: 'input',
                name: 'block_content',
                label: 'Text'
            }]
        },
        initialData: {
            block_content: SelectedItemText
        },
        buttons: [
            {
                type: 'cancel',
                text: 'Abbrechen'
            },
            {
                type: 'submit',
                text: 'Ok',
                primary: true
            }
        ],
        onSubmit: function (api) {

            var data = api.getData();
            // Insert content when the window form is submitted
            let result_block = '<span class="text_edit_block mceNonEditable" >' + data.block_content + '</span>';
            questionEditor.insertContent(result_block);
            api.close();
        },
        onClose: function (e) {
            SelectedItemText = '';
        }
    });
}

function NumberClicked(event, obj) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    $('.orientation').hide();
    const kVal = String.fromCharCode(event.keyCode);
    const currVal = $(obj).val();

    if (parseInt(kVal) > 1 || ($(obj).val().length && parseInt(currVal + '' + kVal) > 1)) {
        $('.orientation').show();
        $('.grenze-list').show();
    }
    return true;
}

function SetKartenColor()
{
    if (document.getElementById('hitergrundfarbeT').checked == true)
    {
        color = 'white';
        $('#kartHinterGrund').val('transparent');
        $('#kartHinterGrund').attr('data-option','transparent');
        $('#kartHinterGrundFarbeBlock').addClass('hidden');
    }
    else
    {
        if($('#kartHinterGrund').attr('data-option')=='transparent')
            $('#kartHinterGrund').val('#C2DEf3');
        $('#kartHinterGrundFarbeBlock').removeClass('hidden');
        color = $('#kartHinterGrund').val();//'#C2DEf3';
    }
    //alert(tinyMCE.getInstanceById('eComment'));
    var t = tinyMCE.get(2);
  	if(t)
    	t.getBody().style.backgroundColor = color;
}

function hexToRgb(hex)
{
  if(hex.substring(0,3)!='rgb')
    return hex;
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
   : 'transparent';
}

function componentToHex(c)
{
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHexn(r, g, b)
{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const rgbToHex = (rgb) => 
{
    rgb = rgb.toLowerCase();
    if(rgb.substring(0,3)!='rgb')
        return rgb

    const rgbArray = rgb.replace('rgb','').replace('(','').replace(')','').split(',')
    const hex ='#' + rgbArray.map(x => 
    {
        const hex = componentToHex(parseInt(x.trim()))
        return hex
    }).join('')

    return hex == "#NaN000000" ? '#C2DEf3' : hex
}

function ShowDragWindow() {
    editor = tinyMCE.activeEditor;
    CurrKartGrenzeList = '';

    const tmporHtml =  '<div>'+editor.getContent()+'</div>';

    ($(tmporHtml).find('.antwort-element')).each(function (idx)
    {

        const value = $(this).attr('data-value');
        const checkedItem = CurrSelectedGrenzeList.includes(value) || CurrSelectedGrenzeList.length < 1 ? 'checked' : '';
        CurrKartGrenzeList += '<li> <label for="chklst' + idx + '">' + value + '</label> <input name="chklst' + idx + '" type="checkbox" id="chklst' + idx + '" value="' + value + '" ' + checkedItem + '>';
    });

    editor.windowManager.open({
        width: 500,
        height: 350,
        title: 'Variable Name ausfüllen',
        body: {
            type: 'panel', // The root body type - a Panel or TabPanel
            items: [ // A list of panel components
                {
                    type: 'htmlpanel',
                    height: 300,
                    forced_root_block: false,
                    name: '',
                    label: '',
                    html: '<div class="karte-info">' +
                        '   <input type="hidden" id="alt_drag_var" name="alt_drag_var" value="' + CurrVarName + '">' +
                        '   Variable: <input class="tox-textfield" type="text" id="drag_var" name="drag_var" value="' + CurrVarName + '">' +
                        '   <div class="tox-form__controls-h-stack">' +
                        '       <div class="tox-form__group">' +
                        '           Breite: <input class="tox-textfield" type="text" name="dWidth" id="dWidth" value="' + CurrFeildWidth + '">' +
                        '       </div>' +
                        '       <div class="tox-form__group">' +
                        '           Höhe: <input class="tox-textfield" type="text" name="dHeight" id="dHeight" value="' + CurrFeildHeight + '">' +
                        '       </div>' +
                        '   </div>' +
                        '   Zusätzlicher Stil (CSS): <input class="tox-textfield" type="text" name="zusaetsliche" id="zusaetsliche" value="' + CurrZusaetsliche + '">'+
                        '   <div class="' + HiddenZiehlData + ' keine-karte">' +
                        '       <div class="tox-form__group">' +
                        '           Anzahl der Karten im Feld: <input class="tox-textfield" type="text" name="anzahlablage" id="anzahlablage" onkeypress ="return NumberClicked(event,this);" value="' + CurrDragAnzahlablage + '">' +
                        '       </div>' +
                        '       <div class="orientation keine-karte tox-form__group ' + HiddenOrientation + '">' +
                        '           Erweiterung Richtung:<br/> <input type="radio" name="erweiterung" id="erweiterungH" ' + CurrDragOrientationH + '><label for="erweiterungH">&#8609; Waagerecht</label> <input type="radio" name="erweiterung" id="erweiterungV" ' + CurrDragOrientationV + '><label for="erweiterungV">&#8608; Senkrecht</label>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>' +
                        '<div class="grenze-list ' + HiddenZiehlData + ' keine-karte" >' +
                        'Akzeptierte Karten:' +
                        CurrKartGrenzeText +
                        '<ul class="in-list">' +
                        CurrKartGrenzeList +
                        '</ul>' +
                        '</div>' +
                        '<div class="karte">' +
                        '   <p>Mit Karte: <input type="checkbox" name="mitkart" id="mitkart" ' + CurrKartMitKarte + '></p>' +
                        '   <div style="height:280px;">' +
                        '	    <div id="dwert" style="display:none;height:280px;' + CurrKartZuShau + '">' +
                        '           <!--p>Mit einem Container: <input type="checkbox" name="mitcontainer" id="mitcontainer" ' + CurrKartMitContainer + '></p-->' +
                        '           <p>Unendlich nutzbar: <input type="checkbox" name="unendlich" id="unendlich" ' + CurrDragIsUnEndlich + '></p>' +
                        '           <p>Transparenter Kartenhintergrund: <input type="checkbox" onchange="SetKartenColor();" name="hitergrundfarbe" id="hitergrundfarbeT" ' + CurrDragHintergrundT + '></p>' +
                        '           <p id="kartHinterGrundFarbeBlock" class="hidden">Kartenhintergrundfarbe: <input type="color" onblur="SetKartenColor();" name="kartHinterGrund" id="kartHinterGrund" value="' + CurrKartHinterGrund + '"> <svg width="24" height="24"><path d="M3.5 12.5c.5.8 1.1 1.6 1.8 2.3 2 2 4.2 3.2 6.7 3.2s4.7-1.2 6.7-3.2a16.2 16.2 0 002.1-2.8 15.7 15.7 0 00-2.1-2.8c-2-2-4.2-3.2-6.7-3.2a9.3 9.3 0 00-6.7 3.2A16.2 16.2 0 003.2 12c0 .2.2.3.3.5zm-2.4-1l.7-1.2L4 7.8C6.2 5.4 8.9 4 12 4c3 0 5.8 1.4 8.1 3.8a18.2 18.2 0 012.8 3.7v1l-.7 1.2-2.1 2.5c-2.3 2.4-5 3.8-8.1 3.8-3 0-5.8-1.4-8.1-3.8a18.2 18.2 0 01-2.8-3.7 1 1 0 010-1zm12-3.3a2 2 0 102.7 2.6 4 4 0 11-2.6-2.6z" fill-rule="nonzero"></path></svg></p>' +
                        '		    <p>Kartewert: <input type="text" name="karteval" id="karteval" value="' + CurrKartValue + '"></p>' +
                        '		    <textarea id="werteditor"></textarea>' +
                        '	    </div>' +
                        '	</div>' +
                        '</div>'
                }
            ]
        },
        buttons: [
            {
                type: 'cancel',
                text: 'Abbrechen'
            },
            {
                type: 'submit',
                text: 'Ok',
                primary: true
            }
        ],
        onSubmit: function (api) {

            
            if ($('#mitkart').is(":checked") && !$('#karteval').val().length)
            {
                alert('Die Kartewert ist leer\n Bitte geben Sie sie eine Ergenzung');
                return false;
            }

            var dWidth = $('#dWidth').val();
            var dHeight = $('#dHeight').val();
            var zusaetsliche = $('#zusaetsliche').val();

            if (!dWidth || !dHeight || parseInt(dWidth) < 10 || parseInt(dHeight) < 10) {
                alert('Die Höhe und Breite sollen größer als 10!!');
                return false;
            }

            var dAltVarname = $('#alt_drag_var').val();
            var dVarname = $('#drag_var').val();

            if(!$('#item_configs').find('.algemein-option-block').length)
                $('#item_configs').append('<div class="algemein-option-block"><div>');

            if(dAltVarname.length)
            {
                $('.algemein-option-block input[value="'+dAltVarname+'"]').val(dVarname);
            }
            else
            {
                const newOption = getNewAlgemeinBlock(++answeroptioncount, dVarname, '');
                $('.algemein-option-block').append(newOption);
                $('.algemein-option-block .x').hide();
                $('.algemein-option-block .variabelsblock input').prop('disabled',true);
            }

            var dVarStatus = $('#unendlich').is(":checked");
            var dVarMit = $('#mitkart').is(":checked");
            var dKarteval = $('#karteval').val();
            var dTtransparentColor = $('#kartHinterGrund').val();
            var dAnzahlablage = $('#anzahlablage').val();
            const dTtransparent = $('#hitergrundfarbeT').is(":checked") ? 'bg-transparent' : '';
            let dOriantation = 'inhaeltlich', dOrientirungH = '', dOrientirungV = '', dGrenzeItems = '';
            const grenze = [];
            $('.in-list input[type=checkbox]:checked').each(function () {
                grenze.push(this.value)
            });

            dGrenzeItems = btoa(grenze.join());

            if (dAnzahlablage != '' && parseInt(dAnzahlablage) > 1) {

                if ($('#erweiterungV').is(":checked")) {
                    dOriantation = 'vertical';
                    dOrientirungV = 'min-'
                    dOrientirungH = '';
                }
                else {
                    dOriantation = 'horizontal';
                    dOrientirungH = 'min-';
                    dOrientirungV = ''
                }
            }

            var dContent = tinymce.get("werteditor").getContent();
            var dVarKart = (dVarMit) ? '<span style="width:' + dWidth + 'px;height:' + dHeight + 'px;background-color:' + dTtransparentColor + ';"  class="antwort-element ablagestart ' + dTtransparent + '" data-value="' + dKarteval + '" >' + dContent + '</span>' : '';
            //var BGImage =(dVarMit)? '': 'background-image:url(../bundles/concertopanel/files/dragpos2.png);';					
            dObject = '<span id="dragable_' + dVarname + '"  data-option="' + dVarStatus + '" data-anzahl="' + dAnzahlablage + '" data-grenze="' + dGrenzeItems + '" data-var="' + dVarname + '"  contentEditable="false" style="' + dOrientirungH + 'width:' + dWidth + 'px !important;' + dOrientirungV + 'height:' + dHeight + 'px !important;'+zusaetsliche+'" class="ablageziel ' + dOriantation + ' mceNonEditable dragable" data-wert="' + dVarMit + '">' + dVarKart + '</span>';
            if (GlobalSelection)
                GlobalSelection.outerHTML = dObject;
            else
                editor.selection.setContent(dObject);

            GlobalSelection = null;
            CurrDragIsUnEndlich = '';
            CurrSelectedGrenze = '';
            CurrSelectedGrenzeList = [];
            CurrDragAnzahlablage = '1';
            CurrDragOrientationH = '';
            CurrDragOrientationV = '';
            CurrDragHintergrundB = 'checked';
            CurrDragHintergrundT = '';
            HiddenOrientation = 'display-none';
            HiddenZiehlData = '';
            CurrIstZieht = 'goal_block';
            CurrKartZuShau = '';
            CurrKartMitKarte = '';
            CurrKartMitContainer = '';
            CurrKartGrenzeText = '';
            CurrKartGrenzeList = '';
            CurrKarte = '';
            CurrVarName = '';
            CurrFeildWidth = '';
            CurrFeildHeight = '';
            CurrZusaetsliche = '';
            CurrKartValue = '';
            CurrKartHinterGrund = '#C2DEf3';

            SelectedDragable++;
            tinymce.remove('textarea#werteditor');
            api.close();
        },
        onCancel: function () {
            tinymce.remove('textarea#werteditor');
            GlobalSelection = null;
            CurrDragIsUnEndlich = '';
            CurrSelectedGrenze = '';
            CurrSelectedGrenzeList = [];
            CurrDragAnzahlablage = '1';
            CurrDragOrientationH = '';
            CurrDragOrientationV = '';
            CurrDragHintergrundB = 'checked';
            CurrDragHintergrundT = '';
            CurrKartZuShau = '';
            CurrKartMitKarte = '';
            CurrKartMitContainer = '';
            CurrKartGrenzeText = '';
            CurrKartGrenzeList = '';
            CurrKarte = '';
            CurrVarName = '';
            CurrFeildWidth = '';
            CurrFeildHeight = '';
            CurrZusaetsliche = '';
            CurrKartValue = '';
            CurrKartHinterGrund = '#C2DEf3';
        },
        onClose: function () {
            tinymce.remove('textarea#werteditor');
            GlobalSelection = null;
            CurrDragIsUnEndlich = '';
            CurrSelectedGrenze = '';
            CurrSelectedGrenzeList = [];
            CurrDragAnzahlablage = '1';
            CurrDragOrientationH = '';
            CurrDragOrientationV = '';
            CurrDragHintergrundB = 'checked';
            CurrDragHintergrundT = '';
            CurrKartZuShau = '';
            CurrKartMitKarte = '';
            CurrKartMitContainer = '';
            CurrKartGrenzeText = '';
            CurrKartGrenzeList = '';
            CurrKarte = '';
            CurrVarName = '';
            CurrFeildWidth = '';
            CurrFeildHeight = '';
            CurrZusaetsliche = '';
            CurrKartValue = '';
            CurrKartHinterGrund = '#C2DEf3';
        }
    });

    tinymce.init({
        selector: 'textarea#werteditor',
        menubar: false,
        height:194,
        language: 'de',
        readonly: 0,
        forced_root_block: false,
      	fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
        plugins: [
            'image', 'code', 
        ],
        toolbar: 'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | code',
        setup: function (editor) {
            editor.on('init', function () {
                klineeditorexists = true;
                if (CurrKarte) {
                    editor.setContent(CurrKarte);
                    SetKartenColor();
                }
            });
        },
    });

    $('#mitkart').click(function (e)
    {
        if (this.checked)
        {
            $('#dwert').show();
            $('.keine-karte').hide();
        }
        else
        {
            $('#dwert').hide();
            $('.keine-karte').show();
            if($('#anzahlablage').val() == '1')
                $('.orientation').hide();
        }
    });

    $('.dragable').click(function (e) {
        SelectedDragable = $(this).attr('data-value');
    });
}

/************************************DROP MENU */

function getDropMenuAntwortlist()
{
    current_dropdowns_antwort_list.forEach((item)=>{
        SetDropmenuItem(item.id);
    });
}

function saveDropHtmlData()
{
    const id = $('#dropdown_dialog_modal').attr('data-value');
    $('#drop_menu_label_' + id).val($('#dropdown_wysiwyg').val());
    $('#dropmenu_html_format_' + id).html($('#dropdown_wysiwyg').val());
    closeDropHtmlData();
}

function closeDropHtmlData()
{
    $('#dropdown_wysiwyg').jqte();
    $('.tox-button').show();
    $('#dropdown_dialog_modal').hide();
}

function ShowDropmenuFormatData(index)
{
    $('.tox-button').hide()
    $('#dropmenu_html_format_' + index).html($('#drop_menu_label_' + index).val());
    $('#dropmenu_html_container_' + index).removeClass('hidden');
    $('#drop_menu_label_' + index).addClass('hidden');
    $('#dropdown_dialog_modal').show();
    $('#dropdown_wysiwyg').val($('#drop_menu_label_' + index).val());
    $('#dropdown_wysiwyg').jqte();
}

function changeDropmenuFormat(item)
{
    var index = $(item).attr('data-value');
    $('#dropdown_dialog_modal').attr('data-value',index);

    if ($(item).prop('checked'))
    {
        ShowDropmenuFormatData(index)
    }
    else
    {
        $('#drop_menu_label_' + index).removeClass('hidden');
        $('#dropmenu_html_container_' + index).addClass('hidden');
        $('.tox-button').show();
        $('#dropdown_dialog_modal').hide();
    }
}

function RemoveDropmenuAntwort(id)
{
    current_dropdowns_antwort_list = current_dropdowns_antwort_list.filter((item)=>{
        return item.id != id;
    })
    $('#dropmenu_antwort_zeil_'+id).remove();

}

function checkDropmenuRichtig(id)
{
    if($('#drop_menu_richtig_'+id).is(":checked"))
    {
        return;
    }
    const multi = $('#dropmenu_multiJ').is(":checked");
    const existiert = $('.drop-richtig:checked').length>0;

    if(!multi && existiert)
    {
        $('.drop-richtig:checked').each(function()
        {
            $(this).prop("checked",false);
        })
    }

    SetNeuDropmenuVal(id);        
}

function checkDropmenuEditor()
{
    
    const QuestionContent = tinyMCE.get('question').getContent();
    $('#testHtml').append('<div id="temporary_div" class="tmp-add-remove-block" style="display:none;"></div>');
    $('#temporary_div').html(QuestionContent);
    
    const ExistierteVars = [];
    $('.test-drop-menu').each(function() {
        ExistierteVars.push($(this).attr('data-value'))
    });
    
    const item_config = JSON.parse($('#item_config').val());

    const response_options = item_config.response_options.filter((item)=>{return ExistierteVars.includes(item.varname)});
    const answer_options   = item_config.answer_options.filter((item)=>{return ExistierteVars.includes(Object.keys(item)[0])});
    const correct_answers = item_config.correct_answers.filter((item)=>{return ExistierteVars.includes(Object.keys(item)[0])});
  	const tastaturOption = item_config.tastatur ? item_config.tastatur : 0;

    const final_item_config = 
    {
        response_options,
        correct_answers,
        answer_options
    }

    $('#item_config').val(JSON.stringify(final_item_config));

    $('#testHtml .tmp-add-remove-block').remove();
}

function NeueDropmenuAntwort()
{
    let MaxId = ++CurrentMaxId;
    current_dropdowns_antwort_list.forEach((element) =>
    {
        MaxId = Math.max(MaxId,(element.id+1));
    });

    current_dropdowns_antwort_list.push({
        id: MaxId,
        label:'',
        wert:'',
        richtig:false,
        html:false
    })
    SetDropmenuItem(MaxId);  
}

function SetNeuDropmenuVal(id)
{
    current_dropdowns_antwort_list = current_dropdowns_antwort_list.map((item)=>
    {
        if(item.id == id)
        {
            item.wert = $('#drop_menu_wert_'+id).val();
            item.label = $('#drop_menu_label___ID__'+id).val();
            item.richtig =  $('#drop_menu_richtig_'+id).is(":checked");
            item.html  = $('#html_dropmenu_'+id).is(":checked");
        }
        return item;
    });
    $('.ok_drop_menu').hide();
}

function SetDropmenuItem(id)
{

    const AntwortBlock = '<tr data-val="__ID__" id="dropmenu_antwort_zeil___ID__">'
    +'    <td><label class="check-special" for="drop_menu_richtig___ID__" onclick="checkDropmenuRichtig(__ID__)"><input type="checkbox" class="drop-richtig" id="drop_menu_richtig___ID__" __RICHTIG__><span class="checkmark"></span></label></td>'
    +'    <td class="label-input-block"><input type="text" name="drop_menu_label[]" id="drop_menu_label___ID__"  class="tox-textfield inline-dritte label-input __HTMLSHOW__" value="">'
    +'        <div id="dropmenu_html_container___ID__" onclick="ShowDropmenuFormatData(__ID__)" data-value="__ID__" class="htmleditblockdropmenu __HTMLHIDE__">'
    +'          <span class="ui-icon ui-icon-pencil"></span><span id="dropmenu_html_format___ID__" data-value="__ID__">__LABEL__</span>'
    +'      </div>'
    +'      <label class="switch">'
    +'          <input type="checkbox" id="html_dropmenu___ID__" data-value="__ID__" onchange="changeDropmenuFormat(this)" __HTML__>'
    +'          <span class="slider"></span>'
    +'      </label>'
    +'    </td>'
    +'    <td><input type="text" class="tox-textfield inline-dritte" id="drop_menu_wert___ID__" value="__WERT__"></td>'
    +'    <td>'
    +'      <span onclick="RemoveDropmenuAntwort(__ID__)" class="tox-icon"><svg style="cursor:pointer;fill: red;border: 1px red solid;" width="24" height="24"><path d="M17.3 8.2L13.4 12l3.9 3.8a1 1 0 01-1.5 1.5L12 13.4l-3.8 3.9a1 1 0 01-1.5-1.5l3.9-3.8-3.9-3.8a1 1 0 011.5-1.5l3.8 3.9 3.8-3.9a1 1 0 011.5 1.5z" fill-rule="evenodd"></path></svg></span>'
    +'    </td>'
    +'</tr>';

    const Antwort = current_dropdowns_antwort_list.find((item)=>{
        return item.id == id
    });

    const currLabel = Antwort.label.length ? atob(Antwort.label) : '';
    let itemToShow = AntwortBlock.replace(/__ID__/g,id);
    itemToShow = itemToShow.replace(/__WERT__/g,Antwort.wert);
    itemToShow = itemToShow.replace(/__LABEL__/g,currLabel);
    itemToShow = itemToShow.replace(/__HTML__/g,Antwort.html ? 'checked' : '');
    itemToShow = itemToShow.replace(/__HTMLHIDE__/g,Antwort.html ? '' : 'hidden');
    itemToShow = itemToShow.replace(/__HTMLSHOW__/g,Antwort.html ? 'hidden' : '');
    itemToShow = itemToShow.replace(/__RICHTIG__/g,Antwort.richtig ? 'checked' : '');

    $('#DropMenuAntwortlist').append(itemToShow);
    $('#drop_menu_label_'+id).val(currLabel);
}

function getDropMenuAntwortlistAusFenster()
{
    current_dropdowns_antwort_list = [];
    let ok = true;
    let richtigOk = false;
    $('#DropMenuAntwortlist').children().each(function()
    {
        const id = $(this).attr('data-val');
        const label = $('#drop_menu_label_'+id).val();
        const wert = $('#drop_menu_wert_'+id).val();
        const richtig = $('#drop_menu_richtig_'+id).is(':checked');
        const html = $('#html_dropmenu_'+id).is(':checked');

        if(!label.length || ! wert.length)
        {
            ok = false;
        }

        if(richtig)
            richtigOk = true;

        current_dropdowns_antwort_list.push({
            id,
            label:btoa(label),
            wert,
            richtig,
            html
        })
    })

    return richtigOk
}

function setDropMenuStart()
{
    dropdowns_items = [];
    
    try
    {
        const jsonConf = $('#item_config').val() ? $('#item_config').val() : '{}'
        var confs = JSON.parse(jsonConf);

        confs.response_options.forEach((item)=>{

            const antwort_list = [];

            const richtigList = confs.correct_answers.find((rich)=>{
                return rich[item.varname]
            })

            const answer_options =  confs.answer_options.find((anatw,idx)=>{
                return anatw[item.varname];
            });

            answer_options[item.varname].forEach((ant,idx)=>{

                const richtig = richtigList[item.varname].includes(ant.wert)

                antwort_list.push({
                    id: (idx+1),
                    label: ant.label,
                    wert: ant.wert,
                    richtig: richtig,
                    html: ant.html 
                })
            })

            dropdowns_items.push({
                var_name:item.varname,
                multi:item.multi,
                trenner:item.trenner,
                keastchen:item.keastchen,
                default_val:item.default_val,
                width:item.width,
                spalten:item.spalten,
                color: item.color,
                background: item.background,                
                antwort_list : antwort_list
            })
        })
        $('#dropmenudata').val(JSON.stringify(dropdowns_items));
    }
    catch (error)
    {
        $('#item_config').css({ background: "red" });
        console.log(error);
        return
    }
}

function SetDropmenuConfigs()
{
    const response_options = [];
    const correct_answers = [];
    const answer_options = [];

    dropdowns_items.forEach((item)=>{

        response_options.push(
        {
            varname:item.var_name,
            multi:item.multi,
            keastchen:item.keastchen,
            trenner:item.trenner,
            default_val:item.default_val,
            width:item.width,
            spalten:item.spalten,
            color: item.color,
            background: item.background
        });
        const allAnwers= [];
        const allRichtig= [];
        
        item.antwort_list.forEach((ant)=>{
            if(ant.richtig)
                allRichtig.push(ant.wert);
            allAnwers.push({label:ant.label, wert:ant.wert, html:ant.html})
        })
        correct_answers.push({[item.var_name] :allRichtig}); 
        answer_options.push({[item.var_name] :allAnwers})
    })

    neueResponseOptions =
        {
            response_options,
            correct_answers,
            answer_options
        }

    $('#item_config').val(JSON.stringify(neueResponseOptions))
}

function toggleDropMenuTrenner()
{
    const isOpen = $('#dropmenu_multiJ').is(':checked')
    if(isOpen)
    {
        $('.trenner-block').removeClass('disabled');
    }
    else
    {
        $('.trenner-block').addClass('disabled');
    }
    $('#dropmenu_trenner').prop('disabled',!isOpen);
}

function ShowMarkierungSettings(item,create)
{
    const var_name = create ? '' : $(item).attr('data-option');
    const innerContent = create ? item : $(item).html();
    questionEditor = tinyMCE.activeEditor;

    console.log('eidt Markierung');
    const win = questionEditor.windowManager.open({
        title: 'Erstellen Sie einen Markierung-Textblock',
        width: 700,
        classes: 'compact-dialog',
        body:
        {
            type: 'panel',
            items: [{
                type: 'input',
                name: 'var_name',
                label: 'Variablename'
            }]
        },
        initialData: {          
            var_name: var_name
        },
        buttons: [
            {
                type: 'custom',
                text: 'Markierung entfernen',
                primary: false,
                name: 'removeButton',
                buttonType: 'secondary',
                icon: 'edit-icon',
                align: 'start'
            },            
            {    type: 'cancel',
                text: 'Abbrechen'
            },
            {
                type: 'submit',
                text: 'Ok',
                primary: true
            }
        ],
        onSubmit: function (api)
        {
            var data = api.getData();
            // Insert content when the window form is submitted
            let result_block = `<span class="markierung-item mceNonEditable" data-option="${data.var_name}">${innerContent}</span>`;
            if(!create)
            {
                const div = document.createElement('div');
                div.innerHTML = result_block;
                selectedNode.replaceWith(div);
            }                
            else
            {
                questionEditor.selection.setContent(result_block);
            }
            
            api.close();
        },
        onClose: function (e) {
            SelectedItemText = '';
        },
        onAction: (api, details) => {
            if (details.name === 'removeButton' && !create) {
                selectedNode.replaceWith(...selectedNode.childNodes);
                api.close();
            }
        },
        onRender: function(api) {
            // Add class to the dialog container after render
            const dialog = api.getContainer();
            if (dialog) {
                dialog.classList.add('compact-dialog');
                
                // Or apply styles directly
                dialog.style.height = 'auto';
                dialog.style.minHeight = '100px';
            }
        }
    });

    setTimeout(function() {
        const dialog = document.querySelector('.tox-dialog');
        if (dialog) {
            // Apply compact styles directly
            dialog.style.height = '300px';
            dialog.style.minHeight = 'auto';
            
            const body = dialog.querySelector('.tox-dialog__body');
            if (body) {
                body.style.padding = '12px 16px'
                body.style.maxHeight = '250px';
            };
            
            const formGroup = dialog.querySelector('.tox-dialog__content-js');
            if (formGroup) formGroup.style.minHeight = 'auto';
            
            const label = dialog.querySelector('.tox-label');
            if (label) {
                label.style.marginBottom = '2px';
                label.style.fontSize = '12px';
            }
            
            const input = dialog.querySelector('.tox-textfield');
            if (input) {
                input.style.padding = '4px 8px';
                input.style.height = '32px';
            }
            
            const footer = dialog.querySelector('.tox-dialog__footer');
            if (footer) footer.style.padding = '8px 16px';
        }
    }, 50);
}

function ShowDropdowns(var_name)
{
    dropdowns_items = JSON.parse($('#dropmenudata').val())
    const currentData = dropdowns_items.find((item)=> {return item.var_name == var_name});

    const data = (typeof currentData) ? currentData : null;

    if($('#item_template').val()!='tmp_dropdown')
    {
        alert('Diese Option ist nur mit tmp_dropdown verfügbar');
        return;
    }

    CurrentDropMenuDefault = data && typeof data.default_val != 'undefined' ? data.default_val : 'Bitte auswählen';
    CurrentDropMenuColor = data && typeof data.color != 'undefined' ? data.color : '#cccccc';
    CurrentDropMenuBackground = data && typeof data.background != 'undefined' ? data.background : '#add8e6';
    CurrentDropMenuWidth = data ? data.width : '200';
    CurrentDropMenuSpalten = data && data.spalten ? data.spalten : '1';
    CurrentDropMenuId = data ? data.var_name : '';
    CurrentDropMenuTrenner = data ? data.trenner : ',';
    CurrDropMenuKaestchenJ = data && data.keastchen ? 'checked' : '';
    const CurrDropMenuMultiJ = data && data.multi ? 'checked' : '';
    
    const DropItem = dropdowns_items.find((item)=>
    {
        return item.var_name == CurrentDropMenuId
    })
    
    current_dropdowns_antwort_list = DropItem ? DropItem.antwort_list : [];

 
    const htmlTempate = '<div class="drop-menu-block">'+
    '    <div class="drop-menu-varname">'+
    '       <div class="flex-container">' +
    '           <div class="tox-form__group kompakt3">' +
    '               <input type="hidden" id="alt_dropmenu_var" name="alt_dropmenu_var" value="' + CurrentDropMenuId + '">'+
    '               Variable: <input class="tox-textfield" type="text" id="dropmenu_var" name="dropmenu_var" value="' + CurrentDropMenuId + '">'+
    '           </div>'+
    '           <div class="tox-form__group kompakt3">' +
    '               Auswahltext: <input class="tox-textfield" type="text" id="dropmenu_default" name="dropmenu_default" value="' + CurrentDropMenuDefault + '">'+
    '           </div>'+
    '           <div class="tox-form__group kompakt3">' +
    '               Menübreite: <input class="tox-textfield" type="number" id="dropmenu_width" name="dropmenu_width" value="' + CurrentDropMenuWidth + '">'+
    '           </div>'+
    '           <div class="tox-form__group kompakt3">' +
    '               Spalten: <input class="tox-textfield" type="number" id="dropmenu_spalten" name="dropmenu_spalten" value="' + CurrentDropMenuSpalten + '">'+
    '           </div>'+
     '       </div>'+
    '        <div class="tox-form__group kompakt">' +
    '           Textfarbe: <input class="tox-textfield" type="color" id="dropmenu_color" name="dropmenu_color" value="' + CurrentDropMenuColor + '">'+
    '        </div>'+
    '        <div class="tox-form__group kompakt">' +
    '           Menühintergrundfarbe: <input class="tox-textfield" type="color" id="dropmenu_background" name="dropmenu_background" value="' + CurrentDropMenuBackground + '">'+
    '        </div>'+
    '       <div class="flex-container">' +
    '           <div class="tox-form__group kompakt">'+
    '               Menükästchen ausblenden: <div class="toggle-group"><input id="dropmenu_keastchen" name="dropmenu_keastchen" type="checkbox" value="1" ' + CurrDropMenuKaestchenJ + '> <label for="dropmenu_keastchen"> <span class="aural janein">JA</span> </label>' +
    '               <div aria-hidden="true" class="onoffswitch pull-right">' +
    '                   <div class="onoffswitch-label">' +
    '                           <div class="onoffswitch-inner janein"></div>' +
    '                           <div class="onoffswitch-switch"></div>' +
    '                       </div>' +
    '                   </div>' +
    '               </div>' +
    '           </div>'+
    '            <div class="tox-form__group kompakt">'+
    '               Multiantwort auszuwählen möglich:'+ 
    '               <div class="toggle-group">'+
    '                   <input id="dropmenu_multiJ" name="dropmenu_multiJ" type="checkbox" onchange="toggleDropMenuTrenner()" value="1" ' + CurrDropMenuMultiJ + '> <label for="dropmenu_multiJ"> <span class="aural janein">JA</span> </label>' +
    '                   <div aria-hidden="true" class="onoffswitch pull-right">' +
    '                       <div class="onoffswitch-label">' +
    '                           <div class="onoffswitch-inner janein"></div>' +
    '                           <div class="onoffswitch-switch"></div>' +
    '                       </div>' +
    '                   </div>' +
    '                   <span class="trenner-block disabled"> Trennzeichen: <input class="tox-textfield" type="text" id="dropmenu_trenner" name="dropmenu_trenner" value="' + CurrentDropMenuTrenner + '"></span>'+
    '               </div>' +
    '           </div>'+
    '        </div>'+
    '        <div class="tox-form__group drop-menu-antwort-list" >'+
    '            Antwortlist:'+
    '            <table class="in-list">'+
    '               <colgroup>'+
    '                   <col span="1" style="width: 7%;">'+
    '                   <col span="1" style="width: 63%;">'+
    '                   <col span="1" style="width: 23%;">'+
    '                   <col span="1" style="width: 7%;">'+
    '               </colgroup>'+
    '               <thead>'+
    '                   <tr>'+
    '                       <th>Rictig</th>'+
    '                       <th>Label</th>'+
    '                       <th>Wert</th>'+
    '                       <th></th>'+
    '                   </tr>'+
    '               </thead>'+
    '               <tbody id="DropMenuAntwortlist">'+
    '               </thead>'+
    '            </table>'+
    '        </div>'+
    '         <div class="tox-form__group">'+
    '           <span class="add-button" onclick="NeueDropmenuAntwort()">+ Antwortaddieren</span>' +
    '        </div>'+
    '    </div>'+
    '</div>';

    editor = tinyMCE.get('question');
    editor.windowManager.open({
        width: 900,
        autoScroll: false,
        autoresize_min_height: 700,
        title: 'Dropdownmenu-Verwaltung',
        body: {
            type: 'panel', // The root body type - a Panel or TabPanel
            items: [ // A list of panel components
                {
                    type: 'htmlpanel',
                    forced_root_block: "",
                    name: '',
                    label: '',
                    html: htmlTempate
                }
            ]
        },
        buttons: [
            {
                type: 'cancel',
                text: 'Abbrechen'
            },
            {
                type: 'submit',
                text: 'Ok',
                primary: true
            }
        ],
        oninit: function (api)
        {
            $('.tox-dialog').css({width: '900px !important',height: '700px !important',maxWidth:'inherit'});
        },
        onSubmit: function (api)
        {
            const var_name = $('#dropmenu_var').val();
            const default_val = $('#dropmenu_default').val();
            const trenner = $('#dropmenu_trenner').val();
            const dropMenuWidth = $('#dropmenu_width').val().length ? $('#dropmenu_width').val() : '200'; 
            const dropMenuSpalten = $('#dropmenu_spalten').val().length ? $('#dropmenu_spalten').val() : '1'; 
            const dropMenuBackground = $('#dropmenu_background').val().length ? $('#dropmenu_background').val() : '#add8e6'; 
            const dropMenuColor = $('#dropmenu_color').val().length ? $('#dropmenu_color').val() : '#ccc'; 

            if(!var_name.length)
            {
                alert('"var_name" ist pflichtig!');
                return
            }

            const currentData = dropdowns_items.filter((item)=> {return item.var_name == var_name});

            if(currentData.length !=0 && CurrentDropMenuId == '')
            {
                alert('Variable Name ist dupliziert!');
                return
            }

            if(!getDropMenuAntwortlistAusFenster())
            {
                alert('Antworten sind nicht richtig gegeben!');
                return                
            }

            if(!current_dropdowns_antwort_list.length)
            {
                alert('Keine Antworten wurden gegeben!');
                return
            }
            
            const neueDropMenu = {
                color: dropMenuColor,
                background: dropMenuBackground,
                width: dropMenuWidth,
                spalten: dropMenuSpalten,
                var_name: var_name,
                default_val: default_val,
                trenner: trenner,
                multi: $('#dropmenu_multiJ').is(':checked'),
                keastchen: $('#dropmenu_keastchen').is(':checked'),
                antwort_list: current_dropdowns_antwort_list
            }

            if(CurrentDropMenuId == '')
            {
                dropdowns_items.push(neueDropMenu)
            }
            else
            {
                dropdowns_items = dropdowns_items.map((item)=>{
                    
                    if(item.var_name == CurrentDropMenuId)
                    {
                        return neueDropMenu
                    }

                    return item;
                })
            }

            SetDropmenuConfigs();
            $('#dropmenudata').val(JSON.stringify(dropdowns_items))
            
            const dObject = '<span data-value="'+var_name+'" class="test-drop-menu" style="padding: 3px 5px; text-align: center; background:'+dropMenuBackground+' ; width: '+dropMenuWidth+'px;display:inline-block; color: '+dropMenuColor+';border:gray dashed 1px;" contentEditable="false">'+var_name+'</span>';
            tinyMCE.get('question').selection.setContent(dObject);
            api.close();
        }
    });

    $('.tox-dialog').css({width: '900px !important',height: '700px !important',maxWidth:'inherit'});
    if(DropItem)     
        getDropMenuAntwortlist();

    toggleDropMenuTrenner();
}

/*****************************************DRAW ********************* */

function ShowDrawWindow(data) {

    let CurrCanvasBGImageIn = (data.CurrCanvasBGImageIn !== undefined) ? data.CurrCanvasBGImageIn : '';
    let CurrCanvasWidthIn = (data.CurrCanvasWidthIn !== undefined) ? data.CurrCanvasWidthIn : '';
    let CurrCanvasHeightIn = (data.CurrCanvasHeightIn !== undefined) ? data.CurrCanvasHeightIn : '';
    let CurrCanvasDataVar = (data.CurrCanvasDataVar !== undefined) ? data.CurrCanvasDataVar : '';
    let CurrCanvasStrockVal = (data.CurrCanvasStrockVal !== undefined) ? data.CurrCanvasStrockVal : '3';
    editor = tinyMCE.activeEditor;
    editor.windowManager.open({
        width: 700,
        height: 500,
        title: 'Variable Name ausfüllen',
        body: {
            type: 'panel', // The root body type - a Panel or TabPanel
            items: [ // A list of panel components
                {
                    type: 'htmlpanel',
                    height: 400,
        			forced_root_block: false,
                    name: '',
                    label: '',
                    html: 'Variable: <input style="border: 1px solid gray;margin-bottom: 8px;" id="draw_var" name="draw_var" value="' + CurrCanvasDataVar + '">' +
                        $("#color_picker").html() +
                        '<p>Hintergrund Build:  <input style="border: 1px solid gray;margin-bottom: 8px;" id="draw_bg" name="draw_bg" value="' + CurrCanvasBGImageIn + '"></p>' +
                        '<p>Breite: <input style="border: 1px solid gray;margin-bottom: 8px;width:33px;" type="Text" name="dWidth" id="dWidth" value="' + CurrCanvasWidthIn + '"> ' +
                        ' Höhe: <input style="border: 1px solid gray;margin-bottom: 8px;width:33px;" type="Text" name="dHeight" id="dHeight" value="' + CurrCanvasHeightIn + '"><br>' +
                        ' Linenbreite: <input style="border: 1px solid gray;margin-bottom: 8px;width:33px;" type="Text" name="strock_val" id="strock_val" value="' + CurrCanvasStrockVal + '"></p>' +
                        '<div id="resizable" class="resizabledrwable"> </div>'
                }
            ]
        },
        buttons: [
            {
                type: 'cancel',
                text: 'Abbrechen'
            },
            {
                type: 'submit',
                text: 'Ok',
                primary: true
            }
        ],
        oninit: function (api) {
            $("#resizable").resizable();
            console.log('sss');
        },
        onSubmit: function (api) {
            var dWidth = $('#dWidth').val();
            var dHeight = $('#dHeight').val();
            if (!dWidth || !dHeight || parseInt(dWidth) < 10 || parseInt(dHeight) < 10) {
                alert('Die Höhe und Breite sollen größer als 10!!');
                return false;
            }
            var dVarname = $('#draw_var').val();
            const dStrockVal = $('#strock_val').val().length ? $('#strock_val').val() : 3;

            var dVarStatus = $('#unendlich').is(":checked");
            CurrCanvasBGImage = ($('#draw_bg').val().length < 4) ? 'none' : $('#draw_bg').val();
            var CanvasBGImage = (CurrCanvasBGImage == 'none') ? CurrCanvasBGImage : 'url(../bundles/concertopanel/files/' + CurrCanvasBGImage + ')';

            CurrCanvasBGValue = $('#resizable').css('background-color');
            dObject = '<canvas id="drawable_' + dVarname + '" data-option="' + dVarStatus + '" data-strock="' + dStrockVal + '"  width="' + dWidth + '" height="' + dHeight + '" data-img="' + CurrCanvasBGImage + '" data-value="' + CurrCanvasBGValue + '" data-var="' + dVarname + '"  contentEditable="false" style="background-color:' + CurrCanvasBGValue + ' !important;background-image:' + CanvasBGImage + ' !important;width:' + dWidth + 'px !important;height:' + dHeight + 'px !important;" class="mceNonEditable drawable"> &nbsp; </canvas>';
            if (GlobalSelection)
                GlobalSelection.outerHTML = dObject;
            else
                editor.selection.setContent(dObject);

            GlobalSelection = null;
            CurrCanvasBGValue = '';
            CurrCanvasBGImage = '';
            CurrKarte = '';
            CurrVarName = '';
            CurrCanvasWidth = '';
            CurrCanvasHeight = '';
            CurrKartValue = '';
            CurrKartHinterGrund = '#C2DEf3';
            SelectedDrawable++;
            api.close();
        },
        onCancel: function () {
            GlobalSelection = null;
            CurrCanvasBGValue = '';
            CurrCanvasBGImage = '';
            CurrKarte = '';
            CurrVarName = '';
            CurrCanvasWidth = '';
            CurrCanvasHeight = '';
            CurrKartValue = '';
            CurrKartHinterGrund = '#C2DEf3';
        },
        onClose: function () {
            GlobalSelection = null;
            CurrCanvasBGValue = '';
            CurrCanvasBGImage = '';
            CurrKarte = '';
            CurrVarName = '';
            CurrCanvasWidth = '';
            CurrCanvasHeight = '';
            CurrKartValue = '';
            CurrKartHinterGrund = '#C2DEf3';
        }
    });

    $('.drawable').click(function (e) {
        SelectedDrawable = $(this).attr('data-value');
    });

    $("#draw_bg").blur(function () {
        CurrCanvasBGImage = ($(this).val().length < 4) ? 'none' : $(this).val();
        var CanvasBGImage = (CurrCanvasBGImage == 'none') ? CurrCanvasBGImage : 'url(../bundles/concertopanel/files/' + CurrCanvasBGImage + ')';
        $('#resizable').css('background-image', CanvasBGImage);
    });

    $(".color-option").click(function (e) {
        CurrCanvasBGValue = $(this).css('background-color');
        $('#resizable').css('background-color', CurrCanvasBGValue);
    });

    $("#resizable").resizable();

    $("#resizable").width(CurrCanvasWidth);
    $("#resizable").height(CurrCanvasHeight);
    $('#resizable').css('background-color', CurrCanvasBGValue);
    $('#resizable').css('background-image', 'url(../bundles/concertopanel/files/' + CurrCanvasBGImage + ')');
    $("#resizable").resize(function () {
        $("#dWidth").val($(this).width());
        $("#dHeight").val($(this).height());
    });
}

function hideAlleBundle()
{
    $('.bundles-list').hide();
    $('.bundles-list .in-select').hide();
    $('.bundles-list .in-list').hide();
}

function hideAlleAufgabe()
{
    $('.aufgabe-list').hide();
    $('.aufgabe-list .in-select').hide();
    $('.aufgabe-list .in-list').hide();
}

function hideAlleCodMulti()
{
    $('.cod_multi-list').hide();
    $('.cod_multi-list .in-select').hide();
    $('.cod_multi-list .in-list').hide();
}

function showAlleKinder()
{
    const kindTemplate= '<div class="list-kind">__var_name__ <small>__ID__</small></div>';
    $('.bundles-list .in-list').empty();
    $('.aufgabe-list .in-list').empty();
    $('.cod_multi-list .in-list').empty();

    const bundleKinder = [];
    const aufgabeKinder = [];
    const codeMultiKinder = [];

    alleFragen.forEach((item)=>
    {
        if(item.bundle == requestQuestionId)
        {
            bundleKinder.push(item);   
            bundle_has_kinder = true;        
        }
        
      if(item.aufgabe == requestQuestionId)
        {
            aufgabeKinder.push(item);
            aufgabe_has_kinder = true;
        }
        
      if(item.cod_multi == requestQuestionId)
        {
            codeMultiKinder.push(item);
            cod_multi_has_kinder = true;
        }
    })

    if(bundle_has_kinder)
    {
        bundleKinder.sort((a,b) => {
        
            bundle_order1 = a.bundle_order ? a.bundle_order : 0 ;
            bundle_order2 = b.bundle_order ? b.bundle_order : 0 ;
            Sort = (bundle_order1 > bundle_order2) ? 1 : ((bundle_order2 > bundle_order1) ? -1 : 0)
            
            return Sort;
        });

        bundleKinder.forEach((item)=>
        {
            const kind = kindTemplate.replace('__ID__',item.id).replace('__var_name__',item.var_name) 
            $('.bundles-list .in-list').append(kind);
        });

        $('input[name="bundle_status"]').prop('disabled',true);
    }
        
    if(aufgabe_has_kinder)
    {
        aufgabeKinder.sort((a,b) => {
        
            aufgabe_order1 = a.aufgabe_order ? a.aufgabe_order : 0 ;
            aufgabe_order2 = b.aufgabe_order ? b.aufgabe_order : 0 ;
            Sort = (aufgabe_order1 > aufgabe_order2) ? 1 : ((aufgabe_order2 > aufgabe_order1) ? -1 : 0)
            
            return Sort;
        });

        aufgabeKinder.forEach((item)=>
        {
            const kind = kindTemplate.replace('__ID__',item.id).replace('__var_name__',item.var_name) 
            $('.aufgabe-list .in-list').append(kind);
        });

        $('input[name="aufgabe_status"]').prop('disabled',true);
    }

        
    if(cod_multi_has_kinder)
    {
        
        codeMultiKinder.forEach((item)=>
        {
            const kind = kindTemplate.replace('__ID__',item.id).replace('__var_name__',item.var_name) 
            $('.cod_multi-list .in-list').append(kind);
        });

        $('input[name="cod_multi_status"]').prop('disabled',true);
    }
  
    $('.bundles-list .in-list').append('<div class="list-kind addKind" onclick="editKinder(1)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
    $('.aufgabe-list .in-list').append('<div class="list-kind addKind" onclick="editKinder(2)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
    $('.cod_multi-list .in-list').append('<div class="list-kind addKind" onclick="editKinder(3)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
}

function showAlleEltern()
{
    const kindTemplate= '<option value="__ID__" _SELECTED_>__var_name__  (__ID__)</option>';
    
    alleFragen.forEach((item)=>
    {
        if(item.id != requestQuestionId && item.bundle == 0)
        {
            const selectedbu = bundle == item.id ? 'selected' : '';
            const kindbu = kindTemplate.replace(/__ID__/g,item.id).replace('__var_name__',item.var_name).replace('_SELECTED_',selectedbu)
            
            $('#bundle_eltern').append(kindbu);            
        }
        
      	if(item.id != requestQuestionId && item.aufgabe == 0)
        {
            const selectedau = aufgabe == item.id ? 'selected' : '';
            const kindau = kindTemplate.replace(/__ID__/g,item.id).replace('__var_name__',item.var_name).replace('_SELECTED_',selectedau)
            
            $('#aufgabe_eltern').append(kindau);            
        }
        
      	if(item.id != requestQuestionId && item.cod_multi == 0)
        {
            const selectecod = cod_multi == item.id ? 'selected' : '';
            const kindau = kindTemplate.replace(/__ID__/g,item.id).replace('__var_name__',item.var_name).replace('_SELECTED_',selectecod)
            
            $('#cod_multi_eltern').append(kindau);            
        }
    });

    $('#bundle_eltern').select2({
        width: 'calc(100% - 97px)', // need to override the changed default
        'min-width': '209px'
    });

    $('#bundle_eltern').on('change',function(){
        $('#bundle').val($(this).val())
    });
    $('#aufgabe_eltern').select2({
        width: 'calc(100% - 97px)', // need to override the changed default
        'min-width': '209px'
    });
    $('#aufgabe_eltern').on('change',function(){
        $('#aufgabe').val($(this).val());
    });
  

    $('#cod_multi_eltern').select2({
        width: 'calc(100% - 97px)', // need to override the changed default
        'min-width': '209px'
    });
  
    $('#cod_multi_eltern').on('change',function(){
        $('#cod_multi').val($(this).val());
    });

}

function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }

function editKinder(typ)
{
    //ite?test_session=eyJh798K6ebtsvrJBcGPb9WhfWbcsLzxYpW2655jEj2IoiNNyIsImIiOiIxMjQ4MzEiLCJjIjoiWUFNUU1KTVVORlprT0lOWVpjTWdZTU5aWk5aWU4iLCJkIjoiYnEyMV9yZXAifQ==&data_set_id=keks&question_id=10712
    iframeSrc = `fka?typ=${typ}&test_session=${requestTestSession}&data_set_id=${requestDataSet}&question_id=${requestQuestionId}`;
    $('#iframe_container').html('<iframe src="'+iframeSrc+'" class="iframe-kinder" style="width:100%;height:100%;display:block;"></iframe>');
    on();

}

function antwort_zahl_schliesen()
{
  	$('.iframe-halter').html('...');
	$('.antwort-anzahl').addClass('hidden');
}

function wortlist_zahl_schliesen()
{
    $('#WortListItems tbody').html(`<tr><td colspan="4">Keine Ergebnisse</td><tr>`);
	$('.wortlist-ueberblibk').addClass('hidden');
}

window.getAntwortUeberblick = function(e) {
    e.stopPropagation();
    const iframeSrc = `https://lernstand.hamburg.de/test/ifbq-antwort-zahl?test_session=${requestTestSession}&var_name=${requestVarName}`
    $('.iframe-halter').html('<iframe src="'+iframeSrc+'" class="iframe-kinder"></iframe>');
    $('.antwort-anzahl').removeClass('hidden');
}

function neueWortlistZeigen()
{
    $('#neueWortListtItem').addClass('opened');
}

function neueWortlistSpeichern()
{    
    const postData = {
        "test_session": requestTestSession,
        "data_set_id": requestDataSet,
        "var_name": requestVarName,
        "schreibung": $('#wSchreibung').val(),
        "score": $('#wScore').val(),
        "anmerkung": $('#wAnmerkung').val()
        };
        sendToServer('https://lernstand.hamburg.de/api/runner/test/session/' + SearchHash +'/submit',postData,wortListausfuelllne);
}

function schliesseWortlistSpeichern()
{
    $('#neueWortListtItem').removeClass('opened');
}

function scrollToElementById(element) {
    const container = document.getElementsByClassName('scrolable')[0];
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const offset = elementRect.top - containerRect.top;
    container.scrollTo({
        top: container.scrollTop + offset,
        behavior: "smooth"
    });
}

function wortListFinde()
{
    $('.highlight').removeClass('highlight');
    $('#filter-ergebnisse-wortlist').html('');
    const searchTerm = $('#wortListSearchTerm').val().toLowerCase().trim();
    const itemsFound = wortlist_items.filter((item)=>{ 
        return item.schreibung.trim().toLowerCase().includes(searchTerm) 
        || item.anmerkung.trim().toLowerCase().includes(searchTerm)
        || item.Username.trim().toLowerCase().includes(searchTerm) 
    });
    
    searchTermIndex = searchTermIndex >= itemsFound.length ? 0 : searchTermIndex;
    if(itemsFound.length > 0)
    {
        $('#filter-ergebnisse-wortlist').html('<strong>[ '+itemsFound.length+' ]</strong>  Treffer gefunden. drücke "Enter" um zum nächsten Treffer zu springen.');
        const itemFound = itemsFound[searchTermIndex];
        const element = document.getElementById(`WortItem_${itemFound.id}`);
        const schreibung = itemFound.schreibung.replace(
            new RegExp(searchTerm, 'gi'),
            (match) => `<span class="highlight">${match}</span>`
        );
        const anmerkung = itemFound.anmerkung.replace(
            new RegExp(searchTerm, 'gi'),
            (match) => `<span class="highlight">${match}</span>`
        );
        const username = itemFound.Username.replace(
            new RegExp(searchTerm, 'gi'),
            (match) => `<span class="highlight">${match}</span>`
        );

        // Update the element's inner HTML with highlighted text
        element.innerHTML = `
            <td>${schreibung}</td>
            <td>${itemFound.score}</td>
            <td>${anmerkung}</td>
            <td>${username}</td>
        `;

        scrollToElementById(element); // Scroll to the element
        itemsFound.forEach((item)=>{
            const el = document.getElementById(`WortItem_${item.id}`);
            el.classList.add('highlight');
        });        
        searchTermIndex++;
    }
    else
    {
        showToast('Keine Ergebnisse gefunden!');
    }
}

function wortListausfuelllne(items)
{
    wortlist_items = items;
    $('#neueWortListtItem').removeClass('opened');
    //console.log(items);
    if(items.length > 0)
    {
        $('#WortListItems tbody').html('');
        items.forEach((item)=>{
            $('#WortListItems tbody').append(`<tr id="WortItem_${item.id}">
                <td>${item.schreibung}</td>
                <td>${item.score}</td>
                <td>${item.anmerkung}</td>
                <td>${item.Username}</td>
                </tr>`);
        });
    }
    $('#WortListItemsBlock').removeClass('hidden');
}

window.getWortListUeberblick = function(e) {
    e.stopPropagation();
    
    const postData = {
        "test_session": requestTestSession,
        "data_set_id": requestDataSet,
        "api": 1,
        "var_name": requestVarName
        };
        
	if(SearchHash == null)
    {		
        sendToServer('https://lernstand.hamburg.de/test/ifbq-wortlist-ita/session/start',postData,wortListausfuelllne);
    }
    else
    {
        sendToServer('https://lernstand.hamburg.de/api/runner/test/session/' + SearchHash +'/submit',postData,wortListausfuelllne);
    }
}


let toastCount = 0;

function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.id = `toast-${toastCount++}`;
  
  toast.style.position = 'fixed';
  toast.style.bottom = `${20 + (toastCount * 70)}px`;
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#0aa1ed';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';
  
  document.body.appendChild(toast);
  
  setTimeout(() => { toast.style.opacity = '1'; }, 10);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function StartKeepAlivePing()
{
	setInterval(function() {
		$.ajax({
			url: 'https://lernstand.hamburg.de/test/session/' + SearchHash + '/keepalive',
			type: "POST",
			success:function(response)
			{
				//console.log('Ping successful');
			},
			error: function(xmlhttprequest, textstatus, message)
			{
				console.error('Ping failed:', message);
			}
		});
	}, 60000);
}

function sendToServer(baseUrl,postData,calback)
{
  $('.d-text').text('Daten werden gesucht...');
  
  	headers = SearchHash == null ? {} : {
	'Authorization': 'Bearer '+SearchTocken
	};
  
  postData['getAuth'] = SearchHash == null ? 1 : 0;
  const jsonString = SearchHash == null 
  	? JSON.stringify(postData) 
   	: JSON.stringify({"values":postData});
	// URL-encode the JSON string
	const encodedData = encodeURIComponent(jsonString);
	// Append the encoded data to the base URL/**/
	const fullUrl = SearchHash == null ? `${baseUrl}/${encodedData}` : baseUrl;
  $.ajax({
		url: fullUrl,
		type: "POST",
		dataType: 'JSON',
		async: true,
		data: jsonString,
		headers: headers,
		success:function(response)
		{
			try
			{
				if(response.data)
				{
				  if(SearchHash == null)
				  {
					SearchTocken = response.data.templateParams.access_token;
					SearchHash = response.hash;
					StartKeepAlivePing();
				  }
				 
				  const items = JSON.parse(response.data.templateHtml);
				  showToast(items.length +' Items wurden erfolgreich gefunden. Bitte warten Sie einen Moment, bis die Daten geladen sind.');

				  calback(items);
				  console.log(response);
				}
				else if(response.error)
				{
				   console.error(response);
				}
				else
				{
				 console.error(response);
				}
			}
			catch(ex)
			{
				showToast(JSON.stringify(ex));
			}				
		},
		error: function(xmlhttprequest, textstatus, message)
		{
			if(message.includes('Time-out'))
			  message ="Die Anfrage wurde aus Zeitgründen abgebrochen. Bitte wählen Sie eine andere Filterung.";
			showToast(message);

			if(textstatus==="timeout") {
				console.log("got timeout");
			} else {
				console.log(textstatus);
			}
		},
		complete: function() {},
		cache: false
	});	
}

function setTastaturInfo(tasteid)
{  	
	const lihtml = $('#taste'+tasteid).html();
    $('div.mm-dropdown .textfirst').html(lihtml);
    $("div.mm-dropdown .option").val(tasteid);
}


/**************************************** READY ************************************ */

$(document).ready(function () {

  
  const mainTastaturMenu = $('div.mm-dropdown .textfirst')
  var tastaturLi = $('div.mm-dropdown > ul > li.input-option')
  var tastaturInputOption = $("div.mm-dropdown .option")
  var tastatur_default_text = 'Tastatur wählen <img src="../bundles/concertopanel/files/tasteicon.png" width="40" height="20" class="down" />';

  const jsonConf = $('#item_config').val() ? $('#item_config').val() : '{}'
  const startupItemConfig = JSON.parse(jsonConf);
  
  // Animati  const mainTastaturMenu = $('div.mm-dropdown .textfirst')
  var tastaturLi = $('div.mm-dropdown > ul > li.input-option')
  var tastaturInputOption = $("div.mm-dropdown .option")
  var tastatur_default_text = 'Tastatur wählen <img src="../bundles/concertopanel/files/tasteicon.png" width="40" height="20" class="down" />';
    on  
    mainTastaturMenu.click(function() {
    mainTastaturMenu.html(tastatur_default_text);
    tastaturLi.toggle('fast');
  });

  // Insert Data
  tastaturLi.click(function() {
    // hide
    tastaturLi.toggle('fast');
    var livalue = $(this).data('value');
    var lihtml = $(this).html();
    mainTastaturMenu.html(lihtml);
    tastaturInputOption.val(livalue);
  });
  
    if (requestUpdated == '1') {
        location.replace(`itv?test_session=${requestTestSession}&data_set_id=${requestDataSet}&question_id=${requestQuestionId}`);
    }
  
    if (falshe_optionen == '1') {
        $('#falshe_optionen').show();
    }

    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $('#cb_group').val(requestCbGroup);
    $('#cod_group').val(requestCodGroup);

    $('#expandall').change(function (e) {
        e.preventDefault();
        if (!$(".ui-accordion-header").hasClass('ui-state-active')) {
            $(".ui-accordion-content").show();
            $(".ui-accordion-header").addClass('ui-accordion-header-active');
            $(".ui-accordion-header").addClass('ui-state-active');
            $(".ui-accordion-header").addClass('ui-corner-top');
            $(".ui-accordion-header").removeClass('ui-corner-all');
        }
        else {
            $(".ui-accordion-content").hide();
            $(".ui-accordion-header").removeClass('ui-accordion-header-active');
            $(".ui-accordion-header").removeClass('ui-state-active');
            $(".ui-accordion-header").removeClass('ui-corner-top');
            $(".ui-accordion-header").addClass('ui-corner-all');
        }

        return false;
    });

    $('#lesetext_einbinden').change(function (e) {
        if ($(this).prop('checked')) {
            $('#frage_text_name').val(lesetextval);
            $('#lesetext_block').show(300);
            $('#frage_text_name').show(100);
        }
        else {
            $('#frage_text_name').val('');
            $('#lesetext_block').hide(300);
            $('#frage_text_name').hide(100);
        }
    });

    $('#frage_text_name').change(function (e) {
        lesetextval = $('#frage_text_name').val();
    });

    $('#subitem_chk').change(function (e) {
        var subitem = ($(this)).prop('checked') ? 1 : 0;
        $('#subitem').val(subitem);
    });

    $('#pflichtig_chk').change(function (e) {
        var val = ($(this)).prop('checked') ? 1 : 0;
        $('#pflichtig').val(val);
    });

    $('#mit_warnung_chk').change(function (e) {
        var val = ($(this)).prop('checked') ? 1 : 0;
        $('#mit_warnung').val(val);
    });
  
	$('#pflichtig').val(startupItemConfig.pflichtig??0);
	$('#mit_warnung').val(startupItemConfig.mit_warnung??0);
  
    $('#subitem_chk').prop('checked', $('#subitem').val() == '1');
    $('#pflichtig_chk').prop('checked', $('#pflichtig').val() == '1');
    $('#mit_warnung_chk').prop('checked', $('#mit_warnung').val() == '1');
  
    $('#korrektur_chk').change(function (e) {
        var korrektur = ($(this)).prop('checked') ? 1 : 0;
        $('#korrektur').val(korrektur);
    });

    $('#gross_chk').change(function (e) {
        var gross = ($(this)).prop('checked') ? 1 : 0;
        $('#gross').val(gross);
    });

    $('#korrektur_chk').prop('checked', $('#korrektur').val() == '1');
    $('#gross_chk').prop('checked', $('#gross').val() == '1');

    $('#einzelantwortreicht_chk').change(function (e) {
        var einzelantwortreichtv = $(this).prop('checked') ? 1 : 0;
        $('#einzelantwortreicht').val(einzelantwortreichtv);
    });

    $('#einzelantwortreicht_chk').prop('checked', $('#einzelantwortreicht').val() == '1');

    $('#single_chk').change(function (e) {
        var single = ($(this)).prop('checked') ? 1 : 0;
        $('#single').val(single);
    });

    $('#single_chk').prop('checked', $('#single').val() == '1');

    var currtemplate = $('#item_template').val();

    let EditorContextMenue = "link image inserttable | cell row column deletetable markierungContext";

    if (currtemplate == 'tmp_markierung') {
        EditorContextMenue += 'markierungContext';
    }

    
    tinymce.init({
        selector: '.edit',
        height: 551,
        statusbar: false,
        forced_root_block: false,
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak texteditblock',
            'searchreplace wordcount visualblocks visualchars code fullscreen ifbq_dragables ',
            'insertdatetime media nonbreaking save table directionality noneditable ifbq_drawables ifbq_dropdown ifbq_svg',
            'emoticons template paste textpattern imagetools codesample toc'
        ],
        contextmenu: "link image inserttable | cell row column deletetable markierungSettings",
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | noneditable |code | fullscreen',
        toolbar2: ' print preview | forecolor backcolor emoticons | codesample | dynamictextblock | dragables  | drawables | dropdowns | ifbqsvg | interaktivsvg',
        image_advtab: true,
        templates: [
            { title: 'Test template 1', content: 'Test 1' },
            { title: 'Test template 2', content: 'Test 2' }
        ],
    	fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
        content_style: '.text_edit_block {background-color:lightblue}',
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tinymce.com/css/codepen.min.css'
        ],
        content_css: tinymce.baseURL + '/plugins/ifbq_dragables/custom_css.css',
        setup: function(editor) {
            editor.ui.registry.addMenuItem('markierungSettings', {
                text: 'Markierungseinstellungen',
                icon: 'settings',
                onAction: function() {
                    // Get the current clicked element (you need to store it)
                    const currentElement = editor.selection.getContent();
                    ShowMarkierungSettings(currentElement,true);
                }
            })
        },
        init_instance_callback: function (editor) {
            editor.on('Click', function (e) {
                CurrDragIsUnEndlich = '';

                CurrSelectedGrenzeList = [];
                CurrSelectedGrenze = '';
                CurrDrawIsUnEndlich = '';
                CurrDragAnzahlablage = '1';
                CurrDragOrientationH = '';
                CurrDragOrientationV = '';
                CurrDragHintergrundB = 'checked';
                CurrDragHintergrundT = '';
                HiddenOrientation = 'display-none';
                HiddenZiehlData = '';
                CurrKartZuShau = '';
                CurrKartMitKarte = '';
                CurrKartMitContainer = '';
                CurrKartGrenzeText = '';
                CurrIstZieht = 'goal_block';
                CurrKartGrenzeList = '';
                selectedNode = editor.selection.getNode();
               	if (selectedNode.className && selectedNode.className.match('markierung-item'))
                {                  	
                    editor.selection.select(selectedNode, true);
					ShowMarkierungSettings(selectedNode,false);
                }
               	else if (selectedNode.getAttribute('data-type') && selectedNode.getAttribute('data-type')== 'svg_type')
                {                  	
                    editor.selection.select(selectedNode, true);
					ShowSvgSettings(selectedNode,'svg_type');
                }
                else if (selectedNode.getAttribute('data-type') && selectedNode.getAttribute('data-type')== 'lineal_svg_type')
                {                  	
                    editor.selection.select(selectedNode, true);
					ShowSvgSettings(selectedNode,'lineal_svg_type');
                }              
                else if (selectedNode.className && selectedNode.className.match('test-drop-menu') && selectedNode.className.match('test-drop-menu').length > 0) {
                    var SelectedObj = $(selectedNode)
                    ShowDropdowns(SelectedObj.attr('data-value'));
                }
                else if (selectedNode.className && selectedNode.className.match('dragable') && selectedNode.className.match('dragable').length > 0)
                {
                    var SelectedObj = $(selectedNode)
                    CurrFeildWidth = SelectedObj.width();
                    CurrFeildHeight = SelectedObj.height();
                    const attrAnzahlablage = SelectedObj.attr('data-anzahl');
                    CurrZusaetsliche =  getCssStyle(SelectedObj.attr('style'),attrAnzahlablage);
                    CurrVarName = SelectedObj.attr('data-var');
                    CurrKartZuShau = (SelectedObj.attr('data-wert') == 'true') ? 'display:block;' : '';
                    CurrDragIsUnEndlich = (SelectedObj.attr('data-option') == 'true') ? 'checked' : '';
                    CurrIstZieht = CurrKartZuShau== '' ? '' : 'goal_block';
                    CurrSelectedGrenze = SelectedObj.attr('data-grenze') !== undefined ? SelectedObj.attr('data-grenze') : '';
                    if (CurrSelectedGrenze.length)
                        CurrSelectedGrenze = atob(CurrSelectedGrenze);
                    CurrSelectedGrenzeList = CurrSelectedGrenze.split(',');

                    if (typeof attrAnzahlablage !== 'undefined' && attrAnzahlablage !== false && attrAnzahlablage.length && attrAnzahlablage !== '1')
                    {
                        CurrDragAnzahlablage = SelectedObj.attr('data-anzahl');
                        CurrDragOrientationH = SelectedObj.hasClass('horisontal') ? 'checked' : '';
                        CurrDragOrientationV = SelectedObj.hasClass('vertical') ? 'checked' : '';
                        HiddenOrientation = '';
                    }
                    else
                    {
                        CurrKartMitKarte = (SelectedObj.attr('data-wert') == 'true') ? 'checked' : '';
                        CurrKartMitContainer = (SelectedObj.attr('data-wert') == 'true') ? 'checked' : '';
                        HiddenZiehlData = CurrKartMitKarte == '' ? '' : 'display-none';
                        HiddenContainerData = CurrKartMitContainer == 'checked' ? '' : 'display-none';
                        const hatKarte = selectedNode.children.length;
                        CurrDragHintergrundB = (!hatKarte || !$(selectedNode.children[0]).hasClass("bg-transparent")) ? 'checked' : '';
                        CurrDragHintergrundT = (hatKarte && $(selectedNode.children[0]).hasClass("bg-transparent")) ? 'checked' : '';
                        CurrKartValue = SelectedObj.children(0).attr('data-value');
                      	const tBack = typeof SelectedObj.children(0).css('background-color') =='undefined' ? '#C2DEf3' : SelectedObj.children(0).css('background-color');
                        CurrKartHinterGrund = rgbToHex(tBack);
                    }

                    CurrKarte = SelectedObj.children().html();
                    GlobalSelection = selectedNode;
                    editor.selection.select(selectedNode, true);
                    ShowDragWindow();
                }
                else if (selectedNode.className && selectedNode.className.match('drawable'))
                {
                    SelectedItemText = selectedNode.textContent;
                    var SelectedObj = $(selectedNode)
                    let CurrCanvasDataVar = SelectedObj.attr('data-var');
                    let CurrCanvasStrockVal = SelectedObj.attr('data-strock');
                    let CurrCanvasBGImageIn = SelectedObj.attr('data-img');
                    let CurrCanvasWidthIn = SelectedObj.width();
                    let CurrCanvasHeightIn = SelectedObj.height();
                    const Selecteddata =
                    {
                        CurrCanvasDataVar: CurrCanvasDataVar,
                        CurrCanvasStrockVal: CurrCanvasStrockVal,
                        CurrCanvasBGImageIn: CurrCanvasBGImageIn,
                        CurrCanvasWidthIn: CurrCanvasWidthIn,
                        CurrCanvasHeightIn: CurrCanvasHeightIn
                    }
                    ShowDrawWindow(Selecteddata);
                }
                else if (selectedNode.className && selectedNode.className.match('text_edit_block'))
                {
                    SelectedItemText = selectedNode.textContent;
                    ShowTextBlockSetting();
                }
                console.log(SelectedObj, SelectedItemText);
            });
            switch (currtemplate) {
                case 'tmp_drag':
                    $('#drawable_antwortElement').hide();
                    break;
                case 'tmp_draw':
                    $('#dragable_antwortElement').hide();
                    break;
                default:
                    $('#dragable_antwortElement').hide();
                    $('#drawable_antwortElement').hide();
            }
        }
    });

    $('#btnSave').on('click', function (e)
    {

        if($('#item_template').val() == 'tmp_drag')
        {
            checkVariablesInEdito();
        }
            
        if ($('#item_template').val() == 'tmp_dropdown')
        {
            checkDropmenuEditor();
        }        

        const bundle_status = $("input[name='bundle_status']:checked").val();
        const aufgabe_status = $("input[name='aufgabe_status']:checked").val();
        const cod_multi_status = $("input[name='cod_multi_status']:checked").val();
        
        if(bundle_status != 'bundle_einzeln')
        {
            if(bundle_status == 'bundle_eltern')
            {
                $('input[name="bundle"]').val('0');                
                $('input[name="bundle_order"]').val('');
            }
            else
            {
                $('input[name="bundle"]').val($('#bundle_eltern').val());
            }
        }
        else
        {
            $('input[name="bundle_order"]').val('');
            $('input[name="bundle"]').val('');
        }

        if(aufgabe_status != 'aufgabe_einzeln')
        {
            if(aufgabe_status == 'aufgabe_eltern')
            {
                $('input[name="aufgabe"]').val('0');
                $('input[name="aufgabe_order"]').val('');
            }
            else
            {
                $('input[name="aufgabe"]').val($('#aufgabe_eltern').val());
            }
        }
        else
        {
            $('input[name="aufgabe_order"]').val('');
            $('input[name="aufgabe"]').val('');
        }

        if(cod_multi_status != 'cod_multi_einzeln')
        {
            if(cod_multi_status == 'cod_multi_eltern')
            {
                $('input[name="cod_multi"]').val('0');
            }
            else
            {
                $('input[name="cod_multi"]').val($('#cod_multi_eltern').val());
            }
        }
        else
        {
            $('input[name="cod_multi"]').val('');
        }

        setConfiguration();
        $('#selected_id').val($('#test_id').val());
        // $('#question').val(tinymce.activeEditor.getContent());
        $('#question').val(tinyMCE.get('question').getContent());
        $('#pattern_solution').val(tinyMCE.get('pattern_solution').getContent());
    });

    try {
        const jsonConf = $('#item_config').val() ? $('#item_config').val() : '{}'
        var confs = JSON.parse(jsonConf);
        var tmp = $('#item_template').val();
        createJsonUI(tmp, confs)
    }
    catch (error) {
        $('#item_config').css({ background: "red" });
        console.log(error);
    }

    $(".ui-accordion-header").removeClass('ui-state-active');
    $('#expandall').prop('checked', true).trigger('change');

    $('.four').on('click', function (e)
    {
        const id = $(this).attr('for');
        if(!$('#'+id).prop('disabled'))
            {
            const val = $('#'+id).val();
            switch(val)
            {
                case 'bundle_einzeln' :
                    hideAlleBundle();
                break;
                case 'bundle_eltern' :
                    hideAlleBundle();
                    $('.bundles-list ').show();
                    $('.bundles-list .in-list').show();
                break;
                case 'bundle_kind' :
                    hideAlleBundle();
                    $('.bundles-list ').show();
                    $('.bundles-list .in-select').show();
                break;
                case 'aufgabe_einzeln' :
                    hideAlleAufgabe();
                break;
                case 'aufgabe_eltern' :
                    hideAlleAufgabe();
                    $('.aufgabe-list ').show();
                    $('.aufgabe-list .in-list').show();
                break;
                case 'aufgabe_kind' :
                    hideAlleAufgabe();
                    $('.aufgabe-list ').show();
                    $('.aufgabe-list .in-select').show();
                break;
                case 'cod_multi_einzeln' :
                    hideAlleCodMulti();
                break;
                case 'cod_multi_eltern' :
                    hideAlleCodMulti();
                    $('.cod_multi-list ').show();
                    $('.cod_multi-list .in-list').show();
                break;
                case 'cod_multi_kind' :
                    hideAlleCodMulti();
                    $('.cod_multi-list ').show();
                    $('.cod_multi-list .in-select').show();
                break;
            }
        }
    });

    alleFragen = JSON.parse($('#alleFragen').text());

    if(bundle == '0')
    {
        $('#bundle_eltern_radio').prop('checked',true);
        $('.bundles-list').show();
        $('.bundles-list .in-list').show();
    }
    else if(bundle != '')
    {
        $('#bundle_kind_radio').prop('checked',true)
        $('.bundles-list').show();
        $('.bundles-list .in-select').show();
    }

    if(aufgabe == '0')
    {
        $('#aufgabe_eltern_radio').prop('checked',true);
        $('.aufgabe-list').show();
        $('.aufgabe-list .in-list').show();
    }
    else if(aufgabe != '')
    {
        $('#aufgabe_kind_radio').prop('checked',true)
        $('.aufgabe-list').show();
        $('.aufgabe-list .in-select').show();
    } 

    if(cod_multi == '0')
    {
        $('#cod_multi_eltern_radio').prop('checked',true);
        $('.cod_multi-list').show();
        $('.cod_multi-list .in-list').show();
    }
    else if(cod_multi != '')
    {
        $('#cod_multi_kind_radio').prop('checked',true)
        $('.cod_multi-list').show();
        $('.cod_multi-list .in-select').show();
    } 
  
    const wahlOption = '<option value="">Wählen Sie Bitte</option>';

    $('#bundle_eltern').append(wahlOption);
    $('#aufgabe_eltern').append(wahlOption);
    $('#cod_multi_eltern').append(wahlOption);

    if(bundle == '0' || aufgabe == '0' || cod_multi == '0')
    {
        showAlleKinder();
    }

    if(VarTemplate =='tmp_dropdown')
        setDropMenuStart();

    showAlleEltern();
    
    $('#wortListSearchTerm').on('keyup', function(e) {
        if(e.key == 'Enter')
        {
            wortListFinde();
        }
        else
        {
            searchTermIndex = 0;
            $('.highlight').removeClass('highlight');
        }
    });
});

console.log('biss2')
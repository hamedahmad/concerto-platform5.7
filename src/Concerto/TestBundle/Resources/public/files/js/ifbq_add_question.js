console.log('ADDIEREN v3.4 geladen');
let VarTemplate = '';
let AnswreList = '';
let questionEditor = null;
var answeroptioncount = 0;
var varcount = 0;
var paramcount = 0;
let lesetextval = '';
let SelectedItemText = '';
var VariableListResult = {};
let CurrDragAnzahlablage = '1';
let CurrCanvasWidth = 0;
let CurrDragOrientationH = '';
let CurrDragOrientationV = '';
let CurrDragHintergrundB = 'checked';
let CurrDragHintergrundT = '';
let HiddenOrientation = 'display-none';
let HiddenZiehlData = '';
let CurrKartGrenzeText = '';
let CurrZusaetsliche = '';
let alleFragen = [];
let bundleKinder = [];
let aufgabeKinder = [];
let cod_multiKinder = [];
let dropdowns_items = [];
let current_dropdowns_antwort_list = [];
let BundleFrageList = '';
let AufgabeFrageList = '';
let cod_multiFrageList = '';
let addTyp = '1';
let CurrentMaxId = 0;
let CurrentMaxMainId = 0;
let CurrentDropMenuId = '';
let CurrentDropMenuWidth = '';
let CurrentDropMenuColor = '';
let CurrKartHinterGrund = '#C2DEf3';

const editIcon='PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKICAgIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxyZWN0IHg9IjE4MS40MzEiIHk9Ii0xNC4yMSIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxIC0wLjcwNzEgMC43MDcxIDAuNzA3MSAtMTA2LjAzNjcgMjU2LjAwODQpIiBzdHlsZT0iZmlsbDojRjRBMDI2OyIgd2lkdGg9IjE0OS4xNjEiIGhlaWdodD0iNTQwLjQyMyIvPgo8cGF0aCBzdHlsZT0iZmlsbDojQ0E0NjNEOyIgZD0iTTQyMy45NjYsMTY4LjM5MWwtODAuMzIzLTgwLjMyM2wyMS42MjItMjEuNjIyYzE2LjY2Mi0xNi42NjIsNDMuNjc3LTE2LjY2Miw2MC4zMzksMGwxOS45ODQsMTkuOTg0CiAgIGMxNi42NjIsMTYuNjYyLDE2LjY2Miw0My42NzcsMCw2MC4zMzlMNDIzLjk2NiwxNjguMzkxeiIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRUZFRkVGOyIgcG9pbnRzPSIxNjEuODU5LDQzMC40MTIgNTIuODc2LDQ1OS4wOTIgODEuNTU2LDM1MC4xMDkgIi8+CjxnPgogICAKICAgICAgIDxyZWN0IHg9IjE4OC4xNDYiIHk9IjkyLjg1NCIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxIDAuNzA3MSAtMC43MDcxIDAuNzA3MSAyNDMuODAxNSAtNzguMTY3KSIgc3R5bGU9ImZpbGw6IzYxQUNEMjsiIHdpZHRoPSI1Ni4yMjIiIGhlaWdodD0iMzI0LjcxNSIvPgogICAKICAgICAgIDxyZWN0IHg9IjIyNy43NCIgeT0iMTMzLjAxMiIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxIDAuNzA3MSAtMC43MDcxIDAuNzA3MSAyODMuOTYyMyAtOTQuODA3OCkiIHN0eWxlPSJmaWxsOiM2MUFDRDI7IiB3aWR0aD0iNTcuMzY4IiBoZWlnaHQ9IjMyNC43MTUiLz4KPC9nPgo8cmVjdCB4PSIzMTAuNzg5IiB5PSIxMjEuNDk2IiB0cmFuc2Zvcm09Im1hdHJpeCgtMC43MDcxIC0wLjcwNzEgMC43MDcxIC0wLjcwNzEgNTI1LjM2NzQgNTA2LjUwMzYpIiBzdHlsZT0iZmlsbDojRUZFRkVGOyIgd2lkdGg9IjExMy41OSIgaGVpZ2h0PSI0NS44OTciLz4KPHBhdGggZD0iTTUwOC40MywzODUuNzE1TDM2Ni4xNTcsMjQzLjQ0MWw4OC4wNTMtODguMDUzYzIxLjM4OC0yMS4zODgsMjEuMzg4LTU2LjE5MSwwLTc3LjU4bC0xOS45ODQtMTkuOTg0CiAgIGMtMjEuMzkxLTIxLjM4OC01Ni4xOTEtMjEuMzg4LTc3LjU4MSwwbC04OC4wNTMsODguMDUzTDEyNi4yODYsMy41NzFjLTQuNzYyLTQuNzYtMTIuNDc4LTQuNzYtMTcuMjQxLDBMMy41NywxMDkuMDQ2CiAgIGMtNC43Niw0Ljc2LTQuNzYsMTIuNDc5LDAsMTcuMjQxbDE0Mi4zMDcsMTQyLjMwNmwtNzIuNTkxLDcyLjU5MWMtMS42NzEsMS41NDgtMi45MiwzLjU0NC0zLjUxOSw1LjgyM0w0MS4wODgsNDU1Ljk4OQogICBjLTEuMTAzLDQuMTkyLDAuMTA0LDguNjU2LDMuMTcsMTEuNzIyYzIuMzE2LDIuMzE2LDUuNDI4LDMuNTcxLDguNjIxLDMuNTcxYzEuMDM0LDAsMi4wNzUtMC4xMzIsMy4xMDEtMC40MDFsMTA4LjAzMi0yOC40MjkKICAgYzIuNDQ5LTAuNDMyLDQuNzI3LTEuNTkzLDYuNTExLTMuMzc2bDcyLjkyLTcyLjkyTDM4NS43MTUsNTA4LjQzYzIuMzgxLDIuMzgxLDUuNSwzLjU3MSw4LjYyLDMuNTcxczYuMjM5LTEuMTksOC42Mi0zLjU3MQogICBsMTA1LjQ3NC0xMDUuNDc0QzUxMy4xOTEsMzk4LjE5NSw1MTMuMTkxLDM5MC40NzYsNTA4LjQzLDM4NS43MTV6IE0xNjEuOTAxLDQxMy4yMTZsLTIzLjMyNi0yMy4zMjdsMjEyLjM3LTIxMi4zN2wyMy4zMjgsMjMuMzI2CiAgIEwxNjEuOTAxLDQxMy4yMTZ6IE00MTYuOTg2LDc1LjA2NWwxOS45ODQsMTkuOTgzYzExLjg4MiwxMS44ODMsMTEuODgyLDMxLjIxNywwLDQzLjA5OWwtMTMuMDAyLDEzLjAwMmwtNjMuMDgzLTYzLjA4MwogICBsMTMuMDAyLTEzLjAwMkMzODUuNzY2LDYzLjE4Miw0MDUuMTAzLDYzLjE4Miw0MTYuOTg2LDc1LjA2NXogTTM0My42NDMsMTA1LjMwOGw2My4wODMsNjMuMDgzbC0xNS4yMTIsMTUuMjE0bC02My4wODMtNjMuMDgzCiAgIEwzNDMuNjQzLDEwNS4zMDh6IE0yOS40MzEsMTE3LjY2Nmw4OC4yMzUtODguMjM1bDMyLjI1MiwzMi4yNTJsLTE4LjE1NCwxOC4xNTRjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0MQogICBjMi4zODEsMi4zODEsNS41LDMuNTcxLDguNjIsMy41NzFzNi4yMzktMS4xOSw4LjYyLTMuNTcxbDE4LjE1NC0xOC4xNTRsMjMuMzI2LDIzLjMyNmwtMzYuMDA1LDM2LjAwNQogICBjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0MWMyLjM4MSwyLjM4MSw1LjUsMy41NzEsOC42MiwzLjU3MXM2LjIzOS0xLjE5LDguNjItMy41NzFsMzYuMDA2LTM2LjAwNmw0My42MjcsNDMuNjI3CiAgIGwtODguMjM1LDg4LjIzNUwyOS40MzEsMTE3LjY2NnogTTMxMS4xODgsMTM3Ljc2MWwyMi41MTYsMjIuNTE2bC0yMTIuMzcsMjEyLjM3bC0yMi41MTUtMjIuNTE2TDMxMS4xODgsMTM3Ljc2MXogTTg3Ljk0NCwzNzMuNzM4CiAgIGw1MC4yODcsNTAuMjg3bC02OC4yNDcsMTcuOTU5TDg3Ljk0NCwzNzMuNzM4eiBNMzk0LjMzNSw0ODIuNTdMMjYwLjY4MSwzNDguOTE3bDg4LjIzNS04OC4yMzVsNDQuNDA1LDQ0LjQwNWwtMTguMTU0LDE4LjE1NAogICBjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0MWMyLjM4MSwyLjM4MSw1LjUsMy41NzEsOC42MiwzLjU3MWMzLjEyLDAsNi4yMzktMS4xOSw4LjYyLTMuNTcxbDE4LjE1NC0xOC4xNTRsMjMuMzI2LDIzLjMyNgogICBsLTM2LjAwNSwzNi4wMDNjLTQuNzYsNC43Ni00Ljc2LDEyLjQ3OSwwLDE3LjI0YzIuMzgxLDIuMzgxLDUuNSwzLjU3MSw4LjYyLDMuNTcxYzMuMTIsMCw2LjIzOS0xLjE5MSw4LjYyLTMuNTcxbDM2LjAwNS0zNi4wMDMKICAgbDMxLjQ0LDMxLjQ0TDM5NC4zMzUsNDgyLjU3eiIvPjwvc3ZnPg==';
const deleteIcon ='PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjU2IDI1NjsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI1NiAyNTYiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwQTM4ODt9Cgkuc3Qxe2ZpbGw6I0VBNjg1RTtzdHJva2U6IzAwODg2RjtzdHJva2Utd2lkdGg6MTU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQoJLnN0MntmaWxsOiNFOEU4RTg7fQoJLnN0M3tmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDg4NkY7c3Ryb2tlLXdpZHRoOjE1O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDR7ZmlsbDojMDA4ODZGO30KCS5zdDV7ZmlsbDojRkZGRkZGO30KCS5zdDZ7ZmlsbDojQ0NDQ0NDO30KCS5zdDd7ZmlsbDpub25lO3N0cm9rZTojMDBBMzg4O3N0cm9rZS13aWR0aDo0O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDh7ZmlsbDojRUE2ODVFO30KCS5zdDl7ZmlsbDojRkZBQjgwO30KCS5zdDEwe2ZpbGw6IzJDM0U1MDt9Cgkuc3QxMXtmaWxsOiM0QjY4N0Y7fQoJLnN0MTJ7ZmlsbDpub25lO3N0cm9rZTojM0U1MDYzO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDEze2ZpbGw6I0ZGRDc2Njt9Cgkuc3QxNHtmaWxsOiNGRkU2RDM7fQoJLnN0MTV7ZmlsbDojRjA5QTc5O30KCS5zdDE2e2ZpbGw6I0M5MUUwMTt9Cgkuc3QxN3tmaWxsOiNFQTNCMjg7fQoJLnN0MTh7ZmlsbDojMEY2MjdGO30KCS5zdDE5e2ZpbGw6IzAwNTY3MDt9Cgkuc3QyMHtmaWx0ZXI6dXJsKCNBZG9iZV9PcGFjaXR5TWFza0ZpbHRlcik7fQoJLnN0MjF7bWFzazp1cmwoI1NWR0lEXzJfKTt9Cgkuc3QyMntmaWxsOiM4QzYyM0I7fQoJLnN0MjN7ZmlsbDojRTZFNkU2O3N0cm9rZTojMDA1NjcwO3N0cm9rZS13aWR0aDoxNjtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Cgkuc3QyNHtvcGFjaXR5OjAuNjt9Cgkuc3QyNXtmaWxsOiNFNkU2RTY7fQoJLnN0MjZ7ZmlsbDojRkZFQzgyO30KCS5zdDI3e2ZpbGw6I0ZGQ0YzQTt9Cgkuc3QyOHtmaWx0ZXI6dXJsKCNBZG9iZV9PcGFjaXR5TWFza0ZpbHRlcl8xXyk7fQoJLnN0Mjl7bWFzazp1cmwoI1NWR0lEXzFfKTt9Cgkuc3QzMHtmaWxsOiM2MDM4MTM7fQoJLnN0MzF7ZmlsbDojRjJGMkYyO30KCS5zdDMye2ZpbGw6IzY2NjY2Njt9Cjwvc3R5bGU+PGcgaWQ9IkxheWVyXzIiPjxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEyOCIgY3k9IjEyOCIgcj0iMTIwIi8+PC9nPjxnIGlkPSJMYXllcl8xIj48Zz48Zz48Zz48Y2lyY2xlIGNsYXNzPSJzdDE2IiBjeD0iMTI4IiBjeT0iMTMyIiByPSI3Mi41Ii8+PC9nPjxnPjxjaXJjbGUgY2xhc3M9InN0MTciIGN4PSIxMjgiIGN5PSIxMjQiIHI9IjcyLjUiLz48L2c+PC9nPjxnPjxnPjxnPjxyZWN0IGNsYXNzPSJzdDE2IiBoZWlnaHQ9IjIxLjA2Mjk2IiB0cmFuc2Zvcm09Im1hdHJpeCgtMC43MDcxMDcgMC43MDcxMDcgLTAuNzA3MTA3IC0wLjcwNzEwNyAzMTIuNTU0ODcxIDEzNi41MzU1MzgpIiB3aWR0aD0iOTMuNDIwODMiIHg9IjgxLjI4OTU4OSIgeT0iMTIyLjQ2ODUyMSIvPjwvZz48L2c+PGc+PGc+PHJlY3QgY2xhc3M9InN0MTYiIGhlaWdodD0iMjEuMDYyOTYiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IDAuNzA3MTA3IC0wLjcwNzEwNyAwLjcwNzEwNyAxMzEuNTM1NTM4IC01MS41NTQ4NzEpIiB3aWR0aD0iOTMuNDIwODMiIHg9IjgxLjI4OTU4OSIgeT0iMTIyLjQ2ODUyMSIvPjwvZz48L2c+PC9nPjxnPjxnPjxnPjxyZWN0IGNsYXNzPSJzdDUiIGhlaWdodD0iMjEuMDYyOTYiIHRyYW5zZm9ybT0ibWF0cml4KC0wLjcwNzEwNyAwLjcwNzEwNyAtMC43MDcxMDcgLTAuNzA3MTA3IDMwOS4wMTkzNDggMTI4KSIgd2lkdGg9IjkzLjQyMDgzIiB4PSI4MS4yODk1ODkiIHk9IjExNy40Njg1MjEiLz48L2c+PC9nPjxnPjxnPjxyZWN0IGNsYXNzPSJzdDUiIGhlaWdodD0iMjEuMDYyOTYiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IDAuNzA3MTA3IC0wLjcwNzEwNyAwLjcwNzEwNyAxMjggLTUzLjAxOTMzNykiIHdpZHRoPSI5My40MjA4MyIgeD0iODEuMjg5NTg5IiB5PSIxMTcuNDY4NTIxIi8+PC9nPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4=';

/*********************************************** HTML EDITORE***************************/

function removeEditor() {
    SelectedIndex = -1;
    $('#wysiwyg').jqte();
    $('#dialog-modal').dialog('destroy');
}

function addTinyMCE(data) {
    $('#wysiwyg').val(data);
    $('#wysiwyg').jqte();
}

function changeStimulusFormat(item) {
    var index = $(item).attr('data-value');
    if ($(item).prop('checked')) {
        $('#optionvarlabel' + index).hide();
        $('#stimulus_html_format' + index).html($('#optionvarlabel' + index).val());
        $('#stimulus_html_container' + index).removeClass('hidden');
        addHTMLData(index);
    }
    else {
        $('#optionvarlabel' + index).show();
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

function getNewParameter(k, v) {
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

function getNewMMCVar(index, res_ops, res_stim) {
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
        .replace('_stimulusCheck_', stimulusCheck)
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
        .replace('_RemoveAnswerOption_', index)
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


function getNewDoubleMCAnswer(index, ans_op, res_stim) {
    var label = (ans_op) ? ans_op : '';
    var stimulusCheck = (res_stim && res_stim[index - 1]) ? ' checked' : '';
    var stimulus_html_hidden = (res_stim && res_stim[index - 1]) ? '' : ' hidden';
    var stimulus_text_hidden = (res_stim && res_stim[index - 1]) ? ' hidden' : '';
    var newvar = '<div class="langer-block answerblock" id="answerblock' + index + '">';
    newvar += $('.mc-all-answer').html()
        .replace('_stimulus_', 'name="optionanswer[]" data-value="' + index + '" id="optionvarlabel' + index + '" value="' + label + '"')
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
    return newvar;
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

function createJsonUI(tmpl) {
    confblock = $('#item_configs');
    AnswreList = '';
    answeroptioncount = 0;
    varcount = 0;
    paramcount = 0;
    lesetextval = '';
    $('#texteditblock').hide();
    $('.hide-tmp-edit').hide();
    //$('#lesetext_einbinden').prop('checked', true);
    $('#frage_text_name').val(lesetextval);
    $('#lesetext_block').show();
    confblock.html('');
    if (!$('.tmp-edit-option').hasClass('hidden'))
        $('.tmp-edit-option').addClass('hidden');
    switch (tmpl) {
        case 'tmp_satz_test':
        case 'tmp_wort_test':
          var MainConfBlock = '<div class="algemein-option-block">';
          answeroptioncount = 0;
          MainConfBlock += getNewSpeedBlock(answeroptioncount, '', '', '');
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
            res_ops = "";
            ans_ops = "";
            res_ans = "";
            res_stim = "";
            var MainMMCConfBlock = '<div class="mmc-answer-option-block" style="border-top: 1px lightblue solid;"></div>';
            var elmnt = $('.btn-option');
            MainMMCConfBlock += elmnt[0]['outerHTML'];
            MainMMCConfBlock += '<div class="mmc-variabels-block"></div>';
            var elmnt = $('.btn-answer');
            MainMMCConfBlock += elmnt[0]['outerHTML'];
            MainMMCConfBlock += '<div class="parameter-block"></div>';
            var elmnt = $('.btn-param');
            MainMMCConfBlock += elmnt[0]['outerHTML'];
            confblock.html(MainMMCConfBlock);

            $('.btn-option').click(function () {
                newOption = getNewMMCAnswer(answeroptioncount++, '', answeroptioncount);
                $('.mmc-answer-option-block').append(newOption);
                //setMMCCorrectAnswerValues();
            });

            $('.btn-answer').click(function () {
                $('.mmc-variabels-block').append(getNewMMCVar(varcount++));
            });

            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });

            newOption = getNewMMCAnswer(answeroptioncount++, '', answeroptioncount);
            $('.mmc-answer-option-block').append(newOption);
            setMMCCorrectAnswerValues();
            $('.mmc-variabels-block').append(getNewMMCVar(varcount++));
            console.log('mmc');
            break;
        case 'tmp_mc':
            answeroptioncount = 0;
            var MainConfBlock = '<div class="mmc-answer-option-block">';
            var AllAnswers = '<div class="mc-variabels-block"></div>';
            MainConfBlock += $('.mc-answer-option').html()
                .replace('_variable_', 'name="optionvarname" id="optionvarname" value=""')
                .replace('_loesung_', 'name="optionanswer" id="optionanswer" onchange="$(this).attr(\'data-value\',$(this).val());" data-value="" class="answertoptionlist"')
                .replace('_loesung_options_', "")

            MainConfBlock += "</div>";

            MainConfBlock += AllAnswers;

            var elmnt = $('.btn-answer');
            MainConfBlock += elmnt[0]['outerHTML'];

            MainConfBlock += '<div class="parameter-block"></div>';
            var elmnt = $('.btn-param');
            MainConfBlock += elmnt[0]['outerHTML'];
            confblock.html(MainConfBlock);

            $('.btn-add').click(function () {
                newOption = getNewMCAnswer(++answeroptioncount, '', answeroptioncount);
                $('.mc-variabels-block').append(newOption);
                $('#optionanswer').val($('#optionanswer').attr('data-value'));
            });

            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });

            newOption = getNewMCAnswer(++answeroptioncount, '', answeroptioncount);
            $('.mc-variabels-block').append(newOption);
            $('#optionanswer').val($('#optionanswer').attr('data-value'));
            break;
        case 'tmp_mix':

            $('#texteditblock').hide();
            var MainConfBlock = '<div class="mix-option-block">';
            answeroptioncount = 0;

            MainConfBlock += '</div>';

            var elmnt = $('.btn-item');
            MainConfBlock += elmnt[0]['outerHTML'];

            MainConfBlock += '<div class="parameter-block"></div>';
            var elmnt = $('.btn-param');
            MainConfBlock += elmnt[0]['outerHTML'];

            confblock.html(MainConfBlock);
            $('.btn-add').click(function () {
                newOption = getNewMixBlock(++answeroptioncount, '', '', '');
                $('.mix-option-block').append(newOption);
            });

            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });
            break;
        case 'tmp_edit':
            questionEditor = tinyMCE.activeEditor;
            $('.tmp-edit-option').removeClass('hidden');

            $('#texteditblock').show();
            $('.hide-tmp-edit').show();
            break;
        case 'tmp_double_mc':
            let ischecked = '';
            var MainConfBlock = '<div><span class="chkLabel">Untereinander?</span>';
            MainConfBlock += $('#toggle_template').html()
                .replace('_ID_', 'untereinander')
                .replace('_name_', '')
                .replace('_checked_', ischecked)
                .replace('_FORID_', 'untereinander');
            MainConfBlock += '</div><br/>';
            MainConfBlock += '<div id="jstree_frage" class="jstree-frage"></div>';

            confblock.html(MainConfBlock);
            startDoubleMC();
            break;
        default:

            var MainConfBlock = '<div class="algemein-option-block">';
            answeroptioncount = 0;

            MainConfBlock += '</div>';

            var elmnt = $('.btn-var');
            MainConfBlock += elmnt[0]['outerHTML'];

            MainConfBlock += '<div class="parameter-block"></div>';
            var elmnt = $('.btn-param');
            MainConfBlock += elmnt[0]['outerHTML'];

            confblock.html(MainConfBlock);
            $('.btn-add').click(function () {
                newOption = getNewAlgemeinBlock(++answeroptioncount, '', '');
                $('.algemein-option-block').append(newOption);
            });

            $('.btn-param').click(function () {
                $('.parameter-block').append(getNewParameter());
            });
            break;
    }
}

function changeItem_template() {
    var tmp = $('#item_template').val();
	tinyMCE.get('question').setContent('');
    if(tmp == 'tmp_drag' || tmp == 'tmp_dropdown' )
    {
        $('.algemein-option-block .x').hide();
        $('.algemein-option-block .variabelsblock input').prop('disabled',true);
        $('#item_configs .btn-add').hide();
    }
    if(tmp == 'tmp_scode_dyn' )
    {
        const templateBlock ='<div id="scode_vorlage_bitte_nicht_aendern" contenteditable="false" style="border:1px lightblue dashed;padding: 15px;min-height: 95px;min-width: 275px;display: inline-block;background: #fcfcfc;line-height: 90px;">Das Formular wird in diesem Block platziert </div>';
        tinyMCE.get('question').setContent(templateBlock);
    }
    else
    {
        $('.algemein-option-block .x').show();
        $('.algemein-option-block .variabelsblock input').prop('disabled',false);
        $('#item_configs .btn-add').show();
    }

    createJsonUI(tmp);
    $('ui-id-7').trigger('click');
}

function setConfiguration() {
    confblock = $('#item_configs');
    var item_template = $('#item_template').val();
    var resultConfig = { response_options: [], correct_answers: {}, answer_options: [], flip_temp: "flip", stimulus: [], single: 0, korrektur: 0 , gross: 0};

    if ($('#frage_text_name').val() && $('#frage_text_name').val().length > 0) {
        resultConfig['frage_text_name'] = "";
        resultConfig.frage_text_name = $('#frage_text_name').val().replace(/"/g, "'");
    }

    if (item_template.indexOf('teil') > 0) {
        $('#item_config').val('');
        return;
    }
  
  	if ($('#tastatur').val() != '0')
    	resultConfig['tastatur'] = $('#tastatur').val();
    
    if ($('#einzelantwortreicht').val() != '0')
        resultConfig['einzelantwortreicht'] = 1;
    
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

           /* $('input[name^="optionvarname"]').each(function () {
                var index = $(this).attr('data-value');
                var stim = $('#html_stimulus_' + index).prop('checked') ? 1 : 0;
                resultConfig.stimulus.push(stim);
            });*/
            
            delete resultConfig.single;
            delete resultConfig.korrektur;
            delete resultConfig.gross;

            break;
        case 'tmp_mmc':
            $('input[name^="optionvarname"]').each(function ()
            {
                var index = $(this).attr('data-value');
                if(index == '_IDX_')
                    return;

                var varname = $(this).val();
                var label = $('#optionvarlabel' + index).val().length ? $('#optionvarlabel' + index).val().replace(/"/g, "'") : "";
                var stim = $('#html_stimulus_' + index).prop('checked') ? 1 : 0;
                resultConfig.response_options.push({ varname: varname, label: label });
                resultConfig.correct_answers[varname] = $('#optionanswer' + index).val().length ? $('#optionanswer' + index).val().replace(/"/g, "'") : "";
                resultConfig.stimulus.push(stim);
            });

            $('input[name^="answerlbl"]').each(function () {
              	const val = $(this).val();
              	if(val == '_ANS_OP_')
                  return;
                const answerlbl = val.length ? val.replace(/"/g, "'") : "";
                resultConfig.answer_options.push(answerlbl);
            });
            delete resultConfig.single;
            delete resultConfig.korrektur;
            delete resultConfig.gross;

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
            delete resultConfig.single;
            delete resultConfig.korrektur;
            delete resultConfig.gross;
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
            delete resultConfig.single;
            delete resultConfig.korrektur;
            delete resultConfig.gross;
            break;
        case 'tmp_edit':

            questionEditor = tinyMCE.activeEditor;
            $('#temporary_element').html(tinyMCE.editors[$('#question').attr('id')].getContent());
            $('#temporary_element .text_edit_block').each(function (index) {
                resultConfig.response_options.push({ varname: $('#var_name').val() + '_' + index });
            });
            $('#temporary_element').html('');
            resultConfig.single = $('#single').val();
            resultConfig.korrektur = $('#korrektur').val();
            resultConfig.gross = $('#gross').val();
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
            delete resultConfig.gross;
            break;
        default:
            $('input[name^="vanmame"]').each(function () {
                var vn = $(this).val();
                resultConfig.response_options.push({ varname: vn });
            });

            delete resultConfig.stimulus;
            delete resultConfig.correct_answers;
            delete resultConfig.answer_options;
            delete resultConfig.single;
            delete resultConfig.korrektur;
            delete resultConfig.gross;

            break;
    }

    $('input[name^="paramname"]').each(function () {
        var index = $(this).attr('data-value');
        var paramname = $(this).val();        
        if (!resultConfig[paramname]) {
            if (paramname != 'einzelantwortreicht' || $('#einzelantwortreicht').val() != '0') {
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

function hideAlleCod_multi()
{
    $('.cod_multi-list').hide();
    $('.cod_multi-list .in-select').hide();
    $('.cod_multi-list .in-list').hide();
}

function removeKind(id,typ)
{
    if(typ == 1)
    {
        bundleKinder = bundleKinder.filter((item)=>{
            return item.id != id
        })
    }
    else if(typ == 2)
    {
        aufgabeKinder = aufgabeKinder.filter((item)=>{
            return item.id != id
        })
    }
    else if(typ == 3)
    {
        cod_multiKinder = cod_multiKinder.filter((item)=>{
            return item.id != id
        })
    }

    showAlleKinder();
}

function showAlleKinder()
{
    const kindTemplate= '<div class="list-kind" data-option="__ID__"> <span class="order">__ORDER__</span> __var_name__ <small>__ID__</small> <img src="data:image/svg+xml;base64, '+deleteIcon+'" onclick="removeKind(__ID__)"></div>';
    $('.bundles-list .in-list').empty();
    $('.aufgabe-list .in-list').empty();
    $('.cod_multi-list .in-list').empty();

    bundleKinder.sort((a,b) => {
        
        bundle_order1 = a.bundle_order ? a.bundle_order : 0 ;
        bundle_order2 = b.bundle_order ? b.bundle_order : 0 ;
        Sort = (bundle_order1 > bundle_order2) ? 1 : ((bundle_order2 > bundle_order1) ? -1 : 0)
        
        return Sort;
    })

    aufgabeKinder.sort((a,b) => {
        
        aufgabe_order1 = a.aufgabe_order ? a.aufgabe_order : 0 ;
        aufgabe_order2 = b.aufgabe_order ? b.aufgabe_order : 0 ;
        Sort = (aufgabe_order1 > aufgabe_order2) ? 1 : ((aufgabe_order2 > aufgabe_order1) ? -1 : 0)
        
        return Sort;
    })

    bundleKinder.forEach((item,idx)=>
    {
        const order= idx+1;
        const kind = kindTemplate.replace('__ORDER__',order).replace(/__ID__/g,item.id).replace('__var_name__',item.var_name).replace('__TYP__',1);
        $('.bundles-list .in-list').append(kind);  
    })

    $( ".bundles-list .in-list" ).sortable({
        items: "div:not(.addKind)",
        stop: function( event, ui ) {
            let order = 1;
            const tmpKinder = [...bundleKinder];
            bundleKinder = [];
            $('.list-kind').each(function(){
                const id = $(this).attr('data-option');
                if(id)
                {
                    kind = tmpKinder.find((item)=>{
                        return item.id == id;
                    })
                    kind.bundle_order = order;
                    bundleKinder.push(kind);
                    order++;                                
                } 
            })
            showAlleKinder();
        }
    });
   
    aufgabeKinder.forEach((item,idx)=>
    {
        const order= idx+1;
        const kind = kindTemplate.replace('__ORDER__',order).replace(/__ID__/g,item.id).replace('__var_name__',item.var_name).replace('__TYP__',1);
        $('.aufgabe-list .in-list').append(kind);
    });

    $( ".aufgabe-list .in-list" ).sortable({
        items: "div:not(.addKind)",
        stop: function( event, ui ) {
            let order = 1;
            const tmpKinder = [...aufgabeKinder];
            aufgabeKinder = [];
            $('.list-kind').each(function(){
                const id = $(this).attr('data-option')
                if(id)
                {
                    kind = tmpKinder.find((item)=>{
                        return item.id == id;
                    })
                    kind.aufgabe_order = order;
                    aufgabeKinder.push(kind);
                    order++;
                }
            })
            showAlleKinder();
        }
    });    

    $('.bundles-list .in-list').append('<div class="list-kind addKind hidden" onclick="editKinder(1)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
    $('.aufgabe-list .in-list').append('<div class="list-kind addKind hidden" onclick="editKinder(2)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
    $('.cod_multi-list .in-list').append('<div class="list-kind addKind hidden" onclick="editKinder(3)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

$("#overlay").on('click', function(e) {
    if (e.target !== this)
        return;
    document.getElementById("overlay").style.display = "none";
});

function onAddsubmit()
{
    const SelectedFrageId = $('#buldlElternList').val();
    if(!SelectedFrageId.length)
        return;
    const Quelle = addTyp == 1 ? bundleKinder : addTyp == 2 ? aufgabeKinder : cod_multiKinder;
    const exists = Quelle.find((item)=>{
        return item.id == SelectedFrageId
    })

    if(exists) return;

    const newItem = alleFragen.find((item)=>{
        return item.id == SelectedFrageId
    });
    Quelle.push(newItem);

    showAlleKinder();
}

function editKinder(typ)
{
    addTyp = typ;
    const Optionen = typ == 1 ? BundleFrageList : typ == 2 ? AufgabeFrageList : cod_multiFrageList;

    $('#typ_text').text(typ ==1 ? 'Bundle' : typ ==2 ?  'Aufgabe' : 'cod_multi');

    const FrageList = 'Eltern Frage: <select id="buldlElternList" name="buldlElternList">'+Optionen+'</select>'

    $('.in-select-add').html(FrageList);

    $("#buldlElternList").select2({
        width: '490px'
    });

    on();
}

function showAlleEltern()
{
    const kindTemplate= '<option value="__ID__">__var_name__  (__ID__)</option>';
    
    alleFragen.forEach((item)=>
    {
        const kind = kindTemplate.replace(/__ID__/g,item.id).replace('__var_name__',item.var_name)
        
        if(item.bundle == '0')
        {
            $('#bundle_eltern').append(kind);
        }
        else if(!item.bundle || item.bundle == '')
        {
            BundleFrageList += kind;
        }

        if(item.aufgabe == '0')
        {
            $('#aufgabe_eltern').append(kind);
        }
        else if(!item.aufgabe || item.aufgabe == '')
        {
            AufgabeFrageList += kind;
        }

        if(item.cod_multi == '0')
        {
            $('#cod_multi_eltern').append(kind);
        }
        else if(!item.cod_multi || item.cod_multi == '')
        {
            cod_multiFrageList += kind;
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

/************************************DROP MENU */

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

    const final_item_config = 
    {
        response_options,
        correct_answers,
        answer_options
    }

    $('#item_config').val(JSON.stringify(final_item_config));

    $('#testHtml .tmp-add-remove-block').remove();
}

document.addEventListener("configChanged", (event) => {
   const neueResponseOptions = event.detail;
  document.getElementById('item_config').value = JSON.stringify(neueResponseOptions);
});


document.addEventListener("dragConfigChanged", (event) => {
   	const neueConfigs = event.detail;
    if(document.getElementById('item_configs') && 
       !document.getElementById('item_configs').getElementsByClassName('algemein-option-block').length)
      document.getElementById('item_configs').innerHTML += '<div class="algemein-option-block"><div>';

    if(neueConfigs.dAltVarname.length)
    {
      Array.from(document.querySelectorAll("input[value="+neueConfigs.dAltVarname+"]")).forEach((item)=>{
        item.value = neueConfigs.dVarname;
      });
    }
    else
    {
      const newOption = getNewAlgemeinBlock(++drag_answeroptioncount, neueConfigs.dVarname, '');
      document.getElementsByClassName('algemein-option-block')[0].innerHTML += newOption;
      document.getElementsByClassName('algemein-option-block')[0].getElementsByClassName('x')[0].style.display = 'none';
      const var_block = document.getElementsByClassName('algemein-option-block')[0]
      .getElementsByClassName('variabelsblock');
      Array.from(var_block).forEach((item)=>{
        const inp = item.getElementsByTagName('input')
        if(inp.length)
          inp[0].disabled = 'disabled';
      });
    }
});/******************************* DRAW *******************************/

function ShowDrawWindow(data) {

    if($('#item_template').val()!='tmp_draw')
    {
        alert('Diese Option ist nur mit tmp_draw verfügbar');
        return;
    }

    let CurrCanvasBGImageIn = (data.CurrCanvasBGImageIn !== undefined) ? data.CurrCanvasBGImageIn : '';
    let CurrCanvasWidthIn = (data.CurrCanvasWidthIn !== undefined) ? data.CurrCanvasWidthIn : '';
    let CurrCanvasHeightIn = (data.CurrCanvasHeightIn !== undefined) ? data.CurrCanvasHeightIn : '';
    let CurrCanvasDataVar = (data.CurrCanvasDataVar !== undefined) ? data.CurrCanvasDataVar : '';
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
                    forced_root_block: "",
                    name: '',
                    label: '',
                    html: 'Variable: <input style="border: 1px solid gray;margin-bottom: 8px;" id="draw_var" name="draw_var" value="' + CurrCanvasDataVar + '">' +
                        $("#color_picker").html() +
                        '<p>Hintergrund Build:  <input style="border: 1px solid gray;margin-bottom: 8px;" id="draw_bg" name="draw_bg" value="' + CurrCanvasBGImageIn + '"></p>' +
                        '<p>Breite: <input style="border: 1px solid gray;margin-bottom: 8px;width:33px;" type="Text" name="dWidth" id="dWidth" value="' + CurrCanvasWidthIn + '"> ' +
                        ' Höhe: <input style="border: 1px solid gray;margin-bottom: 8px;width:33px;" type="Text" name="dHeight" id="dHeight" value="' + CurrCanvasHeightIn + '"></p>' +
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
            var dVarStatus = $('#unendlich').is(":checked");
            CurrCanvasBGImage = ($('#draw_bg').val().length < 4) ? 'none' : $('#draw_bg').val();
            var CanvasBGImage = (CurrCanvasBGImage == 'none') ? CurrCanvasBGImage : 'url(../bundles/concertopanel/files/' + CurrCanvasBGImage + ')';

            CurrCanvasBGValue = $('#resizable').css('background-color');
            dObject = '<canvas id="drawable_' + dVarname + '" data-option="' + dVarStatus + '" width="' + dWidth + '" height="' + dHeight + '" data-img="' + CurrCanvasBGImage + '" data-value="' + CurrCanvasBGValue + '" data-var="' + dVarname + '"  contentEditable="false" style="background-color:' + CurrCanvasBGValue + ' !important;background-image:' + CanvasBGImage + ' !important;width:' + dWidth + 'px !important;height:' + dHeight + 'px !important;" class="mceNonEditable drawable"> &nbsp; </canvas>';
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
            CurrZusaetsliche = '';
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
            CurrZusaetsliche = '';
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
            CurrZusaetsliche = '';
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

    if(CurrCanvasWidth)
    {
        $("#resizable").width(CurrCanvasWidth);
        $("#resizable").height(CurrCanvasHeight);
        $('#resizable').css('background-color', CurrCanvasBGValue);
        $('#resizable').css('background-image', 'url(../bundles/concertopanel/files/' + CurrCanvasBGImage + ')');        
    }


    $("#resizable").resize(function () 
    {
        $("#dWidth").val($(this).width());
        $("#dHeight").val($(this).height());
    });
}

function setTastaturInfo(tasteid)
{  	
	const lihtml = $('#taste'+tasteid).html();
    $('div.mm-dropdown .textfirst').html(lihtml);
    $("div.mm-dropdown .option").val(tasteid);
}

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
/************************************DROP MENU */

function getDropMenuAntwortlist()
{
    current_dropdowns_antwort_list.forEach((item)=>{
        SetDropmenuItem(item.id);
    });
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

$(document).ready(function ()
{

    const mainTastaturMenu = $('div.mm-dropdown .textfirst')
    var tastaturLi = $('div.mm-dropdown > ul > li.input-option')
    var tastaturInputOption = $("div.mm-dropdown .option")
    var tastatur_default_text = 'Tastatur wählen <img src="../bundles/concertopanel/files/tasteicon.png" width="40" height="20" class="down" />';

    // Animati  const mainTastaturMenu = $('div.mm-dropdown .textfirst')
    var tastaturLi = $('div.mm-dropdown > ul > li.input-option')
    var tastaturInputOption = $("div.mm-dropdown .option")
    var tastatur_default_text = 'Tastatur wählen <img src="../bundles/concertopanel/files/tasteicon.png" width="40" height="20" class="down" />';
  
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
  
    if (reqestAdded != undefined &&  reqestAdded != null && Object.keys(reqestAdded).length > 0)
    {
        const cleanedArray = reqestAdded;
        const qid = cleanedArray.id;
        parent.addNewRowToDatatable({dataset:cleanedArray,filterdata:reqestFilterdata})
        location.replace(`itv?test_session=${reqestTestSession}&filterdata=${reqestFilterdata}&data_set_id=${reqestUserDatasetId}&question_id=${qid}`);
    }


    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

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

    $('#subitem_chk').prop('checked', $('#subitem').val() == '1');

    $('#single_chk').change(function (e) {
        var singlev = $(this).prop('checked') ? 1 : 0;
        $('#single').val(singlev);
    });

    $('#korrektur_chk').change(function (e) {
        var korrekturv = $(this).prop('checked') ? 1 : 0;
        $('#korrektur').val(korrekturv);
    });

    $('#gross_chk').change(function (e) {
        var grossv = $(this).prop('checked') ? 1 : 0;
        $('#gross').val(grossv);
    });

    $('#einzelantwortreicht_chk').change(function (e) {
        var einzelantwortreichtv = $(this).prop('checked') ? 1 : 0;
        $('#einzelantwortreicht').val(einzelantwortreichtv);
    });

    tinymce.init({
        selector: '.edit',
        height: 551,
        statusbar: false,
        forced_root_block: false,
      	cache_suffix: "?v=2.2.0",
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak texteditblock',
            'searchreplace wordcount visualblocks visualchars code fullscreen ifbq_dragables ',
            'insertdatetime media nonbreaking save table directionality noneditable ifbq_drawables ifbq_dropdown ifbq_svg',
            'emoticons template paste textpattern imagetools codesample toc'
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | noneditable |code | fullscreen',
        toolbar2: ' print preview | forecolor backcolor emoticons | codesample | dynamictextblock | dragables  | drawables | dropdowns | ifbqsvg | interaktivsvg',
        image_advtab: true,
    	fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
        templates: [
            { title: 'Test template 1', content: 'Test 1' },
            { title: 'Test template 2', content: 'Test 2' }
        ],
        content_style: '.text_edit_block {background-color:lightblue}',
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tinymce.com/css/codepen.min.css'
        ],
        content_css: tinymce.baseURL + '/plugins/ifbq_dragables/custom_css.css',
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
                CurrDrawIsUnEndlich = '';
                CurrKartZuShau = '';
                CurrKartMitKarte = '';
                CurrKartGrenzeText = '';
                CurrKartGrenzeList = '';
                selectedNode = editor.selection.getNode();
                if (selectedNode.className && selectedNode.className.match('test-drop-menu') && selectedNode.className.match('test-drop-menu').length > 0) {
                    var SelectedObj = $(selectedNode)
                    ShowDropdowns(SelectedObj.attr('data-value'));
                }
                console.log(SelectedObj, SelectedItemText);
            });
            var currtemplate = $('#item_template').val();
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

    $('#var_name').on('blur', async function () {
        const duplitziert = await parent.checkVariableUsed($('#var_name').val());
        if (duplitziert) {
            alert('variable name ist schon genutzt!!!');
            //$('#var_name').focus();
            //$('#var_name').select();
        }
    })

    /***********************************START MAIN SAVE************** */

    $('#btnSave').on('click', async function (e) {

        if ($('#var_name').val() == '') {
            alert('Var_name ist ein Pflichtfeld!');
            return false;
        }
        else if (!$('#item_template').val() || $('#item_template').val() == '') {
            alert('Item_template ist eine Pflichtangabe!');
            return false;
        }
        else if (await parent.checkVariableUsed($('#var_name').val())) {
            e.preventDefault();
            alert('variable name ist schon genutzt!!!');
            return false;
        }

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

        $('input[name="bundle_kinder"]').val(JSON.stringify(bundleKinder));
        $('input[name="aufgabe_kinder"]').val(JSON.stringify(aufgabeKinder));
        $('input[name="cod_multie_kinder"]').val(JSON.stringify(cod_multiKinder));

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
        // $('#question').val(tinymce.activeEditor.getContent());
        $('#question').val(tinyMCE.get('question').getContent());
        $('#pattern_solution').val(tinyMCE.get('pattern_solution').getContent());
        $('#btnSubmit').trigger('click');

    });

    /***********************************END MAIN SAVE************** */

    $(".ui-accordion-header").removeClass('ui-state-active');
    $('#expandall').prop('checked', true).trigger('change');

    $('#item_template').change(function () {
        $('#texteditblock').show();
        $('.algemein-option-block .x').show();
        $('.algemein-option-block .variabelsblock input').prop('disabled',false);
        $('#item_configs .btn-add').show();
        const tmpl = $('#item_template').val();
        if (tmpl == 'tmp_mix') {
            $('#texteditblock').hide();
        }
        else if(tmpl == 'tmp_drag' || tmpl == 'tmp_dropdown' )
        {
            $('.algemein-option-block .x').hide();
            $('.algemein-option-block .variabelsblock input').prop('disabled',true);
            $('#item_configs .btn-add').hide();
        }
    });

    $('#item_template').change(function () {
        console.log('tmp_mix test')
        if ($(this).val() == 'tmp_mix') {
            $("texteditblock").css("visibility", 'hidden');
        }
        else {
            $("texteditblock").css("visibility", 'visible');
        }
    });

    
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
                    hideAlleCod_multi();
                break;
                case 'cod_multi_eltern' :
                    hideAlleCod_multi();
                    $('.cod_multi-list ').show();
                    $('.cod_multi-list .in-list').show();
                break;
                case 'cod_multi_kind' :
                    hideAlleCod_multi();
                    $('.cod_multi-list ').show();
                    $('.cod_multi-list .in-select').show();
                break;
            }
        }
    });

    alleFragen = JSON.parse($('#alleFragen').text());

        
    $('.bundles-list .in-list').append('<div class="list-kind addKind hidden" onclick="editKinder(1)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
    $('.aufgabe-list .in-list').append('<div class="list-kind addKind hidden" onclick="editKinder(2)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');
    $('.cod_multi-list .in-list').append('<div class="list-kind addKind hidden" onclick="editKinder(3)"><img src="data:image/svg+xml;base64, '+editIcon+'"> Kinder Bearbeiten </div>');

	showAlleEltern();
  	showAlleKinder();
});
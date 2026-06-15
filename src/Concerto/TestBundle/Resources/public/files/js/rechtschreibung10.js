console.log('rechtschreibung10');
var inlineoriginalwidth=[];
var aktuelleParentId = null;

$.fn.textWidth = function(_text, _font)
{//get width of text with font.  usage: $("div").textWidth();
    var fakeEl = $('<span>').hide().appendTo(document.body).text(_text || this.val() || this.text()).css('font', _font || this.css('font')),
    width = fakeEl.width();
    fakeEl.remove();
    return width;
};

function setTmpEditAntworten(Antworten) {
    for (const [key, value] of Object.entries(Antworten))
    {
        let AntwortArray = window.atob(value);

        if(AntwortArray.length<3 || AntwortArray=='#99#')
            continue;
            
        $('#'+key).val(AntwortArray);
        AntwortArray = JSON.parse(AntwortArray);
        $.each(AntwortArray, function(j,itm) {
            if(itm!=0)
            {
                let item_id = key+'_'+j;
                $("label[for='" + item_id + "']").addClass("wortmarkierung10");
                $('#'+item_id).prop('checked',true);
                $('#input_'+item_id).val(replaceUmlaute(itm));
                $('#input_'+item_id).show();
                $('#input_'+item_id).css({width: getCurrentWidth($('#input_'+item_id))});
            }
        });            
    }    
}

function getCurrentWidth(item)
{
    var options = {padding:10,minWidth: item.width(),maxWidth:1000};
    return item.textWidth() + options.padding;
}

const changeWidth = function(item_id)
{
    let item = $('#'+item_id)
    if(!inlineoriginalwidth[item_id])
        inlineoriginalwidth[item_id]= item.width();
    var curr_width = getCurrentWidth(item);
    item.css({width: Math.max(inlineoriginalwidth[item_id],curr_width)});
}

    function delay2(callback, ms) {
      var timer = 0;
      return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, ms || 0);
      };
    }

function replaceUmlaute(itm)
{
    let toRet = itm.
        replace(/_ae_/g, 'ä').
        replace(/_oe_/g, 'ö').
        replace(/_ue_/g, 'ü').
        replace(/_AE_/g, 'Ä').
        replace(/_OE_/g, 'Ö').
        replace(/_UE_/g, 'Ü').
        replace(/_ss_/g, "ß");;
    return toRet
}

$("#main_test_content .text_edit_block input").on("click",function(event)
{
    aktuelleParentId = $(this).attr('data-option');
});

$(document).ready(function()
{
    
    $("#main_test_content").hide();
    
    let response_options = JSON.parse($('#response_options_block').val());
    let main_var_name = response_options[0]['varname'].split('_')[0];

    let woerter = [];
    let saetze=$(".text_edit_block");
    let absaetze ="";
    
    $.each(saetze, function(i) {
        woerter[i] = $(this).text().split(' ');
        absaetze  ="";
        let item_parent_id = main_var_name + '_' + i;
        $('#antworten_block').append('<textarea spellcheck="false" class="hidden tastatur-ersatz" name="'+item_parent_id+'" id="'+item_parent_id+'">[0]</textarea>');
        let satzVal=[];
        $.each(woerter[i], function(j) {
            let inText = woerter[i][j];
            if(inText)
            {
                let objName = main_var_name + '_' + i + '_' +  j;
                
                absaetze += '<label class="checkEditWord satz-block noselect" for="' + objName +'">' + inText + '</label> ';
                absaetze += ' <input type="checkbox" id="' + objName + '" />';
                absaetze += ' <input spellcheck="false" data-value ="'+j+'" data-option="'+item_parent_id+'" type="text" class="ifbq-keyboard-input flexible tastatur-ersatz colors-haburg-blau-color colors-haburg-blau-bg editWord '+item_parent_id+'" id="input_' + objName + '" value="0"  size="'+ inText.length + '"/>';

                satzVal.push(0);
            }            
        });
        $('#'+item_parent_id).val(JSON.stringify(satzVal));
        $(this).html(absaetze);
    });

    $('.flexible').on('input',delay2(function(event) {
        changeWidth($(this).attr('id'));
    },100));

    $("#main_test_content .satz-block").on("click",function(event)
    {
        let item_id = $(this).attr('for');

        let newVal = $(this).hasClass('wortmarkierung10') ? '__NULL__' : $(this).text();

        $('#input_' + item_id).val(newVal);

        if ($(this).hasClass('wortmarkierung10'))
            $(this).removeClass('wortmarkierung10');
        else
            $(this).addClass('wortmarkierung10');

    });

    $("#main_test_content .satz-block").on("mouseup", function (event) {
        event.preventDefault();
        return false;
    });

    $("#main_test_content .text_edit_block input").focusout(function(){
        let item_parent_id = $(this).attr('data-option');
        
        let satzVal = [];
        $.each($('.'+item_parent_id), function(i, itm)
        {
            let itmval = $(itm).val() =='__NULL__' ? 0 : $(itm).val();
            satzVal.push(itmval);
        });       
        $('#'+item_parent_id).val(JSON.stringify(satzVal));
    });
    $("#main_test_content").show();
    
   if(Antworten)
    {
        setTmpEditAntworten(Antworten);
    }
});

document.addEventListener("click", (event) => {
    if (!event.target.className.includes("input") && aktuelleParentId)
    {        
        let satzVal = [];
        $.each($('.'+aktuelleParentId), function(i, itm)
        {
            let itmval = $(itm).val() =='__NULL__' ? 0 : $(itm).val();
            satzVal.push(itmval);
        });       
        $('#'+aktuelleParentId).val(JSON.stringify(satzVal));
    }
});

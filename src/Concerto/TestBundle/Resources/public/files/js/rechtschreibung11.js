console.log('rechtschreibung11');

var inlineoriginalwidth=[];
var aktuelleParentId = null;
$.fn.textWidth = function(_text, _font)
{//get width of text with font.  usage: $("div").textWidth();
    var fakeEl = $('<span>').hide().appendTo(document.body).text(_text || this.val() || this.text()).css('font', _font || this.css('font')),
    width = fakeEl.width();
    fakeEl.remove();
    return width;
};

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

$(document).ready(function()
{
    
    $("#main_test_content").hide();
    
    let response_options = JSON.parse($('#response_options_block').val());
    
    const main_full_var_name = response_options[0]['varname'];
    const lastpos =  main_full_var_name.lastIndexOf("_");
    const main_var_name = main_full_var_name.substring(0,lastpos);
    
    let woerter = [];
    let saetze=$(".text_edit_block");
    let absaetze ="";
        
    $.each(saetze, function(i)
    {
        woerter[i] = $(this).text().split('');
        absaetze  ="";
        let item_parent_id = main_var_name + '_' + i;
        $('#antworten_block').append('<textarea spellcheck="false" class="hidden" name="'+item_parent_id+'" id="'+item_parent_id+'">[0]</textarea>');
        let satzVal=[];
        $.each(woerter[i], function(j) {
            let inText = woerter[i][j];
            if(inText)
            {
                let objName = main_var_name + '_' + i + '_' +  j;
                
                absaetze += '<label class="checkEditWord satz-block" for="' + objName +'">' + inText + '</label>';
                absaetze += '<input type="checkbox" id="' + objName + '" />';
                absaetze += '<input spellcheck="false" data-value ="'+j+'" data-option="'+item_parent_id+'" type="text" class="ifbq-keyboard-input flexible colors-haburg-blau-color colors-haburg-blau-bg editWord '+item_parent_id+'" id="input_' + objName + '" value="0" size="'+ inText.length + '" />';

                satzVal.push(0);
            }            
        });
        $('#'+item_parent_id).val(JSON.stringify(satzVal));
        $(this).html(absaetze);
    });
    
    $('.flexible').on('input',delay2(function(event) {
        changeWidth($(this).attr('id'));
    },100));

    if(Antworten)
    {
        for (const [key, value] of Object.entries(Antworten))
        {
            let AntwortArray = window.atob(value);
            
            if(AntwortArray.length<3 || AntwortArray=='#99#')
                continue;

            $('#'+key).val(AntwortArray);
            AntwortArray = JSON.parse(AntwortArray);
            $.each(AntwortArray, function(j,itm)
            {
                if(itm!=0)
                {
                    let item_id = key+'_'+j;
                    $("label[for='" + item_id + "']").addClass("wortmarkierung10");
                    $('#'+item_id).prop('checked',true);
                    $('#input_'+item_id).val(itm);
                    $('#input_'+item_id).show();                    
                    $('#input_'+item_id).css({width: getCurrentWidth($('#input_'+item_id))});
                }
            });
        }
    }

    $("#main_test_content .satz-block").on("click",function(event)
    {
        aktuelleParentId = $(this).attr('data-option');

        let item_id = $(this).attr('for');

        let newVal = $(this).hasClass('wortmarkierung10') ? '__NULL__' : $(this).text();

        $('#input_' + item_id).val(newVal);

        $(this).toggleClass("wortmarkierung10");

    });

    $("#main_test_content .text_edit_block input").on("click",function(event)
    {
        aktuelleParentId = $(this).attr('data-option');
    });

    $("#main_test_content .text_edit_block input").blur(function(){
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
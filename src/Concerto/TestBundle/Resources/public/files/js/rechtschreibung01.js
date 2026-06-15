console.log('rechtschreibung01');
var aktuelleParentId = null;

function setTmpEditAntworten(Antworten) {
    for (const [key, value] of Object.entries(Antworten))
    {
        let AntwortArray = window.atob(value);
        
        if(AntwortArray.length<6)
            continue;

        $('#'+key).val(AntwortArray);
        AntwortArray = JSON.parse(AntwortArray);
        $.each(AntwortArray, function(j,itm) {
            if(itm==1)
                $('#'+key+'_'+j).addClass("wortmarkierung");
        });                
    }
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
    $.each(saetze, function(i) {
        woerter[i] = $(this).text().split('');
        absaetze  ="";
        let item_parent_id = main_var_name + '_' + i;
        $('#antworten_block').append('<textarea spellcheck="false" class="hidden" name="'+item_parent_id+'" id="'+item_parent_id+'"></textarea>');
        let satzVal=[];
        $.each(woerter[i], function(j) {
            let inText = woerter[i][j];
            if(inText.length>0)
            {
                let objName = main_var_name + '_' + i + '_' +  j;
                absaetze += '<span class="satz-block '+item_parent_id+'" data-value="'+j+'" data-option="'+item_parent_id+'" id="'+objName+'">' + inText + '</span>';
                satzVal.push(0);
            }            
        });
        $('#'+item_parent_id).val(JSON.stringify(satzVal));
        $(this).html(absaetze);
    });

    if(Antworten)
    {
        setTmpEditAntworten(Antworten);
    }

    $("#main_test_content .satz-block").on("click",function(event)
    {
        let item_parent_id = $(this).attr('data-option');
        $(this).toggleClass("wortmarkierung");
        let satzVal = [];
        $.each($('#main_test_content .'+item_parent_id), function(i, itm)
        {
            let itmval = $(itm).hasClass('wortmarkierung')?1:0;
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
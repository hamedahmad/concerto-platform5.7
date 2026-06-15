console.log('rechtschreibung00');
var AlleWorterGeteilt = {};
function setTmpEditAntworten(Antworten) {
    for (const [key, value] of Object.entries(Antworten))
    {
        let AntwortArray = window.atob(value);

        if(AntwortArray.length<3 || AntwortArray=='#99#')
            continue;

        $('#'+key).val(AntwortArray);
        AntwortArray = JSON.parse(AntwortArray);
        $.each(AntwortArray, function(j,itm) 
        {
            if(itm==1)
            {
                const wort_block_id = '#'+key+'_'+j;
                $(wort_block_id).addClass("wortmarkierung");
                if(gross == '1')
                {
                    const wort = $(wort_block_id).text();
                    const grosswort = capitalizeFirstLetter(wort);
                    $(wort_block_id).text(grosswort);
                    $(wort_block_id).addClass("gross-aktiv");
                }
            }
        });
    }
}
$(document).ready(function()
{
    
    $("#main_test_content").hide();
    
    let response_options = JSON.parse($('#response_options_block').val());
    let main_var_name = response_options[0]['varname'].split('_')[0];

    let woerter = [];
    let saetze=$(".text_edit_block");
    let absaetze ="";
    $.each(saetze, function(i)
    {
        woerter[i] = $(this).text().split(' ');
        absaetze  ="";
        let item_parent_id = main_var_name + '_' + i;
        $('#antworten_block').append('<textarea spellcheck="false" class="hidden" name="'+item_parent_id+'" id="'+item_parent_id+'">[0]</textarea>');
        let satzVal=[];
        $.each(woerter[i], function(j) {
            let inText = woerter[i][j];
            if(inText)
            {
                let objName = main_var_name + '_' + i + '_' +  j;
                AlleWorterGeteilt[objName] = inText;
                absaetze += '<span class="satz-block '+item_parent_id+'" data-option="'+item_parent_id+'" id="'+objName+'">' + inText + '</span> ';
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
        if(gross == '1' && $(this).hasClass("wortmarkierung"))
        {
            const wort = $(this).text();
            const wort_block_id = $(this).attr('id');
            const originalwort = AlleWorterGeteilt[wort_block_id];
            $(this).text(originalwort);
            $(this).removeClass("gross-aktiv");
        }

        $(this).toggleClass("wortmarkierung");
        let satzVal = [];
        $.each($('.'+item_parent_id), function(i, itm)
        {
            let itmval = $(itm).hasClass('wortmarkierung')?1:0;
            if(gross == '1' && itmval == 1)
            {
                const wort = $(itm).text();
                const grosswort = capitalizeFirstLetter(wort);
                $(itm).text(grosswort);
                $(itm).addClass("gross-aktiv");
            }
            satzVal.push(itmval);
        });       
        $('#'+item_parent_id).val(JSON.stringify(satzVal));
    });

    $("#main_test_content").show();
});

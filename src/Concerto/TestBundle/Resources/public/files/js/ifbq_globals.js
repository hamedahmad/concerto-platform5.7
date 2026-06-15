// Alle Scripts hier

var AlleTextListen = [];
var AutocompleteVariabeln = [];
var time_diff_left = 0;
var TimerStarted = false;
var LetzteSeite = false;
var interval;

/*document.addEventListener('DOMContentLoaded', function () {
  const testHtmlDiv = document.getElementById('testHtml');

  if (!testHtmlDiv) {
      console.error('Element with ID "testHtml" not found.');
      return;
  }

  // Create a MutationObserver to monitor changes in the #testHtml element
  const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
          if (mutation.type === 'childList') {
              console.log('Content inside #testHtml changed:');
              console.log(testHtmlDiv.innerHTML); // Log the updated content
          }
      });
  });

  // Configure the observer to watch for child node changes
  observer.observe(testHtmlDiv, { childList: true, subtree: true });

  console.log('Monitoring changes inside #testHtml...');
});*/

function startCountdown(seconds,zeitabgabe)
{
  TimerStarted = true;

  let counter = seconds/1000;
  counter = zeitabgabe == '2' ? counter+=20 : counter;

  //console.log('Timer called');
  interval = setInterval(() => 
  {
    if(document.getElementById('abgabe_text_zeit'))
      document.getElementById('abgabe_text_zeit').innerText = counter;
    //console.log('counter',counter);
    counter--;

    const toshow = !LetzteSeite || counter > 1;
    if (counter >0 && counter <21 && zeitabgabe=='2' && toshow)
    {
      $('#abgabe_text').addClass('slide-down');
    }
    else if (counter < 1)
    {
      time_diff = 0;
      clearInterval(interval);
      //console.log(parseInt(time_diff_left)*1000);
      //console.log('Time out');
      
        if(!LetzteSeite)
        {
          document.getElementById('u_lastpage').click();          
        }
        else
        {
          schliessSofort();
        }
        clearInterval(interval);
        TimerStarted = false;
      }
    if(LetzteSeite && counter <0)
      clearInterval(interval);
  }, 1000);
}

function InitAutoComplete()
{
  if(AutocompleteVariabeln.length>0)
  {
    AutocompleteVariabeln.forEach(item=>
    {
      const varname= item.varname;
      const liste_name = item.liste_name;
      const minLength = item.zeigen_nach;
      const abhaengig_von = item.abhaengig_von;
      if(AlleTextListen[liste_name])
      {
        $( `input[name="${varname}"]` ).autocomplete({
          source:  !abhaengig_von || abhaengig_von=="" ? AlleTextListen[liste_name] : [],
          change: _removeIfInvalid,
          select: (event, ui)=>_nachSelect(event, ui,item),
          minLength: minLength,
          autoFocus: true
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
          return $( "<li>" )
            .append( "<div>" + item.value + "</div>" )
            .appendTo( ul );
        };
        $( `input[name="${varname}"]` ).click(function(){
          $( this ).removeClass('red-border');
        })
        .tooltip({
          classes: {
            "ui-tooltip": "ui-state-highlight"
          }
        });     
      }
    })
  }
}
const _nachSelect = function (event, ui,item)
{
  const ItemData = ui.item;
  const varname= item.varname;
  const KindVar = AutocompleteVariabeln.filter(kind=>kind.abhaengig_von == varname);
  const abhaengig_von = item.abhaengig_von;
  KindVar.forEach(element =>    
  {
    
    const liste_name = element.liste_name;
    if(!AlleTextListen[liste_name])
      return;
    const source = AlleTextListen[liste_name].filter((k)=>{
      return k.text2 == ItemData.value;
    });
    $( `input[name="${element.varname}"]` )
    .autocomplete("option", "source", source)
    .autocomplete("search", "");
  });
  document.activeElement.blur();
  console.log(ui);
}
function _removeIfInvalid( event, ui )
{
  if ( ui.item ) {
    return;
  }

  /*const input = event.currentTarget
  const value = $(input).val();
  $(input).attr( "title", "[" + value + "] ist nicht annehmbar!! " )
  .tooltip( "open" )
  .addClass('red-border');
  setTimeout(function() {
    $(input).tooltip( "close" ).attr( "title", "" );
  }, 2500 );*/

}
console.log('Rechenzeichen plugin')

let letzte_cursor_pos = 0;
let letzte_geklickte_input = 'NICHTGEKLICKTBISHER';

const alle_knoepfe = {
    Loechen : '<button class="calc-zeichen-btn del blau" title="Löschen">⌫</button>',
    Plus : '<button class="calc-zeichen-btn" title="Plus">+</button>',
    Minus : '<button class="calc-zeichen-btn" title="Minus">&minus;</button>',
    Mal : '<button class="calc-zeichen-btn mal-font" title="Mal">●</button>',
    Durch : '<button class="calc-zeichen-btn durch-font" title="Geteilt durch">&#8758;</button>',
    Gleich : '<button class="calc-zeichen-btn" title="Gleich">&#61;</button>',
    Weniger : '<button class="calc-zeichen-btn weniger-symbole" title="Weniger"></button>',
    Groesser : '<button class="calc-zeichen-btn groaser-symbole" title="Größer"></button>',
    Wurzel : '<button class="calc-zeichen-btn" title="Wurzel">&radic;</button>',
    Prozent : '<button class="calc-zeichen-btn" title="Prozent">%</button>',
    Komma : '<button class="calc-zeichen-btn" title="Komma">,</button>',
    Plus_Minus : '<button class="calc-zeichen-btn" title="Plus/Minus">&#177;</button>',
    Nicht_gleich : '<button class="calc-zeichen-btn" title="Nicht gleich">&#8800;</button>',
    Grad : '<button class="calc-zeichen-btn" title="Grad">&deg;</button>',
    '1' : '<button class="calc-zeichen-btn">1</button>',
    '2' : '<button class="calc-zeichen-btn">2</button>',
    '3' : '<button class="calc-zeichen-btn">3</button>',
    '4' : '<button class="calc-zeichen-btn">4</button>',
    '5' : '<button class="calc-zeichen-btn">5</button>',
    '6' : '<button class="calc-zeichen-btn">6</button>',
    '7' : '<button class="calc-zeichen-btn">7</button>',
    '8' : '<button class="calc-zeichen-btn">8</button>',
    '9' : '<button class="calc-zeichen-btn">9</button>',
    '0' : '<button class="calc-zeichen-btn">0</button>',
    'Leer' : '<div class="leer-calc-zeichen-btn">&nbsp</div>'
};

let setie_mat_symbole = '';

$(document).ready(function()
{
    $('#content').prepend(`
        <div class="show-calc-button" id="mathe_zeichen_button" onclick="calcContainerZeigen();"><img src="../bundles/concertopanel/files/mathezeichen_final.png?v1"></div>
        <div id="calc_container_dialog" title="Rechenzeichen">
            <div class="calc-zeichen-container" id="calc_container"></div>
        </div>`);

    $( "#calc_container_dialog" ).dialog({
        dialogClass: "calc-container-dialog",
        autoOpen: false,
        resizable: false,
        width: 174,
        position: { my: "center", at: "66", of:  "#mathe_zeichen_button"},
        height: "auto"
    }).dialog("widget").find(".ui-dialog-titlebar").hide();  
      
    $('.ui-dialog-titlebar-close').attr('title','Schließen').html('')
    
    $('.input-var-item').on('focus',function(e){
        setlContainerZeigenInput(this.id);    	
    });

    $('.input-var-item').on('mouseup',function(e){
        letzte_cursor_pos = e.target.selectionStart;
    });

    $('.input-var-item').on('keyup',function(e){
        letzte_cursor_pos = e.target.selectionStart;
    });

    if(window.Mathezeichen != '0' && window.Mathezeichen != '')
    {
        setie_mat_symbole = getMatheSymbole();
        $('.show-calc-button').show();
    }
    else
    {
        $('.show-calc-button').hide();
    }
});

  function calcContainerZeigen()
  {
  	$( "#calc_container_dialog" ).dialog( "open" );
  }
  
  function calcContainerSchliessen()
  {
  	$( "#calc_container_dialog" ).dialog( "close" );
  }
  
  function setlContainerZeigenInput(obj_id){
  	letzte_geklickte_input = obj_id
  }

  function getMatheSymbole()
  {
    let symb_arr = [];
    switch (window.Mathezeichen) {
        case '1':
            symb_arr.push(alle_knoepfe.Loechen);
            symb_arr.push(alle_knoepfe.Plus);
            symb_arr.push(alle_knoepfe.Minus);
            symb_arr.push(alle_knoepfe.Mal);
            symb_arr.push(alle_knoepfe.Durch);
            symb_arr.push(alle_knoepfe.Weniger);
            symb_arr.push(alle_knoepfe.Groesser);
            symb_arr.push(alle_knoepfe.Wurzel);
            symb_arr.push(alle_knoepfe.Prozent);
            symb_arr.push(alle_knoepfe.Plus_Minus);
            symb_arr.push(alle_knoepfe.Nicht_gleich);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe['1']);
            symb_arr.push(alle_knoepfe['2']);
            symb_arr.push(alle_knoepfe['3']);
            symb_arr.push(alle_knoepfe['4']);
            symb_arr.push(alle_knoepfe['5']);
            symb_arr.push(alle_knoepfe['6']);
            symb_arr.push(alle_knoepfe['7']);
            symb_arr.push(alle_knoepfe['8']);
            symb_arr.push(alle_knoepfe['9']);
            symb_arr.push(alle_knoepfe.Gleich);
            symb_arr.push(alle_knoepfe['0']);
            symb_arr.push(alle_knoepfe.Komma);
            break;
        case '2':
            symb_arr.push(alle_knoepfe.Loechen);
            symb_arr.push(alle_knoepfe.Plus);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Minus);
            symb_arr.push(alle_knoepfe.Mal);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Durch);
        break;
        case '3':
            symb_arr.push(alle_knoepfe.Loechen);
            symb_arr.push(alle_knoepfe.Plus);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Minus);
            symb_arr.push(alle_knoepfe.Mal);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Durch);
            symb_arr.push(alle_knoepfe.Weniger);
            symb_arr.push(alle_knoepfe.Gleich);
            symb_arr.push(alle_knoepfe.Groesser);
        break;
        case '4':
            symb_arr.push(alle_knoepfe.Loechen);
            symb_arr.push(alle_knoepfe.Plus);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Minus);
            symb_arr.push(alle_knoepfe.Mal);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Durch);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe.Leer);
            symb_arr.push(alle_knoepfe['1']);
            symb_arr.push(alle_knoepfe['2']);
            symb_arr.push(alle_knoepfe['3']);
            symb_arr.push(alle_knoepfe['4']);
            symb_arr.push(alle_knoepfe['5']);
            symb_arr.push(alle_knoepfe['6']);
            symb_arr.push(alle_knoepfe['7']);
            symb_arr.push(alle_knoepfe['8']);
            symb_arr.push(alle_knoepfe['9']);
            symb_arr.push(alle_knoepfe.Komma);
            symb_arr.push(alle_knoepfe['0']);
            symb_arr.push(alle_knoepfe.Gleich);
        break;
        default:
            symb_arr = [];
            break;
    }
    setie_mat_symbole = symb_arr.join(' ');
    setie_mat_symbole += '<button class="calc-zeichen-btn close blau" title="Schließen">Schließen</button>'
    $('#calc_container').html(setie_mat_symbole);
    $('.groaser-symbole').text(">");
    $('.weniger-symbole').text("<");

    $('.calc-zeichen-btn').click(function(e)
    {   
        const clickedButton = e.target;
        if(clickedButton.classList.contains('close'))
        {
            calcContainerSchliessen();
            return;
        }

		const feld = document.getElementById(letzte_geklickte_input)
        if(feld)
        {
            const aktuelle_text = feld.value;
            const fled_val = this.innerHTML.replace('&lt;','<').replace('&gt;','>')
            if(clickedButton.classList.contains('del'))
            {

                if(aktuelle_text.length && letzte_cursor_pos>0)
                {
                    const txt1 = aktuelle_text.substring(0,letzte_cursor_pos-1);
                    const txt2 =  aktuelle_text.substring(letzte_cursor_pos, aktuelle_text.length);
                    feld.value = `${txt1}${txt2}`;
                    letzte_cursor_pos--;
                }
            }
            else 
            {                
                if(letzte_cursor_pos==0)
                {
                    feld.value = `${fled_val}${aktuelle_text}`;
                }
                else
                {
                    const txt1 = aktuelle_text.substring(0,letzte_cursor_pos);
                    const txt2 =  aktuelle_text.substring(letzte_cursor_pos, aktuelle_text.length);
                    feld.value = `${txt1}${fled_val}${txt2}`;
                }
                letzte_cursor_pos++;
            }
            feld.focus();
            feld.setSelectionRange(letzte_cursor_pos,letzte_cursor_pos)
        }
    });
  }
console.log('tmp_edit_tastatur tastatur')
var FirstLoad = true;
var FiledTastatur = {};
var LastFocued = "";
let Keyboard = window.SimpleKeyboard.default;
let aktuelleObjekt = null;
const defaultTheme = "hg-theme-default";
const feldoriginalwidth=[];
const tastatur = [];
const shifttastatur = [];
var LastKeyboardCartePos = 0;
var InputFocusted = false;
var tastaturStartPos = false;
var keyboardAttached = false;
var mouseuped = false;
var touched = false;
var ersteKeyboardClick = false;
let HauptTastaturTyp = 0;
var SeiteTastatus = 0;
let HauptTastaturTyps = [];
var hardware_used = '';
var urlSearchParams = new URLSearchParams(window.location.search);
var params = Object.fromEntries(urlSearchParams.entries());
var debug_mode = typeof params.debug != 'undefined' && params.debug;
var debug_text_mode = typeof params.debug_text != 'undefined' && params.debug_text;
var IsAndroidFirefox = navigator.userAgent.includes("Firefox") && navigator.userAgent.includes("Andriod");
var keyboardMode = 'default';

    tastatur[0] = [
     "^ 1 2 3 4 5 6 7 8 9 0 \u00DF \u00B4 {bksp}",
     "{tab} q w e r t z u i o p \u00FC",
     "{lock} a s d f g h j k l \u00F6 \u00E4 # {enter}",
     "{shift} < y x c v b n m , . - {shift}",
     ".com @ {space}",
    ];

    tastatur[1] = 
    {
        default: [
            "{abc} {ABC} {123} {symbole}",
            "q w e r t z u i o p",
            "a s d f g h j k l ß",
            "y x c v b n m ä ö ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        uppercase: [
            "{abc} {ABC} {123} {symbole}",
            "Q W E R T Z U I O P",
            "A S D F G H J K L ß",
            "Y X C V B N M Ä Ö Ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        math : [
            "{abc} {ABC} {123} {symbole}",
            "7 8 9 + –",
            "4 5 6 • :",
            "1 2 3 = %",
            "0 , {space_2fachebreite} {bksp}",
        ],
        symbol : [
            "{abc} {ABC} {123} {symbole}",
            "+ – • : = / @",
            "! < > ( ) % °",
            "? € $ ^ ' \" ;",          
            ". , {space_3fachebreite} {bksp2}",
        ]
    };

    tastatur[2] = {
        default: [
            "{abc} {ABC} [{123}] [{symbole}]",
            "q w e r t z u i o p",
            "a s d f g h j k l ß",
            "y x c v b n m ä ö ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        uppercase: [
            "{abc} {ABC} [{123}] [{symbole}]",
            "Q W E R T Z U I O P",
            "A S D F G H J K L ß",
            "Y X C V B N M Ä Ö Ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        math : [
            "{abc} {ABC} [{123}] [{symbole}]",
            "7 8 9 + –",
            "4 5 6 • :",
            "1 2 3 = %",
            "0 , {space_2fachebreite} {bksp}",
        ],
        symbol : [
            "{abc} {ABC} [{123}] [{symbole}]",
            "+ – • : = / @",
            "! < > ( ) % °",
            "? € $ ^ ' \" ;",          
            ". , {space_3fachebreite} {bksp2}",
        ]
	
    };

    tastatur[3] = {
        default: [
            "[{abc}] [{ABC}] {123} [{symbole}]",
            "q w e r t z u i o p",
            "a s d f g h j k l ß",
            "y x c v b n m ä ö ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        uppercase: [
            "[{abc}] [{ABC}] {123} [{symbole}]",
            "Q W E R T Z U I O P",
            "A S D F G H J K L ß",
            "Y X C V B N M Ä Ö Ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        math : [
            "[{abc}] [{ABC}] {123} [{symbole}]",
            "7 8 9 {+} {–}",
            "4 5 6 {•} {:}",
            "1 2 3 {=} {%}",
            "0 , {space_2fachebreite} {bksp}",
        ],
        symbol : [
            "[{abc}] [{ABC}] {123} [{symbole}]",
            "+ – • : = / @",
            "! < > ( ) % °",
            "? € $ ^ ' \" ;",          
            ". , {space_3fachebreite} {bksp2}",
        ]
	
    }
    ;
    tastatur[4] = {
        default: [
            "[{abc}] [{ABC}] {123} {symbole}",
            "q w e r t z u i o p",
            "a s d f g h j k l ß",
            "y x c v b n m ä ö ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        uppercase: [
            "[{abc}] [{ABC}] {123} {symbole}",
            "Q W E R T Z U I O P",
            "A S D F G H J K L ß",
            "Y X C V B N M Ä Ö Ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        math : [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "7 8 9 + –",
            "4 5 6 • {:}",
            "1 2 3 = %",
            "0 {,} {space_2fachebreite} {bksp}",
        ],
        symbol : [
            "[{abc}] [{ABC}] {123} {symbole}",
            "+ – • : = / {@}",
            "{!} {<} {>} ( ) % {°}",
            "{?} {€} {$} {^} {'} {\} {;}",          
            "{.} {,} {space_3fachebreite} {bksp2}",
        ]
	
    };
    
    tastatur[5] = {
        default: [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "q w e r t z u i o p",
            "a s d f g h j k l ß",
            "y x c v b n m ä ö ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        uppercase: [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "Q W E R T Z U I O P",
            "A S D F G H J K L ß",
            "Y X C V B N M Ä Ö Ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        math : [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "7 8 9 + –",
            "4 5 6 • :",
            "1 2 3 = %",
            "0 , {space_2fachebreite} {bksp}",
        ],
        symbol : [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "+ – • : = {/} {@}",
            "{!} {<} {>} {(} {)} {%} {°}",
            "{?} {€} {$} {^} {'} {\} {;}",          
            "{.} {,} {space_3fachebreite} {bksp2}",
        ]	
    };
    
    tastatur[6] = {
        default: [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "q w e r t z u i o p",
            "a s d f g h j k l ß",
            "y x c v b n m ä ö ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        uppercase: [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "Q W E R T Z U I O P",
            "A S D F G H J K L ß",
            "Y X C V B N M Ä Ö Ü",
            ". , {space_6fachebreite} {bksp2}"
        ],
        math : [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "7 8 9 + –",
            "4 5 6 • :",
            "1 2 3 = %",
            "0 , {space_2fachebreite} {bksp}",
        ],
        symbol : [
            "[{abc}] [{ABC}] [{123}] {symbole}",
            "{+} {–} {•} {:} = {/} {@}",
            "{!} < > {(} {)} {%} {°}",
            "{?} {€} {$} {^} {'} {\} {;}",          
            "{.} {,} {space_3fachebreite} {bksp2}",
        ]	
    };
/*
"+ – • : = / @",
"< > ( ) % ° &",
"€ $ ^ * ' \" ;",          
"● , ? ! {space_2fachebreite} {bksp}",*/

    shifttastatur[0] = [
        '\u00B0 ! " \u00A7 $ % & / ( ) = ? ` • ● {bksp}',
        "Q W E R T Z U I O P \u00DC",
        "A S D F G H J K L \u00D6 \u00C4 ' {enter}",
        "{shift} > Y X C V B N M ; : _ {shift}",
        "{space}"
    ];
    

 let TastaturLayout = tastatur[1];

 let keyboard = null;

const resetWidth = function(item_id)
{
   let item = $('#'+item_id)
}

function insertAtCaret(text) {

    const editor = document.activeElement;
    editor.focus();
  
    const selection = window.getSelection();
  
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    range.deleteContents();
  
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
  
    // Move cursor after inserted text
    range.setStartAfter(textNode);
    range.collapse(true);
  
    selection.removeAllRanges();
    selection.addRange(range);
  }

function onChange(input)
{    
    if(!aktuelleObjekt)
    {
        console.error('IFBQ ERROR: Kein aktuelles Objekt (aktuelleObjekt Variable) zum Einfügen gefunden.');
        return
    }
    const input_id = '#'+aktuelleObjekt;
    document.querySelector(input_id).value = input;
    if ($(input_id).hasClass('ifbq-keyboard-input'))
    {
    	resetWidth(aktuelleObjekt);
    }

    setCursor(aktuelleObjekt,LastKeyboardCartePos);
}

function getTastaturDefault(index)
{
    let layoutname = "abc";
    let classtname = "default";
    index = parseInt(index);
    switch (index) {
        case 0:
        case 1:
            layoutname = "abc"
            classtname = "default"
            break;
        case  2:
            layoutname = "ABC"
            classtname = "uppercase"
            break;
        case  3:
            layoutname = "123"
            classtname = "math"
            break;
        case  4:
            layoutname = "symbole"
            classtname = "symbol"
            break;
    }
    
    keyboard.setOptions({
        theme: defaultTheme
    });
    return {layoutname:`{${layoutname}}`,classtname};
}

function handleSpecialButton(params,fest = false)
{
    $('.hg-rows .hg-row:first .hg-button').removeClass('clicked');
    let layoutname = "default"
    let buttonclass = ".hg-button-"+params.replace('{','').replace('}','');
    switch (params) {
        case "{abc}":
            layoutname = "default"
            break;
        case  "{ABC}":
            layoutname = "uppercase"
            break;
        case  "{123}":
            layoutname = "math"
            break;
        case  "{symbole}":
            layoutname = "symbol"
            buttonclass = ".hg-theme-default .hg-rows .hg-row:first-child .hg-button:last-child"
            break;    
        default:
            layoutname = "default"
            break;
    }
    
    keyboard.setOptions({
        layoutName: layoutname
    });
    $('.hg-rows .hg-row:first .hg-button').removeClass('clicked');
    $(buttonclass).addClass('clicked').prop('disabled',false).removeClass('ha-disabled');

}

function onKeyPress(button) {
    tastaturStartPos = false;
    let buttonclass = "hg-button-"+button.replace('{','').replace('}','');
    if(document.getElementsByClassName(buttonclass).length && document.getElementsByClassName(buttonclass)[0].className.includes('ha-disabled'))
        return false;
    if (button === "{shift}" || button === "{lock}")
    {
        handleShift();        
    }
    else if (button === "{abc}" || button === "{ABC}" || button === "{123}" || button === "{symbole}")
    {
        const TastId = {"{abc}":0,"{ABC}":1,"{123}":2,"{symbole}":3};
        if(HauptTastaturTyps.includes(TastId[button]))
        {
             return false;
        }
           
        handleSpecialButton(button);
    }
    else if (button === "{•}" || button === "{+}" || button === "{–}" || button === "{:}" || button === "{%}" || button === "{=}")
    {
        return;
    }
    else if (button === "{enter}")
    {
        if(LastKeyboardCartePos>1)
            LastKeyboardCartePos = LastKeyboardCartePos-1;
        else
        {
            LastKeyboardCartePos = 0;
            tastaturStartPos = true;
        }
        handleEnter();
    }        
    else if (button === "{bksp}" || button === "{bksp2}")
    {
        if(LastKeyboardCartePos>1)
            LastKeyboardCartePos = LastKeyboardCartePos-2;
        else
        {
            LastKeyboardCartePos = 0;
            tastaturStartPos = true;
        }
        if(debug_mode)
        {
            console.log( 'onKeyPress'+LastKeyboardCartePos)
            //document.getElementById('header_teil').innerText = 'LastKeyboardCartePos'+LastKeyboardCartePos
        }
        
    }
}

function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";
    let shiftLabel = currentLayout === "default" ? "Kleinbuchstaben aA" : "Großbuchstaben aA";

    keyboard.setOptions({
    	layoutName: shiftToggle
    });
    $('.hg-button-shift').text(shiftLabel);
}

function getCursorPosition(element) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // For <input> and <textarea>, use selectionStart
        return element.selectionStart;
    } else if (element.isContentEditable) {
        // For contenteditable elements, use Selection and Range APIs
        const selection = window.getSelection();
        if (!selection.rangeCount) return -1;

        const range = selection.getRangeAt(0);
        const clonedRange = range.cloneRange();
        clonedRange.selectNodeContents(element);
        clonedRange.setEnd(range.startContainer, range.startOffset);

        return clonedRange.toString().length; // Cursor position as character offset
    }
    return -1; // Unsupported element
}

function handleEnter() {  
    const oField =document.getElementById(aktuelleObjekt);  
    const pos = getCursorPosition(oField);
    const text =  keyboard.getInput();
    keyboard.setCaretPosition(pos);
    const neueText = text.substring(0,pos)+"\n"+text.substring(pos,text.length);
    keyboard.setInput(neueText);
    keyboard.setCaretPosition(LastKeyboardCartePos);
    setCursor(oField,LastKeyboardCartePos);
}
function getTheme(currentLayout)
{
    switch (currentLayout) {
        case 1:
            return "hg-theme-default";
        break;
        case 2:
            return "hg-theme-uppercase";
        break;
        case 3:
            return "hg-theme-math";
        break;
        case 4:
            return "hg-theme-symbol";
        break;
        default:
            return "hg-theme-default"
        break;
    }
}
function showKeyboard(KeybordTastatur)
{
    keyboard.setOptions({
        theme: `${defaultTheme} show-keyboard`
    });
    
    if(!$('.simple-keyboard-container').is(':visible'))
    {
        let currentLayout = keyboard ? keyboard.options.layoutName : "default";

        switch (SeiteTastatus) {
            case 1:
                handleSpecialButton('{abc}',true)
            break;
            case 2:
                handleSpecialButton('{ABC}',true)
            break;
            case 3:
                handleSpecialButton('{123}',true)
            break;
            case 4:
                handleSpecialButton('{symbole}',true)
            break;    
            default:
                handleSpecialButton('{abc}',false)
            break;
        }
    
        let kOptions = null;
        if(KeybordTastatur)
        {
            
            kOptions = getTastaturDefault(TastaturTyp);
            handleSpecialButton(kOptions.layoutname);
        }
        else if(currentLayout == "default")
        {
            document.getElementsByClassName("hg-button-abc")[0].classList.add('clicked');
        }
    
          const footerHeight = $('#footer_teil').height();
          const kHeight = $('.simple-keyboard-container').height()+190;
          //const kHeight = $('.simple-keyboard-container').height()+footerHeight+70;
          $('#mittle_teil').css('height', 'calc(100vh - ' + (kHeight) +'px)');
        
        const CurrentTheme = getTheme();

        $('.simple-keyboard-container').show();
    }    
}

function hideKeyboard()
{
    keyboard.setOptions({
        theme: defaultTheme
    });
    $('.simple-keyboard-container').hide();  
  	$('#mittle_teil').css('height', 'calc(100vh - 179px)');
}

function FillAkzeptierteTyps(TastaturLayout)
{
    HauptTastaturTyps = [];
    const KnopfItem = TastaturLayout.default[0].split(' ');
    HauptTastaturTyp = 0;
    KnopfItem.forEach((element,index) => 
    {        
        const item = $('.hg-rows .hg-row:first .hg-button')[index];
        //$(item).addClass('clicked').prop('disabled',false).removeClass('ha-disabled');
        
        //$('.hg-rows .hg-row:first .hg-button').removeClass('clicked');
        if(element[0]=='[')
        {
            HauptTastaturTyps.push(index);
            $(item).addClass('ha-disabled');
        }
        else if(HauptTastaturTyp == 0)
        {
            HauptTastaturTyp = index+1;
            showKeyboard(HauptTastaturTyp)
        }   
    });
}

function simulateBackspaceDelete() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // Check if the range is collapsed (no text selected)
        if (range.collapsed) {
            const { startContainer, startOffset } = range;

            // If the cursor is at the start of a node, delete the previous sibling or parent node
            if (startOffset === 0) {
                let parentNode = startContainer;

                // Traverse up to find the nearest removable element
                while (parentNode && parentNode.nodeType !== Node.ELEMENT_NODE) {
                    parentNode = parentNode.parentNode;
                }

                // Check if the parentNode is a removable element
                if (parentNode && parentNode.matches('fraction-div, up-div, down-div')) {
                    parentNode.remove(); // Remove the entire element
                } else if (startContainer.previousSibling) {
                    // Remove the previous sibling if no removable parent is found
                    startContainer.previousSibling.remove();
                }
            } else {
                // Otherwise, move the start of the range one character backward
                range.setStart(startContainer, Math.max(0, startOffset - 1));
            }
        }

        // Delete the contents of the range
        range.deleteContents();
    }
}

function contentEditableKeyPress(button) {

  if (button.length === 1) {
    insertAtCaret(button);
  }

  if (button === "{bksp}" || button === "{bksp2}") {
    simulateBackspaceDelete();
    return;
  }

  if (button === "{space}" || button === "{space_2fachebreite}" || button === "{space_3fachebreite}" || button === "{space_4fachebreite}" || button === "{space_5fachebreite}" || button === "{space_6fachebreite}" || button === "{space_7fachebreite}") {
    insertAtCaret(" ");
    return;
  }

  return onKeyPress(button);
}

function contentEditableChange(button) {

    return onChange(button);
}

function globalOnKeyPress(button) {

    switch (keyboardMode) {

        case "contentEditable":
            return contentEditableKeyPress(button);

        default:
            return onKeyPress(button);
    }
}

function globalOnChange(input) {

    switch (keyboardMode) {

        case "contentEditable":
            return contentEditableChange(input);

        default:
            return onChange(input);
    }
}

function setKeyBoard(taste_id,hardwareModel)
{
    hardware_used = hardwareModel;
    TastaturLayout = tastatur[taste_id];
    TastaturShiftObj = shifttastatur[taste_id];
    keyboard = new Keyboard({
        theme: defaultTheme,
        disableButtonHold: true,
        onChange: input => globalOnChange(input),
        onKeyPress: button => globalOnKeyPress(button),
        layout: TastaturLayout,
        display: {
            "{escape}": "esc ⎋",
            "{symbole}": "#+=",
            "{123}": "123",
            "{ABC}": "ABC",
            "{abc}": "abc",
            "{bksp}": "Rücktaste ⌫",
            "{bksp2}": "Rücktaste ⌫",
            "{bksp3}": "Rücktaste ⌫",
            "{bksp4}": "Rücktaste ⌫",
            "{bksp5}": "Rücktaste ⌫",
            "{bksp6}": "Rücktaste ⌫",
            "{bksp7}": "Rücktaste ⌫",
            "{altright}": ".?123",
            "{capslock}": "Festelltaste ⇪",
            "{downkeyboard}": "🞃",
            "{space}": "Leertaste",
            "{space_2fachebreite}": "Leertaste",
            "{space_3fachebreite}": "Leertaste",
            "{space_4fachebreite}": "Leertaste",
            "{space_5fachebreite}": "Leertaste",
            "{space_6fachebreite}": "Leertaste",
            "{space_7fachebreite}": "Leertaste",
            "{shiftleft}": "Umschalttaste ⇧",
            "{shiftright}": "Umschalttaste ⇧",
            "{default}": "ABC",
            "{enter}": "Eingabe ↵",
            "{back}": "⇦",
            "{•}": "•",
            "{:}": ":",
            "{+}": "+",
            "{@}": "@",
            "{,}": ",",
            "{–}": "-",
            "{=}": "=",
            "{%}": "%",
            "{!}": "!",
            "{<}": "<",
            "{>}": ">",
            "{(}": "(",
            "{)}": ")",
            "{°}": "°",
            "{?}": "?",
            "{€}": "€",
            "{$}": "$",
            "{^}": "^",
            "{'}": "'",
            "{\}": "\\",
            "{/}": "/",
            "{;}": ";",
            "{.}": "."
        }
    });
    /*setTimeout(() => {
        FillAkzeptierteTyps(TastaturLayout);
    }, 200);*/
}

function CheckCovered(inputObjekt)
{
    const ganzBlock = document.getElementById('mittle_teil').getBoundingClientRect();
    const InputObjekt = document.getElementById(inputObjekt).getBoundingClientRect();
    const divTop = document.getElementById(inputObjekt).closest("div").getBoundingClientRect().top;
    const diffHoehe = InputObjekt.top - divTop;
    const data = {
        DivTop:divTop,
        InputTop:InputObjekt.top,
        FensterHoehe:ganzBlock.height,
        zwichenDivUndTitle:diffHoehe,
        ganzBlockTop:ganzBlock.top,
        ganzBlockBottom:ganzBlock.bottom
    }
    return data;    
}

function setKeyBoardReady(input_class)
{
    const inputDOM = document.querySelector(input_class);
    
    inputDOM.addEventListener("focus", (event) =>
    {
        const alteFeldId = aktuelleObjekt;

    	aktuelleObjekt = event.target.id;

        const feld_name = event.target.name;

        let KeybordTabIndex = null;

        if(typeof(FiledTastatur)!= 'undefined' && FiledTastatur[feld_name] && LastFocued!=feld_name)
        {

            const erwrteteTastatur = FiledTastatur[feld_name];
            KeybordTabIndex = 4;
            if(erwrteteTastatur<3)
                KeybordTabIndex = 1;
            else if(erwrteteTastatur<5)
                KeybordTabIndex = 3;
        }

        LastFocued = feld_name;

        if(!InputFocusted || alteFeldId != aktuelleObjekt)
        {
            keyboard.setInput(event.target.value);
        }
   	 	showKeyboard(KeybordTabIndex);
        InputFocusted = true;
        if(alteFeldId != aktuelleObjekt)
        {   setTimeout(function ()
            {
                const checkDaten = CheckCovered(aktuelleObjekt);
                if(checkDaten.InputTop>checkDaten.ganzBlockBottom)
                {
                    if(checkDaten.FensterHoehe>checkDaten.zwichenDivUndTitle)
                        document.getElementById(aktuelleObjekt).closest("div").scrollIntoView({behavior: 'smooth' });
                    else
                        document.getElementById(aktuelleObjekt).scrollIntoView({behavior: 'smooth' });
                }
            }, 300);             
        }
    });

    inputDOM.addEventListener("blur", (event) => {
    	InputFocusted = false;
    });

    inputDOM.addEventListener("input", (event) => {
        const oField = event.target;
    	keyboard.setInput(oField.value);
        InputFocusted = true;
        oField.focus();
        LastKeyboardCartePos = keyboard.getCaretPosition()
        if(!tastaturStartPos)
        {   

            const pos =  event.inputType ? LastKeyboardCartePos : getCursorPosition(oField);

            let posToAdd =1;
            if(event.inputType && event.inputType == 'deleteContentBackward')
                posToAdd =-1;
            else if(event.inputType && event.inputType == 'deleteContentBackward')
                posToAdd =0;

            LastKeyboardCartePos = pos+posToAdd;
        }
        keyboard.setCaretPosition(LastKeyboardCartePos);
        setCursor(oField,LastKeyboardCartePos); 
        if(debug_mode)
        {
            console.log( 'input CartePos '+LastKeyboardCartePos)
            //document.getElementById('header_teil').innerText = 'LastKeyboardCartePos'+LastKeyboardCartePos
        }
        
        if(debug_text_mode)
        {
            document.getElementById('debug_text_mode').value = LastKeyboardCartePos;
            //document.getElementById('header_teil').innerText = 'LastKeyboardCartePos'+LastKeyboardCartePos
        }
    });    
}

function resetKeyBoard()
{
    if(keyboard)
    {
        ersteKeyboardClick = false;
        keyboardAttached = true;
        $('.ifbq-keyboard-input').each(function(i, obj)
        {
            obj.setAttribute('inputmode',"none");
            setKeyBoardReady('#'+obj.id);
        });
    }
}

function setCursor(node,pos){

    node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;

    if(!node){
        return false;
    }else if(node.createTextRange){
        var textRange = node.createTextRange();
        textRange.collapse(true);
        textRange.moveEnd(pos);
        textRange.moveStart(pos);
        textRange.select();
        return true;
    }else if(node.setSelectionRange){
        node.setSelectionRange(pos,pos);
        return true;
    }

    return false;
}

function FireKeyboardEvent(eventObj)
{
    const ButtonItem = eventObj.target;
    const headerItem = $(ButtonItem).hasClass('hg-button-abc') 
        || $(ButtonItem).hasClass('hg-button-ABC') 
        || $(ButtonItem).hasClass('hg-button-123') 
        || $(ButtonItem).hasClass('hg-button-symbole');

    if (
        keyboard &&
        !InputFocusted &&
        ButtonItem.id != 'testHtml' && typeof(ButtonItem.className) == 'string' &&
        keyboard.options.theme.includes("show-keyboard") &&
        !ButtonItem.className.includes("hg-button") &&
        !ButtonItem.className.includes("hg-row") &&
        !ButtonItem.className.includes("simple-keyboard") &&
        !ButtonItem.className.includes("ifbq-keyboard-input") &&
        !ButtonItem.className.includes("ng-isolate-scope") 
    )
    {
        aktuelleObjekt = null;
        hideKeyboard();
    }
    else if(!headerItem && aktuelleObjekt && typeof(ButtonItem.className) == 'string'  &&
            (ButtonItem.className.includes("input") ||
            ButtonItem.className.includes("ifbq-keyboard-input") ||
            ButtonItem.className.includes("hg-button") ||
            ButtonItem.className.includes("simple-keyboard")))
    {
        const oField = document.getElementById(aktuelleObjekt);
        const pos = getCursorPosition(oField);
        if(ButtonItem.className.includes("hg-button"))
        {
            oField.dispatchEvent(new Event("input")); 
        } 
        else
        {
            LastKeyboardCartePos = pos;
            keyboard.setCaretPosition(LastKeyboardCartePos);
            setCursor(oField,LastKeyboardCartePos);
        }
    }
}

function setKeyboardHeader() {
    
    let currentLayout = keyboard ? keyboard.options.layoutName : "default";
    switch (currentLayout) {
        case "default":
            $(".hg-button-abc").addClass('clicked');
        break;
        case "uppercase":
            $(".hg-button-ABC").addClass('clicked');
        break;
        case "math":
            $(".hg-button-123").addClass('clicked');
        break;
        case "symbol":
            $(".hg-button-symbole").addClass('clicked');
        break;    
        default:
            $(".hg-theme-default .hg-rows .hg-row:first-child .hg-button:last-child").addClass('clicked');
        break;
    }
}

$( document ).ready(function()
{  
    document.addEventListener("mouseup", (event) => 
    { 
        setKeyboardHeader();
        if(!touched)
        {
            if(IsAndroidFirefox && event.target.className.includes("ifbq-keyboard-input"))
            {
                const oField = document.getElementById(aktuelleObjekt);
                const pos =  getCursorPosition(oField);
                keyboard.setCaretPosition(pos);
            }

            mouseuped = true;
            FireKeyboardEvent(event);
        }
        else
        {
            touched = false;
        }
    });

    document.addEventListener("touchend", (event) => 
    {
        setKeyboardHeader();
        if(!mouseuped)
        {
            if(IsAndroidFirefox && event.target.className.includes("ifbq-keyboard-input"))
            {
                const oField = document.getElementById(aktuelleObjekt);
                const pos = getCursorPosition(oField);
                keyboard.setCaretPosition(pos);
            }
            touched = true;
            FireKeyboardEvent(event);
        }
        else
        {
            mouseuped = false;
        }
    });

    document.addEventListener("selectionchange", (event) =>
    {
        setKeyboardHeader();
        const oField = document.activeElement;
        if(keyboard && oField.className.includes("ifbq-keyboard-input"))
        {
            LastKeyboardCartePos = getCursorPosition(oField);
            keyboard.setCaretPosition(LastKeyboardCartePos);
            setCursor(oField,LastKeyboardCartePos);
        }
    });
    
    if(debug_text_mode)
    {
        const debugField = document.createElement('input');
        debugField.id = 'debug_text_mode';
        setTimeout(() => {
            document.getElementById('header_teil').appendChild(debugField);
        }, 3000);
    }
});

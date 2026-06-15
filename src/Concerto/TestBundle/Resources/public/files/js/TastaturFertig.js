$( document ).ready(function()
{   
    const checkElement = document.body;

    if (tastatur_ist_moeglich && checkElement.getAttribute('listener') !== 'true')
    {
        checkElement.setAttribute('listener', 'true');
        document.addEventListener("click", (event) => 
        {
            if (
                keyboard &&
                !InputFocusted &&
                event.target.id != 'testHtml' &&
                keyboard.options.theme.includes("show-keyboard") &&
                !event.target.className.includes("hg-button") &&
                !event.target.className.includes("hg-row") &&
                !event.target.className.includes("simple-keyboard") &&
                !event.target.className.includes("ifbq-keyboard-input") &&
                !event.target.className.includes("ng-isolate-scope") 
            )
            {
            aktuelleObjekt = null;
            hideKeyboard();
            }
            else if(aktuelleObjekt && (event.target.className.includes("input") ||
                event.target.className.includes("ifbq-keyboard-input") ||
                event.target.className.includes("hg-button") ||
                event.target.className.includes("simple-keyboard")))
            {
                const oField = document.getElementById(aktuelleObjekt);
                /*if(!event.target.attributes['data-skbtn'] || event.target.attributes['data-skbtn'].value != '{bksp}')
                    LastKeyboardCartePos = oField.selectionStart;
                else
                    LastKeyboardCartePos = oField.selectionStart-1;*/
                if(event.target.className.includes("hg-button"))
                    oField.dispatchEvent(new Event("input"));  
                else
                {
                    const pos = oField.selectionStart;
                    LastKeyboardCartePos = pos;
                    keyboard.setCaretPosition(LastKeyboardCartePos);
                    setCursor(oField,LastKeyboardCartePos);
                    console.log( 'document'+LastKeyboardCartePos)
                }
            }
        });
    }

    if (geraete == 'mobile')
    {
        setKeyBoard(TastaturTyp)
        resetKeyBoard();
    }
});
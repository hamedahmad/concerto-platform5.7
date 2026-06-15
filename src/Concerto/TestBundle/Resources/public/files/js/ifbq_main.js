var FocusAn = true;
var VollBild = true;

function testAus() {
    FocusAn = false;
    document.body.classList.add('paused');
    logFocus('aus')
}

function testAn() {
    FocusAn = true;
    document.body.classList.remove('paused');
    logFocus('an')
}

function logFocus(status)
{
    const focus_logs = document.getElementById('focus_logs');
    const heute  = new Date();
    const tag = heute.getDate()<10 ? '0'+ heute.getDate() : heute.getDate();
    const monat = (heute.getMonth()+1)<10 ? '0'+ (heute.getMonth()+1) : (heute.getMonth()+1);
    const jahr = heute.getFullYear()<10 ? '0'+ heute.getFullYear() : heute.getFullYear();
    const stunde = heute.getHours()<10 ? '0'+ heute.getHours() : heute.getHours();
    const minute = heute.getMinutes()<10 ? '0'+ heute.getMinutes() : heute.getMinutes();
    const sekunde = heute.getSeconds()<10 ? '0'+ heute.getSeconds() : heute.getSeconds();

    const VollZeit = tag + "."
            + monat  + "." 
            + jahr + " "  
            + stunde + ":"  
            + minute + ":" 
            + sekunde;

    const currFocusLogs = focus_logs.value;
    const aktuelleLogs = currFocusLogs.length ? JSON.parse(currFocusLogs) : [];
    const textZumSpeichern = {status:status,zeit:VollZeit}
    aktuelleLogs.push(textZumSpeichern)
    focus_logs.value = JSON.stringify(aktuelleLogs);
}

    window.addEventListener('blur', testAus);
    window.addEventListener('focus', testAn);
    console.log('focus listenaer Added');
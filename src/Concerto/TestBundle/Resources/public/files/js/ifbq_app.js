let zeitTimerId = 0;
let time_diff  = null;
let URL  = '';
function onMessage(event)
{
  const data = event.data.data;      
  console.log(data);
  const totalZeit = parseInt(time_diff)+parseInt(data);
  $('.badge.badge-info').text(totalZeit+' Minuten');
  if(parseInt(data)>0)
  {
    const linkCount = document.getElementsByClassName('navi-link').length-1;
    const nichtFertigCount = document.getElementsByClassName('none_answered').length-1;
    const teilFertigCount = document.getElementsByClassName('part_answered').length-1;
    if(nichtFertigCount<0 && teilFertigCount<0)
      document.getElementsByClassName('navi-link')[linkCount].click();
    else if(teilFertigCount<0)
      document.getElementsByClassName('none_answered')[0].children['navilink'].click();
    else
      document.getElementsByClassName('part_answered')[0].children['navilink'].click();
  }
}

function MehrZeitChecken()
{
	
    const ifr=$('<iframe/>', {
        id:'concertIframe',
        src: URL,
        style:'position: relative; height: 1%; width: 1%;'
    });

    /*ifr.on('load', function(){
        console.log('ifarme loaded')                  			
    });*/
    $('#concertoZeit').html(ifr);
}

function startZeitTimer(passed_time_diff,PassedURL) {
  if(document.getElementById("concertoZeit") !== null)
  {
    time_diff = passed_time_diff;
    URL = PassedURL
    if (window.addEventListener) {
      window.addEventListener("message", onMessage, false);        
    } else if (window.attachEvent) {
      window.attachEvent("onmessage", onMessage, false);
    }
    if(time_diff != null && zeitTimerId == 0)
    {
      zeitTimerId = setInterval (function () {
        MehrZeitChecken();
      }, 20000);
    }
  }
}
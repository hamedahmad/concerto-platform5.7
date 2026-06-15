console.log('scode.dyn.js');

	function returnUmlaute(answer)
	{
		answer = answer.replace(/_ae_/g, 'ä');
		answer = answer.replace(/_AE_/g, 'Ä');
		answer = answer.replace(/_oe_/g, 'ö');
		answer = answer.replace(/_OE_/g, 'Ö');
		answer = answer.replace(/_ue_/g, 'ü');
		answer = answer.replace(/_UE_/g, 'Ü');
		answer = answer.replace(/_ss_/g, 'ß');
		answer = answer.replace(/_SS_/g, 'ß');
		return answer;
	}
	
	function DeadEntwerfen(e)
	{
    	if (e.key === 'Dead') {
            event.preventDefault();
            console.log('Dead key pressed');
           return false;
        }
      return true;
    }

	function changeBiss(e)
	{
		if(DeadEntwerfen(e))
        {

          $(e.target).removeClass('error-feld');
          
          let vn = document.getElementById("vn").value
          .replace(/`/g,'')
          .trim()
          .replace('_','')
          .replace(/%20/g,' ')
          .replace(/-/g,' ');

          let nn = document.getElementById("nn").value
          .replace(/`/g,'')
          .trim()
          .replace(/-/g,' ')
          .replace(/%20/g,' ')
          .replace('_','');
		  
          let gt= document.getElementById("gt").value;
          let gm= document.getElementById("gm").value;
          let ResultSCODE = '';

          if(item_config.typ && item_config.typ ==2)
          {

            vn = vn.replace(/\s+/g, '') //Leerzeichen rausnehmen
            nn = nn.replace(/\s+/g, '') //Leerzeichen rausnehmen
            let Zeichen1 = vn.substring(1, 2);//2. Buchstabe Vorname

            let Zeichen2 = nn.substring(1, 3); //2.Buchstabe Nachname + 3. Buchstabe Nachname

            Zeichen1 = Zeichen1 == 'ß' || Zeichen1 == '`' ? Zeichen1 : Zeichen1.toLocaleUpperCase();
            Zeichen2 = Zeichen2 == 'ß' || Zeichen2 == '`' ? Zeichen2 : Zeichen2.toLocaleUpperCase();
            const Stelle1 = `${Zeichen1}${Zeichen2}`
            const Stelle2 = gt.length===1 ? `0${gt}` : gt;//Geburtstag (2-stellig)
            const Stelle3 = gm.replace(/_/g,'').length===1 ? `0${gm}` : gm; // Geburtsmonat (2-stellig)
            ResultSCODE = `${Stelle1}${Stelle2}${Stelle3}`;
          }
          else
          {
             let Zeichen1 = vn.substring(0, 1);
            let Zeichen2 = vn.split(' ')[0]
            const ZeichenLang = Zeichen2.length;
            Zeichen2 = Zeichen2.substring(ZeichenLang-1);
            let nn_split = nn.split(' ')
            let nn0 = nn_split[0].trim();      
            const ZeichenLang2 = nn0.length;
            let Zeichen3 = nn0.substring(ZeichenLang2-1);
            let letzte_split = nn_split[nn_split.length-1].trim();
            if(ZeichenLang2 < 4 && nn_split.length>1 && letzte_split.length>1)
              Zeichen3 = letzte_split.substring(letzte_split.length-1);
            gt = gt.length===1 ? `0${gt}` : gt;
            gm = gm.replace(/_/g,'').length===1 ? `0${gm}` : gm;

            Zeichen1 = Zeichen1 == 'ß' || Zeichen1 == '`' ? Zeichen1 : Zeichen1.toLocaleUpperCase();
            Zeichen2 = Zeichen2 == 'ß' || Zeichen2 == '`' ? Zeichen2 : Zeichen2.toLocaleUpperCase();
            const Stelle1 = `${Zeichen1}${Zeichen2}`
            const Stelle2 = Zeichen3 == 'ß' || Zeichen3 == '`' ? Zeichen3 : Zeichen3.toLocaleUpperCase();
            const Stelle3 = gt;
            const Stelle4 = gm;
            ResultSCODE = Stelle1 + Stelle2 + Stelle3 + Stelle4;     
          }
           document.getElementById(var_name).value = ResultSCODE;

            localStorage.setItem('vn', document.getElementById("vn").value);
            localStorage.setItem('nn', document.getElementById("nn").value);
            localStorage.setItem('gt', document.getElementById("gt").value);
            localStorage.setItem('gm', document.getElementById("gm").value);
       }
	}
 

$(document).ready(function(){
  
  		let TagNummer = '';
  		for(i=1;i<32;i++)
        {
          const tn = i<10 ? `0${i}` : `${i}`;
          TagNummer+= `<option value="${tn}">${tn}</option>`
        }
  		document.getElementById("vorlage_gt").innerHTML = TagNummer;
  
  		const FrageText =  document.getElementById("haupt_frage_text").value;
  		
  		const VorlageText = document.getElementById("vorlage_block").innerHTML.replace(/vorlage_/g,'').replace(/_VARNAME_/g,var_name);
  		const enterpretierte_frage = FrageText.replace(/<div id="scode_vorlage_bitte_nicht_aendern"([^>]*)(.*?)<\/div>/g,VorlageText);
  		document.getElementById("enterpretierte_frage").innerHTML = enterpretierte_frage;
  
        $("#vn").inputmask({"mask":"*{2,}",
        	definitions: {
          	'*': {
            validator: "[A-Za-z\-\Ü\ü\Ö\ö\Ä\ä\ß ]",
            casing: "localeuppercase"
          }
        }});
        $("#nn").inputmask({"mask":"*{2,}",
        	definitions: {
          	'*': {
            validator: "[A-Za-z\-\Ü\ü\Ö\ö\Ä\ä\ß ]",
            casing: "localeuppercase"
          }
        }});
		document.getElementById("vn").addEventListener("keydown",DeadEntwerfen); 
		document.getElementById("nn").addEventListener("keydown",DeadEntwerfen); 
		document.getElementById("vn").addEventListener("keyup",changeBiss); 
		document.getElementById("nn").addEventListener("keyup",changeBiss); 
		document.getElementById("gt").addEventListener("change",changeBiss); 
		document.getElementById("gm").addEventListener("change",changeBiss);
        
  		/*const ergebnis = document.createElement("input");
        ergebnis.setAttribute("name", var_name);
        ergebnis.setAttribute("id", var_name);
  		document.getElementById('temporary').appendChild(ergebnis);*/
  		document.getElementById(var_name).value = answer;
  
  		if(answer!='')
        {
        	if(localStorage.getItem("vn")) document.getElementById("vn").value = localStorage.getItem('vn');
            if(localStorage.getItem("nn")) document.getElementById("nn").value = localStorage.getItem('nn');
            if(localStorage.getItem("gt")) document.getElementById("gt").value = localStorage.getItem('gt');
            if(localStorage.getItem("gm")) document.getElementById("gm").value = localStorage.getItem('gm');
        }
		
		const inputFieldVn = document.getElementById('vn');
		const inputFieldNn = document.getElementById('nn');
		inputFieldVn.addEventListener('keydown', function(event) {
		  // Check if the key is the "Dead" key
		  if (event.key === 'Dead') {
			// Prevent the default action (which would be to wait for the next key)
			event.preventDefault();

			// Optionally, you can log a message to the console
			console.log('Dead key input prevented.');
		  }
		});
		inputFieldNn.addEventListener('keydown', function(event) {
		  // Check if the key is the "Dead" key
		  if (event.key === 'Dead') {
			// Prevent the default action (which would be to wait for the next key)
			event.preventDefault();

			// Optionally, you can log a message to the console
			console.log('Dead key input prevented.');
		  }
		});
    });
	
    WichtgeVariabeln.push({var_name:'vn',min:2,title:'Vorname',override:false});
    WichtgeVariabeln.push({var_name:'nn',min:2,title:'Nachname',override:false});
    WichtgeVariabeln.push({var_name:'gt',min:2,title:'Geburtstag',override:false});
    WichtgeVariabeln.push({var_name:'gm',min:2,title:'Geburtsmonat',override:false});
    WichtgeVariabeln.push({var_name:var_name,min:6,title:'Schülercode',override:true});
	document.getElementById(var_name).disabled = isFix;
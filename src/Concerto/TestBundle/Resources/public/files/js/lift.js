    console.log('lift.js v3');

    let thanks = `<div class="thanks worttest-block warte-step"><i class="ri-loader-4-fill"></i></div>`;
    // Get the container element
    let NetWerkAlert = "Eine Netzwerkstörung wurde stattgefunden, Rufrn Sie bitte den Systemadministrator*in";
    const container = document.getElementById("lift_content");
    // Initialize the current index
    let currentIndex = 0;
    let timeCounter = 0;
    let AllItems = [];
    let CurrentSavingItem = {};
    let ErrorStatfinden = false;
    let waitingToSaveLastItem = false;
    let TimeEnd = false;
    let testZeit = null;
    let aufgabeZeite = null;
    let tocken = null;
    let saveHash = null;
    let saveAHash = null;
    let keepAliveTimer = null;

    function decodeBase64WithUTF8(base64String) {
        try {
            const binaryString = window.atob(base64String);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(bytes);
        } catch (error) {
            console.error("Error decoding Base64:", error);
            return null; // or handle the error appropriately
        }
    }

    // Function to create a question element
    function createQuestion(item, index,id) 
    {
        const template = document.getElementById('lift_test_template').innerHTML;

        let options = "";
        const questionName = `radio_${item.var_name}`;
        item.options.forEach((option, i) => {
            // Build the full HTML string for the label and radio button
            options += `
                <input type="radio" id="${option.varname}" name="${questionName}" value="${option.value}" data-var-name="${item.var_name}">
                <label for="${option.varname}">
                    ${option.label}
                </label>
            `;
        });

        const active = (index === 0) ? 'active' : '';
        const question = template
            .replace('_IMG_', item.frage)
            .replace('_QID_', questionName)
            .replace('_ITEMID_', id)
            .replace(/_VARNAME_/g, item.var_name)
            .replace('_AKTIV_', active)
            .replace('_OPTIONS_', options);
         
        container.innerHTML += question;
    }

    function startTimer(zeit)
    {
        if(test_session =='DIESEISTEINUEBERSICHT')
            return;
        const intervalZeit = parseInt(zeit)*1000;
        const interval = intervalZeit > 0 ? intervalZeit : 1;
        testZeit = setInterval(() =>
        {
            clearInterval(testZeit);
            testZeit = null;
            endTest(true);
        }, interval);
    }

    function startItemTimer()
    {
        if(test_session =='DIESEISTEINUEBERSICHT')
            return;
        timeCounter = 0;
        if(aufgabeZeite)
        {
            clearInterval(aufgabeZeite);
            aufgabeZeite = null;            
        }
        aufgabeZeite = setInterval(() => {
            timeCounter++;
            $('input[name="time_taken"]').val(timeCounter/10);
        }, 100);
    }

    function sendmsgToParent(message,data)
    {   
        if(test_session =='DIESEISTEINUEBERSICHT')
            return;
        window.parent.postMessage({
            'func': 'parentFuncName',
            'message': message,
            'data': data
            }, "*");
    }

    function keepAlive(hash)
    {
        if(test_session =='DIESEISTEINUEBERSICHT')
            return;
        keepAliveTimer = setInterval(() => {
            sendToServer(hash,'keepalive',function(){});
        }, 60000);
    }

    function sendToServer(dataToSave,cmd,calback)
    {
        
        if(test_session =='DIESEISTEINUEBERSICHT')
            return;
        let url = "https://kermit-rlp.de/CMS/simpelservice.php";
        let headers = null;
        let dataToSend = {
            cmd: cmd,
            request:
            {   
                status: saveHash == null ? 'start' : 'running',
                astatus: saveAHash == null ? 'start' : 'running',
                data:dataToSave
            }
        };
        if(cmd == 'keepalive')
        {
            url = "https://lernstand.hamburg.de/test/session/"+saveHash+"/keepalive";
            dataToSend = JSON.stringify({});
        }
        else if(cmd != 'getauth')
        {
            headers = {
                'Authorization': 'Bearer '+tocken
            };
            const postdata = JSON.stringify(dataToSave);

            url = saveHash == null 
                ? "https://lernstand.hamburg.de/test/ifbq-speed-test-save-api/session/start/"+postdata
                : "https://lernstand.hamburg.de/api/runner/test/session/"+saveHash+"/submit";

            dataToSend = saveHash == null 
            ? dataToSend
            : JSON.stringify({
                "values":dataToSave
            });
        }

        $.ajax({
            url: url,
            type: "POST",
            async: true,
            data: dataToSend,
            headers: headers,
            dataType: 'JSON',
            success:function(response){
                try
                {
                    if((cmd == 'keepalive' && response.code == 10) || response.success || response.code == 0)
                    {
                        calback(response,dataToSave);
                    }
                    else
                    {
                        ErrorStatfinden= true;
                        alert(NetWerkAlert,false)
                    }
                }
                catch(ex)
                {
                    alert('Das Verfahren war nicht erfolgreich');
                    $('.loading').removeClass('loading');
                }				
            },
            error: function(xmlhttprequest, textstatus, message)
            {
                if(textstatus==="timeout") {
                    console.log("got timeout");
                } else {
                    console.log(textstatus);
                }
                alert('Verbindung Problem');
                $('.loading').removeClass('loading');
            },
            cache: false
        });	
    } 

    function checkResponse(response,dataToSave)
    {
        if(saveHash == null)
        {
            saveHash = response.hash;
            keepAlive(saveHash);
        }

        if(dataToSave.is_last)
        {
            clearInterval(keepAliveTimer);
            endTest(false)
        }
    }

    function schrittSpeichern(dataToSave)
    {
        if(test_session!='')
            dataToSave['test_session'] = test_session;
        sendToServer(dataToSave,'savespeedtest',checkResponse);       
    }

    function setAuth(response,dataToSave)
    {
        saveAHash = response.hash;
        tocken = response.data;
    }

    function getAuth()
    {
        const dataToSave = {sid,debugsid,hash};
        if(test_session!='')
            dataToSave['test_session'] = test_session;
        sendToServer(dataToSave,'getauth',setAuth);       
    }
    
    function endTest(isendtime)
    {        
        $('.worttest-block').removeClass("active");
        $('.satztest-block').removeClass("active");
        container.children[AllItems.length].classList.add("active");
        setTimeout(function()
        {
            sendmsgToParent('end_test',sid);

            $('#end_test').trigger('click');
        }, 300);
    }

    function setStartValues(item_id,var_name)
    {
        $('input[name="frage_id"]').val(item_id);
        $('input[name="var_name"]').val(var_name);
    }

    function startCreation()
    {   
        getAuth();
        AllItems = JSON.parse(decodeBase64WithUTF8(document.getElementById('info_data').value));
        AllItems.forEach((element, index) => 
        {
            const item = {
                var_name : element.var_name,
                options : element.item_config.response_options,
                frage : element.question
            }
            createQuestion(item, index,element.id);
        });
        container.innerHTML += thanks;
        
        $('input[type="radio"]').on("change", (event) => 
        {
            const var_name = event.target.getAttribute("data-var-name");
            const item_id = document.querySelector('.satztest-block')
                ? $('.satztest-block.active').attr('data-option')
                : $('.worttest-block.active').attr('data-option');
            const value = event.target.value;
            document.getElementById(var_name).value =  value;

            const elemid = event.target.name;
            const questionDiv = document.getElementById(elemid);
            questionDiv.classList.remove("active");               
    
            if(!ErrorStatfinden)
            {
                currentIndex++;
                const timedeff = timeCounter/10;
                if (currentIndex < AllItems.length+1 && !TimeEnd)
                {
                    const is_last = currentIndex == AllItems.length;
                    container.children[currentIndex].classList.add("active");
                    setTimeout(function()
                    {
                        const dataToSave = {
                            sid,
                            debugsid,
                            hash:saveHash,
                            ahash:saveAHash,
                            frage_id:item_id,
                            schueler_zeit:timedeff,
                            schueler_antwort:value,
                            is_last:is_last
                        };

                        schrittSpeichern(dataToSave);
                    }, 100);
                    startItemTimer();
                    if(AllItems.length > currentIndex)
                        setStartValues(AllItems[currentIndex].id,AllItems[currentIndex].var_name);                    
                }
                else
                {
                    endTest(false);
                }
            }
        });
        startTimer(AllItems[0].zeit);
        startItemTimer();
    }

    // override default browser alert
	var currentCallback;

    // override default browser alert
    window.alert = function(msg, success){
        $('.message').text(msg);
        $('.customAlert').css('animation', 'fadeIn 0.3s linear');
        $('.customAlert').css('display', 'inline');
        $('.customAlert').removeClass('fail');
        if(success==false)
            $('.customAlert').addClass('fail');

        setTimeout(function(){
        $('.customAlert').css('animation', 'none');
        }, 300);
    }

    $(function(){
        // add listener for when our confirmation button is clicked
        $('.confirmButton').click(function(){
            $('.customAlert').css('animation', 'fadeOut 0.3s linear');
            setTimeout(function(){
                $('.customAlert').css('animation', 'none');
                $('.customAlert').css('display', 'none');
            }, 300);
        })
    });    

    if (document.readyState === "complete") 
    {
        console.log("Document fully loaded");
        startCreation();        
        sendmsgToParent("open_test_iframe",sid);
    } else 
    {
        document.addEventListener("readystatechange", function() {
            if (document.readyState === "complete") {
                console.log("Document fully loaded2");
                startCreation();        
                sendmsgToParent("open_test_iframe",sid);
            }
        });
    }

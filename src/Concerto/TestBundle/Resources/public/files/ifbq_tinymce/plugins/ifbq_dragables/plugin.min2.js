var SelectedDragable=0;
tinymce.PluginManager.add('ifbq_dragables', function(editor, url) {
	
	editor.addButton('dragables', {
		text: 'Ablage',
		icon: 'table',
		image: tinymce.baseURL + '/plugins/ifbq_dragables/drag.png',
		id: 'antwortElement',
		class: 'dragables',
		tooltip:'Antwortelement',
		stateSelector:"img .dragables",
		onclick: function() {
			      // Open window
			editor.windowManager.open({
				width: 500,
				height: 350,
				title: 'Variable Name ausfüllen',
				body: [
					{
						type: 'container',
						height: 300,
						forced_root_block : "",
						name: '',
						label: '',
						html:'Variable :<input style="border: 1px solid gray;margin-bottom: 8px;" id="drag_var" name="drag_var" value="'+CurrDragVarName+'">'+
						'<p> Unendlich nutzbar:<input type="checkbox" name="unendlich" id="unendlich" '+CurrDragIsUnEndlich+'></p>'+
						'<p> Mit Karte:<input type="checkbox" name="mitkart" id="mitkart" '+CurrKartMitKarte+'></p>'+
						'<p> Breite :<input type="Text" name="fWidth" id="fWidth" value="'+CurrFeildWidth+'"></p>'+
						'<p> Höhe :<input type="Text" name="fheight" id="fheight" value="'+CurrFeildHeight+'"></p>'+
						'<div style="height:280px;"><div id="dwert" style="display:none;height:280px;'+CurrKartZuShau+'"><textarea id="werteditor"></textarea></div></div>'
					}
				],
				onSubmit: function(api) {					
					var dWidth = $('#fWidth').val();
					var dHeight = $('#fheight').val();
					if(!dWidth || !dHeight || parseInt(dWidth)<10 || parseInt(dHeight)<10){
						alert('Die Höhe und Breite sollen größer als 10!!');
						return false;
					}
					var dVarname = $('#drag_var').val();
					var dVarStatus = $('#unendlich').is(":checked");
					var dVarMit = $('#mitkart').is(":checked");
					var dContent = tinymce.get("werteditor").getContent();
					var dVarKart = (dVarMit)?  dContent : '<img class="antwort-element" src="../bundles/concertopanel/files/dragpos2.png"  style="width:'+dWidth+';height:'+dHeight+'display: inline-block;width: 25px !important;height: 25px !important;">';
					var BGImage =(dVarMit)? '': "";					
					dObject ='<span id="dragable_'+SelectedDragable+'" '+BGImage+' contentEditable="false" class="ablageziel mceNonEditable dragable" data-var="'+dVarname+'" data-wert="'+dVarMit+'" data-option="'+dVarStatus+'">'+dVarKart+'</span>';
                   
                    tinyMCE.activeEditor.replace(GlobalSelection,dObject);
					GlobalSelection=null;
					SelectedDragable++;
					tinymce.remove('textarea#werteditor');
				  },
				onCancel: function() {					
					tinymce.remove('textarea#werteditor');
				  },
				onClose: function() {					
					tinymce.remove('textarea#werteditor');
				  }
			});
			
			tinymce.init({
				selector: 'textarea#werteditor',
				menubar: false,
				language: 'de',
				readonly: 0,
				  plugins: [
					'image','code','autoresize'
				  ],
				toolbar: 'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | code',
				setup: function(editor) {
					editor.on('init', function() {
						klineeditorexists=true;
						editor.setContent(CurrKarte);
					});
				},
			});

			$('#mitkart').click(function(e) {
				if(this.checked)
					$('#dwert').show();
				else
					$('#dwert').hide();
			});

			$('.dragable').click(function(e) {
				SelectedDragable=$(this).attr('data-value');
			});
		}
	});
});

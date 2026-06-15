console.log("einsicht_codierung.js loaded successfully");
var VarTableData = null;
var ReadyEditInputs = [];
var currentDataTablePage = 0;
function openEinsichtWindow()
{
    $('#einsichtKodierungen .glyphicon').removeClass('glyphicon-level-up').addClass('glyphicon-hourglass').addClass('spin');
    const iframeSrc = 'kodierung-einsicht?test_session='+$('#test_session').val()+'&var_name='+$('#var_name').val();
    $('#iframe_container').html('<iframe src="'+iframeSrc+'"></iframe>');
}

function openEinsichtWindowUndRefreshFilter(geschickte_data,response)
{
  if(geschickte_data.rueck)
  {
    $('#einsicht_text_block').DataTable().row(geschickte_data.rowIndex).remove().draw();
  }
  else
  {    
    ReadyEditInputs.forEach(function(index)
    {
      var cell = $('#einsicht_text_block').DataTable().cell(index, 1); // Second column (index 1)    
      if ($(cell.node()).find('input').length > 0)
      {
        const newValue = $(cell.node()).find('input').val();
        cell.data(newValue);
        $(cell.node()).html(newValue);
      }
    });
    ReadyEditInputs = [];
  }
  //openEinsichtWindow();   
  const parentElement =  window.parent.document.querySelector('#btnGetFilterData');
  if (parentElement) {
      parentElement.click();
  }  
  $('#alle_aendreungen_speicher').removeClass('wait').addClass('disabled');
	$('.kann-warten').removeClass('disabled').removeClass('wait');

}

function EinsichtOffnen(einsicht_data)
{
  //`var_name`, `schreibung`,`ifbq_wortliste`.`anmerkung`, `score`,`Benutzername`
  $('#alle_aendreungen_speicher').removeClass('wait');
  const einsichtDataset = JSON.parse(einsicht_data); 	
  const dataSet = einsichtDataset.map(item=>{
    return {
        schreibung:item.schreibung,
        score:item.score,
        Benutzername:item.Benutzername,
        anmerkung:item.anmerkung
      }
  });
  
	VarTableData.clear().rows.add(dataSet).draw();
  $('#einsichtKodierungen .glyphicon').removeClass('glyphicon-hourglass').removeClass('spin').addClass('glyphicon-level-up');
  einsicht_text_dialog = null;
  prepairPopup();
  einsicht_text_dialog.dialog( "open" );
}

function prepairPopup()
{
	einsicht_text_dialog = $( "#einsicht_text_dialog").dialog({
      autoOpen: false,
      width: '95%',
      height: 'auto',
      show: {
        effect: "blind",
        duration: 150
      },
      hide: {
        effect: "blind",
        duration: 150
      },
      create: function () {
        // Update the close button's aria-label
        $(this).parent().find('.ui-dialog-titlebar-close').attr('aria-label', 'Schließen');
        $(this).parent().find('.ui-dialog-titlebar-close').attr('title', 'Schließen');
      },
      open: function() {
        // Change tooltip of close button
        $(this).parent().find(".ui-dialog-titlebar-close").attr("title", "Schließen");
        $('.ui-dialog-titlebar-close').html('<i class="fas fa-times"></i>');
      },
      close: function() {
        // Change tooltip of close button
      }
    });
}

function StartDataTable()
{
  prepairPopup(); 
  
  $('#alle_aendreungen_speicher').removeClass('wait').addClass('disabled');  
  //$('#einsicht_text_block thead:not(.nicht-loeschen)').remove(); // Remove the table header
  $('#einsicht_text_block_wrapper .top:not(.nicht-loeschen)').remove(); // Remove the table header
  $('#einsicht_text_block_wrapper .dataTables_info').remove(); // Remove the table header
  $('#einsicht_text_block_wrapper .bottom').remove(); // Remove the table header
  $('#einsicht_text_block tbody').empty(); // Clear the table body
    
  VarTableData=$('#einsicht_text_block').DataTable( {
    data: [],
    'fixedHeader': true,
    'responsive': true,
    'width': 'auto',
    columns: [
      {title: "Antwort",data:'schreibung'},//`var_name`, `schreibung`,`ifbq_wortliste`.`anmerkung`, `score`,`Benutzername`
      {title: "Kodierung",data:'score'},
      {title: "Benutzer",data:'Benutzername'},
      {title: "Anmerkung",data:'anmerkung'},
      { // EDIT ICON
          data: null,
          orderable: false,
          searchable: false,
          width: "25px",
          className: "dt-action-col",
          defaultContent: 
            '<i class="fa fa-edit edit-btn kann-warten" style="cursor:pointer;color:green;"></i>'
      },
      { // DELETE ICON
          data: null,
          orderable: false,
          searchable: false,         
          width: "25px",
          className: "dt-action-col",
          defaultContent: 
            '<i class="fa fa-trash delete-btn kann-warten" style="cursor:pointer;color:red;"></i>'
      }
    ],
    initComplete: function() {
      // Apply the column filters after initialization
      this.api().columns().every(function() {
        var column = this;

        // For text inputs
        $('.column-filter[data-column="' + column.index() + '"]')
          .on('keyup change', function() {
            if (column.search() !== this.value) {
              column.search(this.value).draw();
            }
          });
      });
    },
    dom: '<"top"ilp>rt<"bottom"ip><"clear">', // Add pagination controls (l = length, p = pagination) at the top
    paging: true,
    pageLength: 150,
    select: false,
    info: true,
    language: {
      lengthMenu: "_MENU_ Datensätze pro Seite anzeigen",
      info: "Zeign Seite _PAGE_ von _PAGES_",
      infoEmpty: "Keine Datensätze verfügbar",
      infoFiltered: "(gefiltert aus _MAX_ Gesamtdatensätzen)",
      processing:     "Wird bearbeitet...",
      search:         "Filter:",
      lengthMenu:    "",
      showing :      "Zeign:",
      zeroRecords:    "Null Datensätze",
      emptyTable:     "Leere Tabelle",
      paginate: {
        first:      "Zuerst",
        previous:   "Bisherige",
        next:       "Nächster",
        decimal: ",",
        last:       "Zuletzt"
      },
      aria: {
        sortAscending:  ": Aktivieren Sie diese Option, um die Spalte aufsteigend zu sortieren",
        sortDescending: ": aktivieren, um die Spalte in absteigender Reihenfolge zu sortieren"
      }
    }
  });
  currentDataTablePage = VarTableData.page();
  // Warnung wenn Änderungen nicht gespeichert wurden und der Nutzer die Seite wechseln möchte
  $('#einsicht_text_block').off('page.dt').on('page.dt', function () {
    if (ReadyEditInputs.length > 0) {
      const confirmLeave = confirm(
        "Es gibt ungespeicherte Änderungen. Wenn Sie die Seite wechseln, gehen diese verloren. Möchten Sie fortfahren?"
      );
      if (!confirmLeave) {
        // Prevent page change
        VarTableData.page(currentDataTablePage).draw(false);
      }
      else
      {
        currentDataTablePage = VarTableData.page();
        ReadyEditInputs.forEach(function(index)
        {
          var cell = $('#einsicht_text_block').DataTable().cell(index, 1); // Second column (index 1)    
          if ($(cell.node()).find('input').length > 0)
          {
            const oldValue = $(cell.node()).find('input').attr('value');
            cell.data(oldValue);
            $(cell.node()).html(oldValue);
          }
        });
        ReadyEditInputs = [];
      }
    }
  });

  $('#einsicht_text_block tbody').off('click', 'i').on('click', 'i', function () {
      //var row = $('#einsicht_text_block').DataTable().row($(this).parents('tr')).data();
      var tr = $(this).closest('tr');          
      var row = VarTableData.row(tr);
      var rowData = row.data();
      var rowIndex = row.index();
      // column index 1 = second column
      var cell = VarTableData.cell(tr, 1);
      var oldValue = cell.data();
        // prevent double edit
    
      if ($(this).hasClass('edit-btn'))
      { 
        if ($(cell.node()).find('input').length > 0) 
        {
          $(cell.node()).html(oldValue);
          ReadyEditInputs = ReadyEditInputs.filter(item => item !== rowIndex);
          return;
        }
        var input = '<input type="number" class="form-control form-control-sm codierer-ansicht" value="'+oldValue+'" id="newValue_'+rowIndex+'"\>';
        const save = '<i class="fa fa-save save-btn kann-warten" onclick="auswertungAendren('+rowIndex+',false)" style="cursor:pointer"></i>'
        $(cell.node()).html(input+save);
        $('#alle_aendreungen_speicher').removeClass('disabled').removeClass('wait');
        ReadyEditInputs.push(rowIndex);
        //$(cell.node()).html(input);
      } 
      else if ($(this).hasClass('delete-btn'))
      {
            auswerungLoechen(rowIndex);
      }
      console.log("Edit row:", rowData);
  });
  $('#alle_aendreungen_speicher').removeClass('wait');
}

function sendToServer(baseUrl,postData,calback)
{
	$('.kann-warten').addClass('disabled').addClass('wait');
  $('#alle_aendreungen_speicher').addClass('disabled').addClass('wait');
	const jsonString = JSON.stringify(postData);
	// URL-encode the JSON string
	const encodedData = encodeURIComponent(jsonString);
	// Append the encoded data to the base URL
	const fullUrl = `${baseUrl}/${encodedData}`;
	$.ajax({
	  url: fullUrl,
	  type: "POST",
	  dataType: "json",      	
	  contentType: "application/json",
	  data: JSON.stringify(postData),
	  success:function(response)
	  {
		  try
		  {
			  if(response.data)
			  {
          const questions = response.data.templateParams;
          calback(postData,questions);
          console.log(postData,questions);
			  }
			  else if(response.error)
			  {
				  console.error(response);
			  }
			  else
			  {
			    console.error(response);
			  }
		  }
		  catch(ex)
		  {
			  console.error(ex);
		  }
	  },
	  error: function(xmlhttprequest, textstatus, message)
	  {
		  alert(message);
		  if(textstatus==="timeout") {
			  console.log("got timeout");
		  } else {
			  console.log(textstatus);
		  }
	  },
	  complete: function() {
      
	  },
	  cache: false
  });	
}

function auswertungAendren(rowIndex,rueck)
{
  const alleAendreungen = [];
  const testSession = $('#test_session').val();
  const varName = $('#var_name').val();
  if(rowIndex =='alle')
  {
    //var allRows = $('#einsicht_text_block').DataTable().rows().data();
    //allRows.each(function(rowData, index)
    ReadyEditInputs.forEach(function(index)
    {
      var cell = $('#einsicht_text_block').DataTable().cell(index, 1); // Second column (index 1)    
      if ($(cell.node()).find('input').length > 0)
      {
        const datatoadd = $('#einsicht_text_block').DataTable().row(index).data();
        datatoadd.newValue = $('#newValue_'+index).val();
        if(datatoadd.newValue != datatoadd.score)
          alleAendreungen.push(datatoadd);
      }
    });
    if(alleAendreungen.length ==0)
    {
      alert('Es gibt keine Änderungen zum Speichern.');
      return;
    }
    const postData = {
      "var_name": varName,
      "alle_aendreungen": alleAendreungen,
      "test_session": testSession,
      "rueck": false
    };
    sendToServer('ifbq-codierer-einzel-v3/session/start',postData,openEinsichtWindowUndRefreshFilter);
  }
  else
  {
    var row = $('#einsicht_text_block').DataTable().row(rowIndex).data();
    const newValue = $('#newValue_'+rowIndex).val();
    const oldValue  = row.score;
    const schreibung = row.schreibung;
    const score = newValue;
    const alte_score =oldValue;
    const Benutzername = row.Benutzername;
    const anmerkung = row.anmerkung;
    const encodedSchreibung = btoa(
      String.fromCharCode(...new TextEncoder().encode(schreibung))
    );
    const url = `ifbq-codierer-einzel-v3?test_session=${testSession}&var_name=${varName}&score=${score}&schreibung=${schreibung}&Benutzername=${Benutzername}&rueck=${rueck}`;
    const postData = {
      "rowIndex": rowIndex,
      "test_session": testSession,
      "var_name": varName,
      "schreibung": encodedSchreibung,
      "alte_score": alte_score,
      "score": score,
      "rueck": rueck,
      "Benutzername": Benutzername
    };
    sendToServer('ifbq-codierer-einzel-v3/session/start',postData,openEinsichtWindowUndRefreshFilter);
  }
}

function auswerungLoechen(rowIndex)
{
  $('<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Wollen Sie diesen Auwertung wirklich löschen?</p>').dialog({
      modal: true,
      title: 'Löschen bestätigen',
      buttons: {
          Ja: function ()
          {
			      auswertungAendren(rowIndex,true);
            $(this).dialog('destroy').remove();
          },
          Nein: function () {
              $(this).dialog('destroy').remove();
          }
      }
  });
}
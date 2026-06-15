///***********************************************IFBQ JS****************************************************/
console.log('ifbq_admin_layout_v2');


var VarTableData = null;
var bolckwidth = { ID: 47, VARIABLE: 142, STATUS: 95, Template: 123 };
var startupwidth = bolckwidth.VARIABLE+bolckwidth.Template+59;
var actiontodo = "itv";
let filterdata = ''
var dataSet = [];
var SearchHash = null;

function makewidthFromOptions() {
	startupwidth=110;
	$('#var_table_filter input[type=checkbox]').each(function () {
		var datavar = $(this).attr('data-value');
		if ($(this).prop('checked') && datavar && bolckwidth[datavar])
			startupwidth += bolckwidth[datavar];
	})
	$('table.table').css('width', startupwidth);
	$('div.dataTables_scroll').css('width', startupwidth);
	$('#var_table_container div.row').css('margin-left', '0px');
	$('#var_table_container').animate({
		width: startupwidth
	}, jQuery.speed('fast'));
	VarTableData.columns.adjust().draw();
}

function toggleColumn(chkObj) {
	var obj = $(chkObj).attr('id');
	var objIndex = obj.replace('var_spalte_', '');
	var column = VarTableData.column(objIndex);
	var valuename = $(chkObj).attr('data-value');

	// Toggle the visibility
	column.visible($(chkObj).prop('checked'));
	makewidthFromOptions();
}

/******************************************************/
const MainTable = document.getElementById('MainTable');

let headerBeingResized;

const min = 150;
// The max (fr) values for grid-template-columns
const columnTypeToRatioMap =
{
	numeric: 1,
	'text-short': 1.67,
	'text-long': 3.33
};

var handler = $('#resiser');
var wrapper = $('#MainTable')[0];
var boxA = $('#var_table_container')[0];
var isHandlerDragging = false;

document.addEventListener('mousedown', function (e) {
	// If mousedown event is fired from .handler, toggle flag to true
	if (e.target.id === 'resiser') {
		$('#body_frame').hide();
		isHandlerDragging = true;
	}
});

document.addEventListener('mousemove', function (e) {
	// Don't do anything if dragging flag is false
	if (!isHandlerDragging) {
		return false;
	}

	// Get offset
	var containerOffsetLeft = wrapper.offsetLeft;

	// Get x-coordinate of pointer relative to container
	var pointerRelativeXpos = e.clientX - containerOffsetLeft;

	// Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
	var boxAminWidth = 60;

	// Resize box A
	// * 8px is the left/right spacing between .handler and its inner pseudo-element
	// * Set flex-grow to 0 to prevent it from growing
	boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
	boxA.style.flexGrow = 0;
});

document.addEventListener('mouseup', function (e) {
	// Turn off dragging flag when user mouse is up
	$('#body_frame').show();
	isHandlerDragging = false;
});

function addNewRowToDatatable(data_array) {
	dataSet.push(data_array.dataset);
	VarTableData.destroy();
	filterdata = data_array.filterdata;
	StartDataTable();
}

function checkVariableUsed(search_it) {
	return  getRowOfVariable(search_it);
}

function addLiteners() {
	$('.btn_view').on('click', function (e) {
		$('#filterdata').val($('.dataTables_filter input[type="search"]').val());
		actiontodo = "itv";
		$(this).parents('tr').trigger('click');
		toggleColumn($('#close_filter'));
	});

	$('.btn_edit').on('click', function (e) {
		$('#filterdata').val($('.dataTables_filter input[type="search"]').val());
		actiontodo = "ite";
		//actiontodo = "ifbq-test-edit";
		$(this).parents('tr').trigger('click');
		toggleColumn($('#close_filter'));
	});
}

function StartDataTable() {
	VarTableData = $('#var_table').DataTable({
		data: dataSet,
		'fixedHeader': true,
		'responsive': true,
		columns: [
			{ title: "ID",data: 'id' },
			{ title: "VARIABLE",data: 'var_name' },
			{ title: "STATUS",data: 'status' },
			{ title: "Template",data: 'item_template' },
			{ title: "E" },
			{ title: "V" }
		],
		columnDefs: [{
			targets: [0],
			visible: false,
			width: '0px'
		}, {
			targets: [1],
			width: '30px'
		}, {
			visible: false,
			targets: [2],
			width: '30px'
		},{
			targets: [3],
			width: '30px'
		},{
			orderable: false,
			targets: [4],
			width: '10px',
			defaultContent: '<span type="button"><span class="btn_edit glyphicon glyphicon-edit"></span></span>'
		}, {
			orderable: false,
			width: '10px',
			targets: [5],
			defaultContent: '<span type="button"><span  class="btn_view glyphicon glyphicon-eye-open"></span></span>'
		}],
		"createdRow": function (row, data, dataIndex) {
			$(row).attr('id', 'q_' + data[1]);
		},
		scrollY: '83vh',
		scrollHeight: '50vh',
		scrollCollapse: true,
		paging: false,
		select: true,
		language: {
			lengthMenu: "_MENU_ Datensätze pro Seite anzeigen",
			info: "Zeign page _PAGE_ of _PAGES_",
			infoEmpty: "Keine Datensätze verfügbar",
			infoFiltered: "(gefiltert aus _MAX_ Gesamtdatensätzen)",
			processing: "Wird bearbeitet...",
			search: "Suchen:",
			lengthMenu: "MENU anzeigen:",
			showing: "Zeign:",
			zeroRecords: "Null Datensätze",
			emptyTable: "Leere Tabelle",
			paginate: {
				first: "Zuerst",
				previous: "Bisherige",
				next: "Nächster",
				decimal: ",",
				last: "Zuletzt"
			},
			aria: {
				sortAscending: ": aktivieren Sie diese Option, um die Spalte aufsteigend zu sortieren",
				sortDescending: ": aktivieren, um die Spalte in absteigender Reihenfolge zu sortieren"
			}
		}
	});

	if (filterdata.length) {
		$('.dataTables_filter input[type="search"]').val(filterdata).trigger('keyup');
	}

	var ShowHideColumns = '<input type="checkbox" onChange="toggleColumn(this);" class="filteroption" data-value="ID" id="var_spalte_0" ><label for="var_spalte_0">ID</label>';
	ShowHideColumns += '<input type="checkbox" onChange="toggleColumn(this);" class="filteroption" data-value="VARIABLE" id="var_spalte_1" checked><label for="var_spalte_1">VARIABLE</label>';
	ShowHideColumns += '<input type="checkbox" onChange="toggleColumn(this);" class="filteroption" data-value="STATUS" id="var_spalte_2" ><label for="var_spalte_2">STATUS</label>';
	ShowHideColumns += '<input type="checkbox" onChange="toggleColumn(this);" class="filteroption" data-value="Template" id="var_spalte_3" checked><label for="var_spalte_3">Template</label>';


	$('#var_table_filter').prepend($('#filter_template').html().replace(/_production_/g, ''));
	$('#var_table_filter').prepend('<span class="btn-add" id="new_variablen">Variablen hinzufügen</span><br/><p>' + ShowHideColumns + '</p>');

	$("#new_variablen").click(function () {
		const filterdata = $('.dataTables_filter input[type="search"]').val();
		$('#body_frame').attr('src', 'ifbq-test-add-v2?test_session=' + test_session + '&filterdata=' + filterdata + '&data_set_id=' + data_set_id);
	});
}

function showstaticText(txt) {
	$('#ifbq_nachricht_text').html(txt).show(100)
}

let toastCount = 0;

function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.id = `toast-${toastCount++}`;
  
  toast.style.position = 'fixed';
  toast.style.bottom = `${20 + (toastCount * 70)}px`;
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#0aa1ed';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';
  
  document.body.appendChild(toast);
  
  setTimeout(() => { toast.style.opacity = '1'; }, 10);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function StartKeepAlivePing()
{
	setInterval(function() {
		$.ajax({
			url: 'https://lernstand.hamburg.de/test/session/' + SearchHash + '/keepalive',
			type: "POST",
			success:function(response)
			{
				//console.log('Ping successful');
			},
			error: function(xmlhttprequest, textstatus, message)
			{
				console.error('Ping failed:', message);
			}
		});
	}, 60000);
}

async function getRowOfVariable(varnamezumcheck)
{
	varnamezumcheck = varnamezumcheck.trim();

	if(varnamezumcheck.length == 0)
		return false;
	
    const params = new URLSearchParams({
        var_name: varnamezumcheck
    });

    try {
        const response = await fetch(`/api/data/ifbq_fragen?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tdata,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.length > 0;

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

function sendToServer(baseUrl,postData,calback)
{
  $('.d-text').text('Daten werden gesucht...');
  
  	headers = SearchHash == null ? {} : {
	'Authorization': 'Bearer '+SearchTocken
	};
  
  postData['getAuth'] = SearchHash == null ? 1 : 0;
  const jsonString = SearchHash == null 
  	? JSON.stringify(postData) 
   	: JSON.stringify({"values":postData});
	// URL-encode the JSON string
	const encodedData = encodeURIComponent(jsonString);
	// Append the encoded data to the base URL/**/
	const fullUrl = SearchHash == null ? `${baseUrl}/${encodedData}` : baseUrl;
  $.ajax({
		url: fullUrl,
		type: "POST",
		dataType: 'JSON',
		async: true,
		data: jsonString,
		headers: headers,
		success:function(response)
		{
			try
			{
				if(response.data)
				{
				  if(SearchHash == null)
				  {
					SearchTocken = response.data.templateParams.access_token;
					SearchHash = response.hash;
					StartKeepAlivePing();
				  }
				 
				  const questions = JSON.parse(response.data.templateHtml);
				  showToast(questions.length +' Items wurden erfolgreich gefunden. Bitte warten Sie einen Moment, bis die Daten geladen sind.');

				  calback(questions);
				  console.log(response);
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
				showToast(JSON.stringify(ex));
			}				
		},
		error: function(xmlhttprequest, textstatus, message)
		{
			if(message.includes('Time-out'))
			  message ="Die Anfrage wurde aus Zeitgründen abgebrochen. Bitte wählen Sie eine andere Filterung.";
			showToast(message);

			if(textstatus==="timeout") {
				console.log("got timeout");
			} else {
				console.log(textstatus);
			}
		},
		complete: function() {
			$('#btnGetFilterData .glyphicon')
				.addClass('glyphicon-filter')
				.removeClass('glyphicon-glass')
				.removeClass('spin')
				.prop('disabled',false);				
  			$('.d-text').text('suchen');
		},
		cache: false
	});	
}

function getFilteredData()
{
    $('#btnGetFilterData .glyphicon')
		.removeClass('glyphicon-search')
		.addClass('glyphicon-glass')
		.addClass('spin')
		.prop('disabled',true); 

    const post_domaine = $('#domaine').val();
    const post_item_template = $('#item_template').val();
    const post_sub_item = $('#sub_item').val();
    const post_cb_group = $('#cb_group').val();
    const post_var_name = $('#varname_teil').val();
    const post_data_set_id_filter = $('#data_set_id_filter').val();
   	const postData = {
      "test_session": test_session,
      "data_set_id": data_set_id,
      "api": 1,
      "var_name": post_var_name,
      "data_set_id_filter": post_data_set_id_filter,
	  "item_template": post_item_template,
      "cb_group": post_cb_group,
      "domaine": post_domaine,
      "sub_item": post_sub_item
    };
	if(SearchHash == null)
	{		
  		sendToServer('https://lernstand.hamburg.de/test/ifbq-filter-ita-v2/session/start',postData,refillResultTable);
	}
	else
	{
  		sendToServer('https://lernstand.hamburg.de/api/runner/test/session/' + SearchHash +'/submit',postData,refillResultTable);
	}
}

function refillResultTable(data)
{
  	dataSet = data;
  	VarTableData.clear().rows.add(dataSet).draw();
	addLiteners();
}

$(document).ready(function ()
{
	$("#input_list").empty();

	StartDataTable();

	$.fn.blindLeftToggle = function (duration, easing, complete) {
		return this.animate({
			width: parseInt(this.css('width')) < startupwidth ? startupwidth : 0
		}, jQuery.speed(duration, easing, complete));
	};

	$('#var_table tbody').on('click', 'tr', function (e) {
		var data = VarTableData.row($(this)).data();
		$('#var_table tbody tr').removeClass('selected');
		$('#selected_id').val(data.id);
		$(this).addClass('selected');
		$('#body_frame').attr('src', actiontodo + '?test_session=' + test_session + '&data_set_id=' + data_set_id + '&question_id=' + data.id);
	});

	$.fn.textWidth = function (_text, _font) {//get width of text with font.  usage: $("div").textWidth();
		var fakeEl = $('<span>').hide().appendTo(document.body).text(_text || this.val() || this.text()).css('font', _font || this.css('font')),
			width = fakeEl.width();
		fakeEl.remove();
		return width;
	};

	if ($('#warning').is(':empty')) {
		document.getElementById("warning").scrollIntoView();
	}

	$('#close_filter').click(function () {
		$('#var_table_container').blindLeftToggle('fast');
	});

    $('.close-arrow .flip-arrow').on('click', function() {
        if ($('#MainTable').hasClass('closed')) {
            $('#MainTable').removeClass('closed');
            $('#MainTable .close-arrow').removeClass('closed');
            $('#var_edit_container').removeClass('closed');
            $('#reuekgengig').removeClass('closed');
        } else {
            $('#MainTable').addClass('closed');
            $('#MainTable .close-arrow').addClass('closed');
            $('#var_edit_container').addClass('closed');
            $('#reuekgengig').addClass('closed');
        }
    });

    $('.filter .flip-arrow').on('click', function() {
        $('.filter-ruekgengig').addClass('closed');
        $('.filter').addClass('closed');
        $(this).addClass('closed');
    });

    $('.filter .suchtitel').on('click', function() {
        $('.filter').removeClass('closed');
    });

    $('#btnGetFilterData').on('click', function() {
        getFilteredData();
    });

	const data_set_id_list = data_set_id .split(',').map(item => item.trim());

	$.each(data_set_id_list, function(index, value) {
		$('#data_set_id_filter').append($('<option>', {
			value: value,
			text: value
		}));
	});
});

window.onmessage = function (e) {
	if (e.data[0] == '{') {
		const jsonMessage = JSON.parse(e.data);
		if (jsonMessage.typ == 'popup')
			showToast(jsonMessage.message);
		else
			showstaticText(jsonMessage.message)
	}
};
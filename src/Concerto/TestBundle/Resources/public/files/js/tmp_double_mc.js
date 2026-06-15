console.log('tmp_double_mc.js');
let var_tree = null;
let selected_node = null;
function startDoubleMC(TREE_DATA)
{
    var TREE_DATA = TREE_DATA ? TREE_DATA : [];
    $('#jstree_frage').jstree({
        "core" :
        {
            "animation" : 0,
            "check_callback" : true,
            "themes" : { "stripes" : true },
            "languages" : ["de"],
            'data' : [
                    {
                        id: 'root',
                        text: 'Fragen',
                        state: { opened: true },
                        children : TREE_DATA
                    }
                ]
        },
        "types" :
        {
            "#" : {
              "max_children" : 1,
              "max_depth" : -1,
              "valid_children" : ["root"]
            },
            "root" : {
              "icon" : "../note_add.svg",
              "valid_children" : ["default"]
            },
            "default" : {
              "valid_children" : ["default","file"]
            },
            "file" : {
              "icon" : "glyphicon glyphicon-file",
              "valid_children" : []
            }
        },
        "plugins" : 
        [
            "contextmenu", "dnd", "search",
            "state", "types"
        ], 
        "contextmenu":{
            "items": function ($node) {
                return {
                    "Create": {
                        "separator_before"  : false,
                        "separator_after"   : true,
                        "label"             : "Erstellen",
                        "action"            : false,
                        icon : "/bundles/concertopanel/files/css/tree_themes/default/note_add.svg",
                        "submenu" :{
                            "create_folder" : {
                                "seperator_before" : false,
                                "seperator_after" : false,
                                "label" : "Frage erstellen",
                                icon : "/bundles/concertopanel/files/css/tree_themes/default/f.png",
                                action : function (obj)
                                {
                                    var_tree_create(0);
                                }
                            },
                            "create_file" : 
                            {
                                "seperator_before" : false,
                                "seperator_after" : false,
                                "label" : "Antwort erstellen",
                                icon : "/bundles/concertopanel/files/css/tree_themes/default/a.png",
                                action : function (obj)
                                {
                                    var_tree_create(1);
                                }
                            },
                            "link_inline" : {
                                "seperator_before" : false,
                                "seperator_after" : false,
                                "label" : "Inline-Text verbinden",
                                icon : "/bundles/concertopanel/files/css/link.png",
                                action : function (obj)
                                {
                                    var_tree_create(2);
                                }
                            }
                        }
                    },
                    "Rename": {
                        "label": "Änderen",
                        "action": var_tree_rename
                    },
                    "Delete": {
                        "label": "Löchen",
                        "action": var_tree_delete
                    }
                };
            }
        },
    });
    var_tree = $("#jstree_frage").jstree(true);
}

var var_tree_create = function (node_type) {
    selected_node = var_tree.get_selected();
    if(!selected_node.length)
    { 
        selected_node = var_tree.get_node('root');
    }
    else
    {
        selected_node = selected_node[0];
    }

    let HTML_ELEMENT = '<div class="div-block">Variable:<br/><input type="text" class="tox-textfield" id="var_farge"></div>'+
    ' <br/>  <div id="double_mc_frage_block" class="div-block">Frage: <textarea id="var_frage_text"></textarea>'+        
    '</div>';
    let ICON_IMAGE = 'f.png';

    let TITEL = 'Neue Frage';
    let HEIGHT = 721;
    switch (node_type) {
        case 0:
            HTML_ELEMENT = HTML_ELEMENT;
            TITEL = TITEL;
            ICON_IMAGE = 'f.png';
        break;
        case 1:
            HTML_ELEMENT = '<div id="double_mc_frage_block">Antwort: <textarea id="var_frage_text"></textarea></div>';
            ICON_IMAGE = 'a.png';
            TITEL = 'Antwort Erstellen';
        break;
        case 2:
            HTML_ELEMENT = '<div class="div-block">Variable:<br/><select type="text" class="tox-textfield" id="var_farge"></select>'+
                ' <span class="tox-icon tox-tbtn__icon-wrap zeig-btn" id="zeig_btn"><svg width="24" height="24"><path d="M3.5 12.5c.5.8 1.1 1.6 1.8 2.3 2 2 4.2 3.2 6.7 3.2s4.7-1.2 6.7-3.2a16.2 16.2 0 002.1-2.8 15.7 15.7 0 00-2.1-2.8c-2-2-4.2-3.2-6.7-3.2a9.3 9.3 0 00-6.7 3.2A16.2 16.2 0 003.2 12c0 .2.2.3.3.5zm-2.4-1l.7-1.2L4 7.8C6.2 5.4 8.9 4 12 4c3 0 5.8 1.4 8.1 3.8a18.2 18.2 0 012.8 3.7v1l-.7 1.2-2.1 2.5c-2.3 2.4-5 3.8-8.1 3.8-3 0-5.8-1.4-8.1-3.8a18.2 18.2 0 01-2.8-3.7 1 1 0 010-1zm12-3.3a2 2 0 102.7 2.6 4 4 0 11-2.6-2.6z" fill-rule="nonzero"></path></svg></span>'+
                '</div>';
            ICON_IMAGE = 'link.png';
            TITEL = 'Inline-Text verbinden';
            HEIGHT = 321;
        break;
    }
    var editor = tinyMCE.get('question');
    editor.windowManager.open({
        title: TITEL,
        width: 501,
        height: HEIGHT,
        body: {
            classes: 'frage-style',
            type: 'panel', // The root body type - a Panel or TabPanel
            items: [
            {
                type: 'htmlpanel',
                name: 'neutabellecontainer',
                label: '',
                html: HTML_ELEMENT
            }],
        },            
        buttons: [
            {
                type: 'cancel',
                text: 'Abbrechen'
            },
            {
                type: 'submit',
                text: 'Ok',
                primary: true
            }
        ],
        onClose: function(e) {if(tinyMCE.get('var_frage_text')) tinyMCE.get('var_frage_text').remove();},
        onCancle: function(e) {if(tinyMCE.get('var_frage_text')) tinyMCE.get('var_frage_text').remove();},
        onSubmit: function (e)
        {
            let frage_var_name =  $('#var_farge').val() ;
            let frage_var_text = '';
            switch (node_type) {
                case 0:
                    frage_var_name = frage_var_name;
                    frage_var_text = window.btoa(tinyMCE.get('var_frage_text').getContent());
                break;
                case 1:
                    frage_var_name =  tinyMCE.get('var_frage_text').getContent({ format: "text" }).substring(0,90);
                    frage_var_text = window.btoa(tinyMCE.get('var_frage_text').getContent());
                break;
                case 2:
                    frage_var_name = frage_var_name;
                    frage_var_text = '';
                break;
            }

            selected_node = var_tree.create_node(selected_node, {state: { opened: true },icon : "/bundles/concertopanel/files/css/tree_themes/default/"+ICON_IMAGE, text: frage_var_name,data:{'html':frage_var_text,'node_type':node_type}});
            e.close();
        },
        onInit: function (api)
        {
            $('.tox-dialog').css({width: '900px !important',height: '700px !important',maxWidth:'inherit'});
        },
    });
    if(node_type==2)
    {
        showAlleInlineText()
    }
    else
    {
        tinymce.init({
            height: 320,
            entity_encoding : "raw",
            language: 'de',
            forced_root_block: false,
            selector: 'textarea#var_frage_text',
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | code',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        });
    }
};

var var_tree_rename = function ()
{
    let selected_node = var_tree.get_selected();
    if(!selected_node.length) { return false; }
    var selected_node_id = selected_node[0];
    selected_node = var_tree.get_json(selected_node_id);

    let node_type = selected_node.data.node_type;
    let var_farge = (node_type==1) ? '' : selected_node.text;
    let var_frage_text =  window.atob(selected_node.data.html);

    let HTML_ELEMENT = '<div class="div-block">Variable:<br/><input type="text" class="tox-textfield" id="var_farge"></div>'+
    ' <br/>  <div id="double_mc_frage_block" class="div-block">Frage: <textarea id="var_frage_text"></textarea>'+        
    '</div>';

    let ICON_IMAGE = 'f.png';
    let HEIGHT = 721;
    switch (node_type)
    {
        case 0:
            HTML_ELEMENT = HTML_ELEMENT;
            ICON_IMAGE = 'f.png';
        break;
        case 1:
            HTML_ELEMENT = '<div id="double_mc_frage_block">Antwort: <textarea id="var_frage_text"></textarea></div>';
            ICON_IMAGE = 'a.png';
        break;
        case 2:
            HTML_ELEMENT = '<div class="div-block">Variable:<br/><select type="text" class="tox-textfield" id="var_farge"></select>'+
                ' <span class="tox-icon tox-tbtn__icon-wrap zeig-btn" id="zeig_btn"><svg width="24" height="24"><path d="M3.5 12.5c.5.8 1.1 1.6 1.8 2.3 2 2 4.2 3.2 6.7 3.2s4.7-1.2 6.7-3.2a16.2 16.2 0 002.1-2.8 15.7 15.7 0 00-2.1-2.8c-2-2-4.2-3.2-6.7-3.2a9.3 9.3 0 00-6.7 3.2A16.2 16.2 0 003.2 12c0 .2.2.3.3.5zm-2.4-1l.7-1.2L4 7.8C6.2 5.4 8.9 4 12 4c3 0 5.8 1.4 8.1 3.8a18.2 18.2 0 012.8 3.7v1l-.7 1.2-2.1 2.5c-2.3 2.4-5 3.8-8.1 3.8-3 0-5.8-1.4-8.1-3.8a18.2 18.2 0 01-2.8-3.7 1 1 0 010-1zm12-3.3a2 2 0 102.7 2.6 4 4 0 11-2.6-2.6z" fill-rule="nonzero"></path></svg></span>'+
                '</div>';
            ICON_IMAGE = 'link.png';            
            HEIGHT = 321;
        break;
    }

    var editor = tinyMCE.get('question');
    editor.windowManager.open({
        width: 501,
        height: HEIGHT,
        title: 'Frage bearbeiten',
        body: {
            classes: 'frage-style',
            type: 'panel', // The root body type - a Panel or TabPanel
            items: [
                {
                    type: 'htmlpanel',
                    name: 'neutabellecontainer',
                    label: '',
                    html: HTML_ELEMENT
                }
            ]
        },
        buttons: [
            {
                type: 'cancel',
                text: 'Abbrechen',
                onclick: 'close'
            },
            {
                type: 'submit',
                onclick: 'submit',
                text: 'Ok',
                primary: true
            }
        ],
        onClose: function(e) {if(tinyMCE.get('var_frage_text')) tinyMCE.get('var_frage_text').remove();},
        onCancle: function(e) {if(tinyMCE.get('var_frage_text')) tinyMCE.get('var_frage_text').remove();},
        onSubmit: function(e)
        {

            let frage_var_name =  $('#var_farge').val() ;
            let frage_var_text = '';
            let node = $('#jstree_frage').jstree(true).get_node(selected_node_id);
            switch (node_type) {
                case 0:
                    frage_var_name = frage_var_name;
                    frage_var_text = window.btoa(tinyMCE.get('var_frage_text').getContent());
                break;
                case 1:
                    frage_var_name =  tinyMCE.get('var_frage_text').getContent({ format: "text" }).substring(0,90);
                    frage_var_text = window.btoa(tinyMCE.get('var_frage_text').getContent());
                break;
                case 2:
                    frage_var_name = frage_var_name;
                    frage_var_text = '';
                break;
            }


            node.text = frage_var_name;
            node.data.html = frage_var_text;
            $('#jstree_frage').jstree(true).redraw(node, false, false, true);
            e.close();
        }
    });
    
    if(node_type==2)
    {
        showAlleInlineText()
        $('#var_farge').val(var_farge).trigger('change');
    }
    else
    {
        $('#var_farge').val(var_farge);
        $('#var_frage_text').val(var_frage_text);
        tinymce.init({
            height: 320,
            entity_encoding : "raw",
            selector: 'textarea#var_frage_text',
            skin: 'oxide',
            forced_root_block: false,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | code',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        });
    }
    
};

var var_tree_delete = function (){
    selected_node = var_tree.get_selected();
    if(!selected_node.length) { return false; }
    var_tree.delete_node(selected_node);
};

function showAlleInlineText()
{
    const optionTemplate= '<option value="__ID__">__var_name__</option>';
    const inlinetextlist = JSON.parse($('#inlinetextlist').val())
    
    $('#var_farge').append('<option value="0">Varname auswahl</option>');
    inlinetextlist.forEach((item)=>
    {
        const option = optionTemplate.replace(/__ID__/g,item).replace('__var_name__',item)
        
       $('#var_farge').append(option);
    });

    $('#var_farge').select2({
        width: 'calc(100% - 97px)', // need to override the changed default
        'min-width': '209px'
    });
}
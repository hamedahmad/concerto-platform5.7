function highlightSelection() {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'highlight-selection';
        span.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeHighlight(e.currentTarget);
        });
        range.surroundContents(span);
    }
}

function wrapWordsPreserveHTML(element, tagName = 'span', className = 'wort') {
    // Walk through all text nodes only
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip empty text nodes
                if (!node.textContent.trim()) {
                    return NodeFilter.FILTER_SKIP;
                }
                // Skip script and style tags
                if (node.parentElement && 
                    ['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(node.parentElement.tagName)) {
                    return NodeFilter.FILTER_SKIP;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    
    const textNodes = [];
    let currentNode;
    
    // Collect all text nodes
    while (currentNode = walker.nextNode()) {
        textNodes.push(currentNode);
    }
    
    // Process each text node
    textNodes.forEach((textNode,index) => {
        const words = textNode.textContent.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        
        words.forEach((word,idx) => {
            if (word.trim().length > 0) {
                const wortId = `${index}-${idx}`;
                const wrapper = document.createElement(tagName);
                wrapper.className = className;
                wrapper.setAttribute('data-index', wortId);
                wrapper.textContent = word;
                fragment.appendChild(wrapper);
            } else if (word.length > 0) {
                // Preserve whitespace
                fragment.appendChild(document.createTextNode(word));
            }
        });
        
        textNode.parentNode.replaceChild(fragment, textNode);
    });
}

$(document).ready(function ()
{
    console.log('tmp_markierung');
    const items = document.getElementsByClassName('markierung-item');
    Array.from(items).forEach(item => {
        const var_name = item.getAttribute('data-option');
        $('#markierung_antwort_block').append(`<input type="hidden" id="${var_name}" name="${var_name}" value="">`);
        
        wrapWordsPreserveHTML(item);

        item.addEventListener('click', (e) => 
        {
           if(e.target.classList.contains('wort')) 
           {
                if(e.target.classList.contains('aktive')) 
                {
                    e.target.classList.remove('aktive');
                    answers[var_name] = answers[var_name].filter(i => i !== e.target.getAttribute('data-index'));
                }
                else
                {
                    e.target.classList.add('aktive');
                    if (!answers[var_name]) {
                        answers[var_name] = [];
                    }
                    answers[var_name].push(e.target.getAttribute('data-index'));
                }
                $(`#${var_name}`).val(JSON.stringify(answers[var_name]));
           }
        });
    });
});

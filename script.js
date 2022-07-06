function show_question(e){
    document.querySelector('.solution').classList.add('hidden');
    document.querySelector('.question').classList.remove('hidden');
}

function show_answer(e){
    document.querySelector('.question').classList.add('hidden');
    document.querySelector('.solution').classList.remove('hidden');
}
function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

async function get_data(idx, element) {
    let response = await fetch('./legend.json')
    let data = await response.json()
    let legend = get_legend_html(data)
    element.innerHTML = legend
}

function get_legend_html(legend){
    let html = ['']
    for (var direction in legend) {
        html.push('<div><h6>' + direction + '</h6><ol>');
        for (var i = 0; i < legend[direction].length; i++) {
            var c = legend[direction][i];
            html.push('<li value=\'' + c.position + '\'>' + escapeHtml(c.clue) + '</li>');
        }
        html.push('</ol></div>');
    }
    html.push('</div>');
    return html.join('\n')
}
function add_crossword(idx){
    let t = document.querySelector('#cross');
    
    let question_path = "./question.svg"
    let solution_path = "./solution.svg"

    t.content.querySelector('.question').src = question_path;
    t.content.querySelector('.solution').src = solution_path;
    
    // Populate the src at runtime.
    let clone = document.importNode(t.content, true);
    get_data(idx, clone.querySelector('.legend'))
    clone.querySelector('.question-tab').dataset.id=idx
    clone.querySelector('.solution-tab').dataset.id=idx
    document.body.appendChild(clone);
}
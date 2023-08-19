const app = document.getElementById('app')
const btn = document.getElementById('btn')
const preloader = document.getElementById('preloader');
const input = document.getElementById('input')
const inputBtn = document.getElementById('inputBtn')

function showProloader() {
    setTimeout(function () {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    }, 2500);
}


async function renderData(data) {
    createTable(data)
}

btn.addEventListener('click', async function () {
    const randomNum = () => Math.round(Math.random() * 1000)
    preloader.style.display = 'flex';
    showProloader()
    let url = `https://rickandmortyapi.com/api/character/${randomNum()}`
    fetch(url)
        .then(response => response.json())
        .then(data => renderData(data))
        .catch(error => createError(error));
});


inputBtn.addEventListener('click', async function () {
    const valueTarget = input.value

    preloader.style.display = 'flex';
    showProloader()
    let url = `https://rickandmortyapi.com/api/character/${valueTarget}`
    fetch(url)
        .then(response => response.json())
        .then(data => renderData(data))
        .catch(error => createError(error));
    document.querySelector('#input').value = ''
})


function createTable(data) {
    app.innerHTML = `<table class="iksweb">
	<tbody>
		<tr>
			<td><img class='img-table' src='${data.image}'></td>
			<td><span class="title">ID hero</span> <span class="desc">${data.id}</span></span></td>
			<td><span class="title">Name hero</span> <span class="desc">${data.name}</span></span></td>
			<td><span class="title">Status hero</span><span class="desc">${data.status}</span></span></td>
			<td><span class="title">Race hero</span><span class="desc">${data.species}</span></span></td>
		</tr>
	</tbody>
</table>`
}

function createError(error) {
    app.innerHTML = ''
    const tr = document.createElement('tr')
    tr.innerHTML = `<td class="error">${error}</td><td class="error">No character found</td>`;
    app.appendChild(tr);
}
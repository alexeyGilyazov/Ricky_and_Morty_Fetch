document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById("app");
    const btn = document.getElementById("btn");
    const preloader = document.getElementById("preloader");
    const input = document.getElementById("input");
    const inputBtn = document.getElementById("inputBtn");
    const regex = /^\d+$/;

    // input.focus()

    async function renderData(data) {
        createTable(data);
    }

    function mainHanlder(num) {
        preloader.style.display = "flex";
        setTimeout(function () {
            const preloader = document.getElementById("preloader");
            preloader.style.display = "none";
        }, 2500);

        let url = `https://rickandmortyapi.com/api/character/${num}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => renderData(data))
            .catch((error) => console.log(error));
    }

    btn.addEventListener("click", async function () {
        const randomNum = Math.round(Math.random() * 826);
        mainHanlder(randomNum)
    });

    inputBtn.addEventListener("click", async function () {
        const valueTarget = input.value;
        mainHanlder(valueTarget)
        input.value = ''
        addDisabled()
    });

    input.addEventListener('input', function (event) {
        const inputValue = event.target.value
        const isValid = regex.test(inputValue)
        if (inputValue !== '' && isValid) {
            inputBtn.classList.remove('disabled')
            inputBtn.removeAttribute('disabled')
            inputBtn.innerText = 'Search'
        }
        else {
            addDisabled()
        }
    })

    function addDisabled() {
        inputBtn.textContent = 'Disabled'
        inputBtn.classList.add('disabled')
        inputBtn.setAttribute('disabled', true)
    }


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
</table>`;
    }

})
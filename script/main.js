document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById("app");
    const btn = document.getElementById("btn");
    const preloader = document.getElementById("preloader");
    const input = document.getElementById("input");
    const inputBtn = document.getElementById("inputBtn");

    input.focus()


    function showProloader() {
        setTimeout(function () {
            const preloader = document.getElementById("preloader");
            preloader.style.display = "none";
        }, 2500);
    }

    async function renderData(data) {
        createTable(data);
    }

    const mainHanlder = (num) => {
        preloader.style.display = "flex";
        showProloader();

        let url = `https://rickandmortyapi.com/api/character/${num}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => renderData(data))
            .catch((error) => console.log(error));
    }

    btn.addEventListener("click", async function () {
        const randomNum = () => Math.round(Math.random() * 826);
        mainHanlder(randomNum())
    });

    inputBtn.addEventListener("click", async function () {
        const valueTarget = input.value;
        mainHanlder(valueTarget)
        input.value = ''
    });

    input.addEventListener('input', function (event) {
        const inputValue = event.target.value
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
</table>`;
    }

})
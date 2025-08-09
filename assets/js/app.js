const body = document.querySelector("body");
const zipCodeField = body.querySelector("#input-search");
const buttonSearch = body.querySelector("#button-search");
const resultSearch = body.querySelector("#result-search");

if (resultSearch.innerHTML == "") {
    resultSearch.style.display = "none";
}

buttonSearch.addEventListener("click", async (event) => {
    event.preventDefault();

    resultSearch.innerHTML = "";

    let zipCode = zipCodeField.value;

    zipCode = zipCode.replace("-", "");
    zipCode = zipCode.replace(" ", "");
    zipCode = zipCode.replace(" ", "");
    zipCode = zipCode.trim();

    const api = `https://viacep.com.br/ws/${zipCode}/json/`;

    try {
        const response = await fetch(api);

        if (!response.ok) throw new Error("Erro na requisição");

        const data = await response.json();

        if (data.erro) throw new Error("Erro na requisição");

        resultSearch.style.display = "grid";
        createLine(`${data.localidade} - ${data.uf}`);
        createLine(setState(data.uf));
        createLine(data.logradouro);
        createLine(data.bairro);
    } catch (error) {
        createLine("Ops, algo deu errado!");
    }
});

const createLine = (data) => {
    const line = document.createElement("p");
    const text = document.createTextNode(data);

    line.appendChild(text);
    resultSearch.appendChild(line);

    if (line.innerHTML == "") {
        line.style.display = "none";
    }
};

const sr = ScrollReveal({
    duration: 2500,
    distance: "80px",
});

sr.reveal(".search-cep-area", { origin: "top", delay: 500 });
sr.reveal(".search-cep-area", { origin: "top", dalay: 500 });

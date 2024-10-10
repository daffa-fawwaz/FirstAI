let question = document.getElementById("text");
let answer = document.getElementById("answer");
let apiUrl = 'https://widipe.com/openai'
let load = document.getElementById("loading")

async function sendReq() {
    try {
       load.classList.remove("hidden")
       const url = `${apiUrl}?text=${question.value}`;
       const response = await fetch(url);
       if (!response.ok) {
        throw new Error(`Request Failed Wuth Status: ${response.status}`);
       } 
       load.classList.add("hidden")
       const data = await response.json();
       answer.innerHTML = data.result;
       console.log(data);
    } catch (error) {
        console.log(error.message)
    }
}
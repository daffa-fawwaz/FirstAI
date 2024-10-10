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
       var htmlContent = renderApiResult(data.result)
       answer.innerHTML = htmlContent;
    //    console.log(data);
       answer.innerHTML = htmlContent;
    } catch (error) {
        console.log(error.message)
    }
}


function renderApiResult(result) {
  // Pisahkan teks berdasarkan blok kode dan teks lainnya
  let formattedHtml = result
    .replace(/```html([^`]+)```/g, "<pre><code>$1</code></pre>") // Mengubah blok kode menjadi <pre><code>
    .replace(/### (.+)/g, "<h3>$1</h3>") // Mengubah heading menjadi <h3>
    .replace(/\n/g, "<br>") 
    .replace(/\- (.+)/g, "<li>$1</li>") // Mengganti bullet point dengan <li>
    .replace(/(\n\n)/g, "</p><p>") // Memisahkan paragraf
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Tambahkan wrapper <p> di awal dan akhir
  return `<p>${formattedHtml}</p>`;
}

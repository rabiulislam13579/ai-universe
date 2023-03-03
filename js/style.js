const loadData=()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayData(data.data.tools));
}
const displayData=elements=>{
   const divContainer=document.getElementById('div-container');
    for(const element of elements){
        console.log(element)
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card">
            <img src="${element.image}" class="box-img img-fluid card-img-top p-4 rounded-3" alt="...">
            <div class="card-body">
                <h4 class="mb-3">Features</h4>
                <p class="card-text"><ol>
                <li>${element.features[0]}</li>
                <li>${element.features[1]}</li>
                <li>${element.features[2]}</li>
                </ol>
                </p>
            </div>
        </div>
        `
        divContainer.appendChild(div);
    }

}



loadData()
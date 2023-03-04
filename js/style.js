const loadData=()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayData(data.data.tools));
}
const displayData=elements=>{
   const divContainer=document.getElementById('div-container');
    for(const element of elements){
       // console.log(element)
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card">
            <img src="${element.image}" class="box-img img-fluid card-img-top p-4 rounded-3" alt="...">
            <div class="card-body">
                <h5 class="mb-3 fw-semibold">Features</h5>
                <p class="card-text"><ol>
                <li>${element.features[0]? element.features[0]:'no data found'}</li>
                <li>${element.features[1]? element.features[1]:'no data found'}</li>
                <li>${element.features[2]? element.features[2]:'no data found'}</li>
                </ol>
                </p>
                <hr>
                <div class="d-flex justify-content-between  align-items-center">
                  <div>
                   <h4 class="fw-semibold">${element.name}</h4>
                   <p><i class="fa-regular fa-calendar-days"></i> ${element.published_in}</p>

                  </div>
                  <div>
                    <button onclick="loadElementDetail('${element.id}')" class="rounded-circle bg-danger-subtle text-danger border border-danger-subtle" data-bs-toggle="modal" data-bs-target="#elementModal"><i class="fa-solid fa-arrow-right"></i></button>
          
                  </div>
                </div>
            </div>
        </div>
        `
        divContainer.appendChild(div);
    }

}

const loadElementDetail=async id=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res=await fetch(url);
    const data=await res.json();
    displayElementDetail(data.data);

}

const displayElementDetail=element=>{
    console.log(element.integrations);
    const featuresName=Object.entries(element.features)
    
   const elementDetailContainer=document.getElementById('element-details-container');
   elementDetailContainer.innerText='';
   const elementDiv=document.createElement('div');
   elementDiv.innerHTML=`
   <div class="d-flex ">
      <div class="bg-warning-subtle p-2 border border-danger rounded-3">
         <h5>${element.description}</h5>
        <div class="d-flex">
           <div>
              <p></p>
              <p></p>
           </div>
           <div>
              <p></p>
              <p></p>
           </div>
           <div>
               <p></p>
               <p></p>
           </div>
        </div>
        <div class="d-flex">
            <div>
               <h4>Features</h4>
               <ul>
                 <li>${featuresName[0][1].feature_name? featuresName[0][1].feature_name:'no data found'}</li>
                 <li>${featuresName[1][1].feature_name? featuresName[1][1].feature_name:'no data found'}</li>
                 <li>${featuresName[2][1].feature_name? featuresName[2][1].feature_name:'no data found'}</li>
               </ul>
            </div>
            <div>
                <h4>Integrations</h4>
                <ul>
                 <li>${element.integrations[0]? element.integrations[0]:'no data found'}</li>
                 <li>${element.integrations[1]? element.integrations[1]:'no data found'}</li>
                 <li>${element.integrations[2]? element.integrations[2]:'no data found'}</li>
                 <li>${element.integrations[3]? element.integrations[3]:'no data found'}</li>
                 <li>${element.integrations[4]? element.integrations[4]:'no data found'}</li>
               </ul>
            </div>
        </div>
      </div>
      <div class="ms-1">
        <img class="img-fluid" src="${element.image_link[0]}">
      </div>
   </div>
   `
   elementDetailContainer.appendChild(elementDiv)
}


loadData()
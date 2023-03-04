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
    console.log(element.accuracy.score);
    const featuresName=Object.entries(element.features);
    // const accuracy=element.accuracy.score;
    // const accuracyScore=accuracy*100;
    // console.log(accuracyScore);
    
   const elementDetailContainer=document.getElementById('element-details-container');
   elementDetailContainer.innerText='';
   const elementDiv=document.createElement('div');
   elementDiv.innerHTML=`
   <div class="d-flex ">
      <div class="bg-warning-subtle p-2 border border-danger rounded-3">
         <h5>${element.description}</h5>
        <div class="d-flex">
           <div class="text-success fw-semibold bg-light border rounded-3 p-1">
              <p>${element.pricing?element.pricing[0].price :'free of cost'}</p>
              <p>${element.pricing? element.pricing[0].plan : 'free of cost'}</p>
           </div>
           <div class="text-warning fw-semibold bg-light border rounded-3 p-1">
               <p>${element.pricing?element.pricing[1].price :'free of cost'}</p>
               <p>${element.pricing? element.pricing[1].plan : 'free of cost'}</p>
           </div>
           <div class="text-danger fw-semibold bg-light border rounded-3 p-1">
           <p>${element.pricing?element.pricing[2].price :'free of cost'}</p>
           <p>${element.pricing? element.pricing[2].plan : 'free of cost'}</p>
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
                 <li>${element.integrations? element.integrations[0]:'no data found'}</li>
                 <li>${element.integrations? element.integrations[1]:'no data found'}</li>
                 <li>${element.integrations? element.integrations[2]:'no data found'}</li>
                 <li>${element.integrations? element.integrations[3]:'no data found'}</li>
                 <li>${element.integrations? element.integrations[4]:'no data found'}</li>
               </ul>
            </div>
        </div>
      </div>
      <div class="ms-1">
        <img class="img-fluid" src="${element.image_link[0]}"> 
        <div class="text-center">
          <h4>${element.input_output_examples? element.input_output_examples[0].input: 'no data found'}</h4>
          <p>${element.input_output_examples? element.input_output_examples[0].output: 'no data found'}</p>
          <h4>${element.input_output_examples? element.input_output_examples[1].input: 'no data found'}</h4>
          <p>${element.input_output_examples? element.input_output_examples[1].output: 'no data found'}</p>
        </div>
      
      </div>
     
   </div>
   `
   document.getElementById('accuracy-btn').innerText=`${element.accuracy.score*100}% accuracy`;
   const accuracyDiv=document.getElementById('accuracy-div');
   if(element.accuracy.score*100!==0){
    accuracyDiv.classList.remove('d-none');
   }
   else{
    accuracyDiv.classList.add('d-none');
   }

 elementDetailContainer.appendChild(elementDiv)
}


loadData()
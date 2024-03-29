const loadData=(dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayData(data.data.tools,dataLimit));
}
const displayData=(elements,dataLimit)=>{
   const divContainer=document.getElementById('div-container');
   divContainer.innerText='';
   
   const showAll=document.getElementById('show-all');
   //display for fixed number of element
   if(elements.length>dataLimit){
    elements=elements.slice(0,dataLimit);
    showAll.classList.remove('d-none')
   }
   else{
    showAll.classList.add('d-none')
   }




    for(const element of elements){
      console.log(element)
     //for sort 
     document.getElementById('sort-btn').addEventListener('click',function(){
      let dateArr=element.published_in.split('/');
     let year = parseFloat(dateArr[2]);
     let month = parseFloat(dateArr[1]) - 1;
     let day = parseFloat(dateArr[0])
     let elementDate = new Date(year, month, day);
     element.published_in = elementDate;
     console.log(elements)

     
     
     })



       
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
    loader(false);

}
const processFindingData=(dataLimit)=>{
  loader(true);
  loadData(dataLimit)

}
const loader=isLoading=>{
  const loaderSection=document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}


processFindingData(6);
document.getElementById('btn-showall').addEventListener('click',function(){
  processFindingData();
})



//modal data
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
   <div class="d-md-flex ">
      <div class="bg-warning-subtle p-2 border border-danger rounded-3">
         <h5>${element.description}</h5>
        <div class="d-flex ">
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
          <h4>${element.input_output_examples? element.input_output_examples[0].input: 'No! Not Yet! take a break!!'}</h4>
          <p>${element.input_output_examples? element.input_output_examples[0].output: 'No! Not Yet! take a break!!'}</p>
          <h4>${element.input_output_examples? element.input_output_examples[1].input: 'No! Not Yet! take a break!!'}</h4>
          <p>${element.input_output_examples? element.input_output_examples[1].output: 'No! Not Yet! take a break!!'}</p>
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




const loadData=()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayData(data.data.tools));
}
const displayData=elements=>{
    // console.log(elements);
    for(const element of elements){
        console.log(element);
    }

}



loadData()
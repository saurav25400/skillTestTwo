let parentElement=document.getElementById('main-parent');



// ........getting data   from local   storage and   binding data using  bootstrap card to show  to user in frontend side...........

let  objectData=JSON.parse(localStorage.getItem('data1'));
console.log(objectData);

function createCard(){
    parentElement.innerHTML=`

    <div class="card">
        <img src="${objectData[0].img}" class="card-img-top" alt="not found">
        <div class="card-body">
          <h5 class="card-title">${objectData[0].movieName}</h5>
          <h5 class="card-text">${objectData[0].year}</h5>
          <p class="plot">${objectData[0].plot}</p>
        </div>
      </div> 
    
    
    `


}

createCard();









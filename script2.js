let suggestionContainer = document.getElementById("suggestions-container");
console.log(suggestionContainer);




// inserting movieList named array  in local storage  for storing list of favourite movies........

if (!localStorage.getItem("movieList")) {
  localStorage.setItem("movieList", JSON.stringify([]));
}
var count = 1;






// inserting data1 named array  in local storage  for displaying particular movie info to  user..........

if (!localStorage.getItem("data1")) {
  localStorage.setItem("data1", JSON.stringify([]));
}
const obj = new Object();






// get data  function fetches  user-clicked movie information and stroing in local storage for   displaying to user in details..........

function getData(event) {
  let targetElement = event.target;

  console.log(targetElement.parentNode.children);
  let collection = targetElement.parentNode.children;
  console.log(targetElement.parentNode.previousElementSibling.src);
  let imgValue = targetElement.parentNode.previousElementSibling.src;
  obj.img = imgValue;
  obj.movieName = collection[0].innerText;
  obj.year = collection[1].innerText;
  obj.plot = collection[2].innerText;

  console.log(obj);
  let dataArray = JSON.parse(localStorage.getItem("data1"));
  if (dataArray.length > 0) {
    dataArray.splice(0, dataArray.length);
  }
  dataArray.push(obj);
  localStorage.setItem("data1", JSON.stringify(dataArray));

  if (targetElement.classList.contains("favourites")) {
    console.log("yes  buton");
    let movieDetailsObj = new Object();
    movieDetailsObj.id = Date.now();
    movieDetailsObj.img = imgValue;
    movieDetailsObj.movieName = collection[0].innerText;
    movieDetailsObj.year = collection[1].innerText;
    movieDetailsObj.plot = collection[2].innerText;
    console.log("movieObject", movieDetailsObj);

    let favouriteMovieList = JSON.parse(localStorage.getItem('movieList'));
    if(favouriteMovieList.length){
        for(let i=0;i<favouriteMovieList.length;i++){
            if(favouriteMovieList[i].movieName===movieDetailsObj.movieName){
                window.alert('Movie has been already added to your favourite List !!!');
                return;
            }
        }
    }

    favouriteMovieList.push(movieDetailsObj);
    localStorage.setItem('movieList', JSON.stringify(favouriteMovieList));
    console.log("successfull");
    window.alert("Movie has been added to your  favourite List  chek it  out!!!");
  }
}

suggestionContainer.addEventListener("click", getData);

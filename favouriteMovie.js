
let parentElement=document.getElementById('flex-element');

// fetching user'sfavourite movielist from local storage.......
let favouriteMovieListArray=JSON.parse(localStorage.getItem('movieList'));
console.log(favouriteMovieListArray);


// creating and adding favourite movie in favourite list as  per  user's choice................... 

function createMovieList(){

    favouriteMovieListArray.forEach((movie) => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-2');
        card.innerHTML = `
            <img src="${movie.img}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
            <p class="card-text" style="display:none">${movie.id}</p>
                <h5 class="card-title">${movie.movieName}</h5>
                <p class="card-text">${movie.year}</p>
                <button type="button" class="btn btn-info mt-3 favourites">Click to Remove From Favourites</button>
            </div>
        `;
        parentElement.appendChild(card);

        
        
    });
   

}

// ...........deleting user's favourite movie   from   favourite list  as  soon as user clicked on   delete button.......


function deleteFavouriteMovie(event){
    let target=event.target;
    if(target.classList.contains('favourites')){
        console.log("yes  favourites");
        let coll=target.parentNode.children[0].innerText;
        console.log('coll',coll);
        for(let i=0;i<favouriteMovieListArray.length;i++){
            if(favouriteMovieListArray[i].id===Number(coll)){
                console.log('yes  got success');
                favouriteMovieListArray.splice(i,1);
                localStorage.setItem('movieList',JSON.stringify(favouriteMovieListArray));
                target.parentNode.parentNode.remove();
            }
        }

        

        

    }


}






parentElement.addEventListener('click',deleteFavouriteMovie);

// calling  function...........

createMovieList();



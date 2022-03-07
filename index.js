async function imagesMain() {
  const response = await fetch("https://picsum.photos/v2/list?page=2&limit=100");
  var data = await response.json();
  // console.log("data",data);

  const allData=data.map((e)=>(
    

    `<div>
    <img src="${e.download_url}" class="photos"/>
    <div class="boxes">
    <p>${e.author}</p>
    <p>${e.height} likes</p>
    <p>${e.width} Dislikes</p>
    </div>
    </div>
    `
   ))
  

  const mainBody=document.getElementById("mainbody")
  mainBody.innerHTML=allData



}


async function imagesExplore() {
    const response = await fetch("https://picsum.photos/v2/list");
    var dataExplore = await response.json();
    console.log("dataExplore",dataExplore);
    
    const exploreData=dataExplore.filter(item=>item.id<1003).map((e)=>(
      `<div>
      <img src="${e.download_url}" />
      <div class="auth">
      <p>${e.author}</p>
      <p>${e.height} Posts</p>
      </div>
      </div>
      `
     ))
    const ExploreBody=document.getElementById("explore")
    ExploreBody.innerHTML=exploreData
  
  
  }
  
// imagesMain()
// imagesExplore()

var timerId;

let movies_div = document.getElementById("movies");


async function searchMovies(n){
    let res = await fetch(`https://swapi.dev/api/people/?search=${n}`);
 
let data = await res.json();
return data.results;
}
function appendMovies(m){
    movies_div.innerHTML=null;
    m.forEach(({name}) => {
        let p = document.createElement("p");
        p.innerText=name
        movies_div.append(p)
    });
}

async function main(){
    let name = document.getElementById("query").value;
    if(name===""){
      movies_div.style.display="none"
    }else{
     movies_div.style.display="block"
    }

   let movies = await searchMovies(name);
   if(movies === undefined){
       return false;
   }

   appendMovies(movies)
   console.log("movies",movies);

}

function debounce(func,delay){
    let name = document.getElementById("query").value;
   
if(timerId){
    clearTimeout(timerId)
}
   //ave-1st setimeout created
  //is there any previous request,clear that
  timerId=setTimeout(()=>{
    func();
},delay)

}


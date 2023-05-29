function postData(data){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "public.php", true);
  xhr.onreadystatechange= function(){
    if(xhr.readyState==4 && xhr.status==200){

    }
  }
  xhr.send(data);
}

function getData(){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "public.php", true);
  xhr.onreadystatechange= function(){
    if(xhr.readyState==4 && xhr.status==200){
      let data = xhr.responseText;
      figures = parse(data)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      figures.forEach(e => {
        e.draw(ctx)
      })
    }
  }
  xhr.send()
}

function parse(data){
  let elements = JSON.parse(data).figures
  for(let i = 0; i < elements.length; i++){
  if(elements[i].r)
    elements[i] = Object.assign(new Circle(), elements[i]) 
  else
    elements[i] = Object.assign(new Line(), elements[i]) 
  } 
  return elements
}

document.addEventListener("DOMContentLoaded", () => {
  
  getData();


  ghost = document.getElementById("ghost")

  ghost.addEventListener('touchend', (e) => {
    postData(JSON.stringify({ figures: figures.concat(figure) }))
  })

  setInterval(() => {
    getData();
  }, 1000);

});
  
function undo2(){
  undo();
  postData(JSON.stringify({ figures: figures }));
}

function cleaa(){
  clea();
  figures = [];
  postData(JSON.stringify({ figures: figures }));
}
  
export const keyUp = (e) = {
  if(e.target.scrollTop > 0){
    e.target.style.height = e.target.scrollHeight + "px";
  }
}
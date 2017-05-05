function toggleFullscreen(caller) {
  // document.getElementById(class_).classList.add('fullScreen');
  if (caller.parentElement.classList.contains('fullScreen'))
    caller.parentElement.classList.remove('fullScreen');
  else caller.parentElement.classList.add('fullScreen');

}

function exitFullscreen() {
  if (!document.getElementsByClassName('fullScreen')[0]) return;
  document.getElementsByClassName('fullScreen')[0].classList.remove('fullScreen');
}

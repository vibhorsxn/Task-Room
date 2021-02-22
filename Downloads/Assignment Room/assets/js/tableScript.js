let btns = document.getElementsByClassName("apply-btn");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    btns[i].innerHTML = "Applying...";
    setTimeout(() => {
      btns[i].innerHTML = "Applied";
    }, 3000);
  });
}

const colls = document.getElementsByClassName("picking_btn");
this.toggleContent = (content) => {
  if (content.style.height) {
    content.style.height = null;
  } else {
    content.style.height = content.scrollHeight + "px";

};

collapseAllOpenContent = () => {
  const colls = document.getElementsByClassName("picking_btn");
  for (const coll of colls) {
    if (coll.classList.contains("picking_btn__active")) {
      coll.classList.remove("picking_btn__active");
      toggleContent(coll.nextElementSibling);
     
    }
  }
};
for (const coll of colls) {
  coll.addEventListener("click", function () {
    if (!this.classList.contains("picking_btn__active")) {
      collapseAllOpenContent();
    }
    this.classList.toggle("picking_btn__active");
    toggleContent(this.nextElementSibling);
  });
}

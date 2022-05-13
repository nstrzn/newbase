let collapseBtn = document.querySelector('.collapsible');
let submitBtn = document.querySelector(".theme-submit-btn");

collapseBtn.addEventListener('click', collapse);
function collapse() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
}

submitBtn.addEventListener('click', closeCollapsible);

function closeCollapsible() {
  let form = document.querySelector(".forum-form");
  form.style.display = "none";
}
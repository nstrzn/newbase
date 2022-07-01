$(document).ready(() => {
    $("#modal-button").click(() => {
    $(".modal-body").html('');
    $.get("/api/forum", (results = {}) => {
        let data = results.data;
        if (!data || !data.themes) {
            console.log("no data");
        return;} 
   data.themes.forEach((theme) => {
   $(".modal-body").append(
   `<div>
   <span class="user-name">
   ${theme.title}
   </span>
   <button class="join-button" data-id="${theme._id}">Add</button>
   <div class="user-email">
   ${theme.description}
   </div>
   </div>`
   );
   });
    });
    });
   });
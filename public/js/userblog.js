$(document).ready(function () {

    var userId;

    $.get("/api/userdata").then(function (data) {
        $(".member-name").text(data.username);
        userId = data.id;
    }).then(function () {
        console.log(userId)
        $.get("/api/posts/" + userId, function (data) {
            console.log(data)
            data.forEach(function (e) {
                $("#blogContainer").append(`
            <div class="container">
            <div class="row">
                <div class="col-md">
                <h1 class="titleBlog">${e.title}</h1>
                </div>
                <div class="col-md">
                <p class="usernameBlog">${e.Author.username}</p>
                </div>
            </div>
            <div class="row">
                <h4 class="bodyBlog">${e.body}</h4>
            </div>
            <div class="row">
                <button class="delete" data-id="${e.id}">Delete Post</button>
            </div>
            <div class="row">
                <button class="edit" data-id="${e.id}">edit</button>
            </div>


            </div>
        `)
            });

            $(".delete").on("click", function () {
                var id = $(this).attr("data-id")
                console.log(id)
        
                $.ajax({
                    method: "DELETE",
                    url: "/api/posts/" + id
                }).then(function () {
                    window.location.replace("/userblog");

                });
            });

            $(".edit").on("click", function () {
                var id = $(this).attr("data-id")
                console.log(id)
        
                localStorage.setItem("postId",id)
                window.location.replace("/createblog");
            });
        });
    });

    
});


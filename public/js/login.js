$(document).ready(function () {
//might want to add signup redirect button
  var userInput = $("#userInput");
  var passwordInput = $("#passwordInput");

  $("#loginButton").on("click", function (event) {
    //
    event.preventDefault();
    var userData = {
      username: userInput.val().trim(),
      password: passwordInput.val().trim()
      //userid
    };
    console.log(userData);

    if (!userData.username || !userData.password) {
      return;
    }
    loginUser(userData);
    userInput.val("");
    passwordInput.val("");

  });


  function loginUser(userData) {
    $.post("/api/login", {
      username: userData.username,
      password: userData.password,
      //authorId: req.user.id
    })
      .then(function() {
        window.location.replace("/viewblogs");
      });
  }
  //still need to get user data from author and connect it to post probabl like the code below

  // // Function for retrieving authors and getting them ready to be rendered to the page
  // function getAuthors() {
  //   $.get("/api/authors", function(data) {
  //     var rowsToAdd = [];
  //     for (var i = 0; i < data.length; i++) {
  //       rowsToAdd.push(createAuthorRow(data[i]));
  //     }
  //     renderAuthorList(rowsToAdd);
  //     nameInput.val("");
  //   });
  // }
});

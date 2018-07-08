$("#btn").click(function() {
    $.get("https://dog.ceo/api/breeds/image/random")
    .done(function(data) {
        console.log(data);
        $("#image").attr("src", data.message);
    })
    .fail(function() {
        console.log("There was an error");
    })
});
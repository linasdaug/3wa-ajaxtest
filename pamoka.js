$(document).ready(function(){
    var  d = $("<div>");
    $("#mid").append(d);

    $("#mid").mouseover(function(){
        alert("Good morning");
    });
});

let s = '{"id":5}'

$.ajax({
    url:"http://192.168.1.81:8080/list/update",
    data: s,
    type: "POST",
    datatype: "json";
    success: function(data) {
        console.log(data);
    });

//list atveju:

$.ajax({
    url:"http://192.168.1.81:8080/list",
    type: "LIST",
    success: function(data) {
        console.log(data);
    });
})

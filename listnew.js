// let divai = document.getElementsByClassName("red");
// function addclass() {
//     for (var i = 0; i < divai.length; i++) {
//         divai[i].classList.toggle("blue");
//     }
// };
//
// $("#btn").click(function(){
//     $(".red").toggleClass("blue");
// });

let dataIndex = 0;
let myJSON = "";

$(document).ready(function(){
    let dataIndex = 0;
    $("#listbutton").click(function(){
        $("table").remove();
        $.ajax({
            url:"http://192.168.1.81:8080/list",
            type: "GET",
            contentType: "application/json",
            success: function(data) {
                console.log(data);

                $form = $("<table>");

                for (var i = 0; i < data.length; i++) {
                    $form.append("<tr>");
                    let a = data[i].id + "";
                    let b = data[i].userName + "";
                    let c = data[i].eMail + "";
                    let d = data[i].age + "";
                    $form.append("<td>" + a + "</td><td>" + b + "</td><td>" + c + "</td><td>" + d + "</td>");
                    $form.append("<td><button id = " + i + " type='button' name='button' method='get'>Update</button>" + "</td><td>" + "<button id = " + "'del" + i + "' 'type'='button' name='button'>Delete</button><br>");
                    $form.append("</tr>");
                    dataIndex = i;
                };
                    $form.append("</table>");
                    $form.appendTo("body");

                    for (let j = 0; j < data.length; j++) {

                        $("#del"+j).click(function(){

                            let str = {};
                            console.log(str);
                            str.id = parseInt(data[j].id);
                            str.userName = data[j].userName;
                            str.eMail = data[j].eMail;
                            str.age = parseInt(data[j].age);

                            let strToDelete = JSON.stringify(str);
                            $.ajax({
                                url:"http://192.168.1.81:8080/delete",
                                data: strToDelete,
                                type: "POST",
                                contentType: "application/json",
                                dataType: "json",
                                success: function(data) {
                                    console.log(data);
                                }
                            });
                            console.log("trynimas tesiasi");
                            $("table").remove();
                            // $form = $("<table>");
                            //
                            // for (let k = 0; k < data.length; k++) {
                            //     $form.append("<tr>");
                            //     let a = data[k].id + "";
                            //     let b = data[k].userName + "";
                            //     let c = data[k].eMail + "";
                            //     let d = data[k].age + "";
                            //     $form.append("<td>" + a + "</td><td>" + b + "</td><td>" + c + "</td><td>" + d + "</td>");
                            //     $form.append("<td><button id = " + k + " type='button' name='button' method='get'>Update</button>" + "</td><td>" + "<button id = " + "'del" + k + "' 'type'='button' name='button'>Delete</button><br>");
                            //     $form.append("</tr>");
                            //     dataIndex = k;
                            // };
                            //     $form.append("</table>");
                            //     $form.appendTo("body");
                    })
                };
            }
        });
    });

    $("#newbutton").click(function(){

        $newform = $("<form>Enter new User:<br>");
        $newform.append("User Name: <input id='newuser' type='text'></input><br>");
        $newform.append("Email: <input id='newemail' type='text'></input><br>");
        $newform.append("Age: <input id='newage' type='text'></input><br>");
        $newform.append("<input id='newsubmit' type='button'>Submit</input><br>");
        $newform.appendTo("body");

        $("#newsubmit").click(function(){
            console.log("Submit paspaustas");
            let str = {};
            str.id = 5000 + dataIndex;
            str.userName = $("input#newuser").val();
            str.eMail = $("input#newemail").val();
            let age = $("input#newage").val();
            str.age = parseInt(age);

            console.log(str);

            let dataToSend = JSON.stringify(str);

            $.ajax({
                url:"http://192.168.1.81:8080/add",
                data: dataToSend,
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                success: function(data) {
                    console.log(data);
                }
            });

    })
})

})


































//         $.get("http://192.168.1.81:8080/list", function(data){
//             $("#forma").append("<form>");
//             console.log(data);
//             console.log($("#forma"));
//             for (var i = 0; i < data.length; i++) {
//                 console.log("data to be added");
//                 $("#forma").append('<input id=' + '"' + i + '-id' + '"' + 'type="text" value=' + data[i].id + '>');
//                 $("#forma").append('<input id=' + '"' + i + '-userName' + '"' + ' type="text" value=' + data[i].userName + '>');
//                 $("#forma").append('<input id=' + '"' + i + '-age' + '"' + ' type="text" value=' + data[i].age + '>');
//                 $("#forma").append('<input id=' + '"' + i + '-eMail' + '"' + ' type="text" value=' + data[i].eMail + '>');
//
//                 $("#forma").append('<button class="update" type="text" value="update" method="post">Update</button><br>');
//                 dataIndex = i;
//             };
//             $("#forma").append("</form>");
//             $("#newbutton").click(function(){
//                 $("#forma").append('<form>');
//                 $("#forma").append('<input id="' + data.length + '-id" type="text" value="">');
//                 $("#forma").append('<input id="' + data.length + '-userName" type="text" value="">');
//                 $("#forma").append('<input id="' + data.length + '-age" type="text" value="">');
//                 $("#forma").append('<input id="' + data.length + '-eMail" type="text" value="">');
//                 $("#forma").append('<button class="update" type="text" value="update" method="post">Update</button><br>');
//                 $("#forma").append("</form>");
//             });
//
//         });
//     });
// })

            // $("update").click(function(){
            //     for (var i = 0; i < data.length; i++) {
            //         data[i].id =
            //         data[i].userName =
            //         data[i].age =
            //         data[i].eMail =
            //
            //         let line = { "id": data[i].id, "userName": data[i].userName, "age": parseInt(data[i].age), "eMail": data[i].eMail };
            //         let myJSON = myJSON + JSON.stringify(line);
            //         window.location = "http://192.168.1.81:8080/update" + myJSON;
            //     };
            // });



        // });

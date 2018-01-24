
let dataIndex = 0;

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
                    $form.append("<tr id='tr"+i+"'>");
                    let a = data[i].id + "";
                    let b = data[i].userName + "";
                    let c = data[i].eMail + "";
                    let d = data[i].age + "";
                    $form.append("<td>" + a + "</td><td>" + b + "</td><td>" + c + "</td><td>" + d + "</td>");
                    $form.append("<td><button id = 'upd" + i + "' type='button' name='button' method='get'>Update</button>" + "</td><td>" + "<button id = " + "'del" + i + "' 'type'='button' name='button'>Delete</button><br>");
                    $form.append("</tr>");
                    dataIndex = i;
                };
                    $form.append("</table>");
                    $form.appendTo("body");

                    for (let j = 0; j < data.length; j++) {
                        $("#del"+j).click(function(){

                            let str = {};
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
                            $("#tr"+i).remove();

                    })  /*delete funkcijos pabaiga, update pradžia*/
                        $("#upd"+j).click(function(){
                            let ustr = {};
                            ustr.id = parseInt(data[j].id);
                            ustr.userName = data[j].userName;
                            ustr.eMail = data[j].eMail;
                            ustr.age = parseInt(data[j].age);
                            $updform = $("<form>Update user data:<br>");
                            $updform.append("User Name: <input id='upduser' type='text'>" + ustr.userName + "</input><br>");
                            $updform.append("Email: <input id='updemail' type='text'>"+ ustr.eMail +"</input><br>");
                            $updform.append("Age: <input id='updage' type='text'>"+ ustr.age +"</input><br>");
                            $updform.append("<input id='updsubmit' type='button' value='Update'></input><br>");
                            $updform.appendTo("body");

                            $("#updsubmit").click(function(){
                                console.log("Update paspaustas");

                                ustr.userName = $("input#upduser").val();
                                ustr.eMail = $("input#updemail").val();
                                let age = $("input#updage").val();
                                ustr.age = parseInt(age);

                                console.log(ustr);

                                let dataToSend = JSON.stringify(ustr);

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
                            }); /*update > submit pabaiga */
                    }); /* update funkcijos pabaiga*/
                };
            }
        });
    });

    $("#newbutton").click(function(){

        $newform = $("<form>Enter new User:<br>");
        $newform.append("User Name: <input id='newuser' type='text'></input><br>");
        $newform.append("Email: <input id='newemail' type='text'></input><br>");
        $newform.append("Age: <input id='newage' type='text'></input><br>");
        $newform.append("<input id='newsubmit' type='button' value='Submit'></input><br>");
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

    });
});

})

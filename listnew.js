
//Scriptų išvengimas

function escapeScript(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
};

// Mygtukas Cancel (įvedime New)

function cancelbut() {
    $("#entry").remove();
    // let newform = $("<form id='entry'>Enter new User:<br>");
    // newform.append("User Name: <input id='newuser' type='text'></input><br>");
    // newform.append("Email: <input id='newemail' type='text'></input><br>");
    // newform.append("Age: <input id='newage' type='text'></input><br>");
    // newform.append("<input id='newsubmit' type='button' value='Submit' onclick=submitbut()></input><br>");
    // newform.append("<input id='newcancel' type='button' value='Cancel' onclick='cancelbut()'></input><br></form>");
    // newform.appendTo("#formholder");
}


//Mygtukas Submit (įvedime New)

function submitbut() {

    if ($("#newuser").val()) {
        let str = {};
        str.id = 5000;
        str.userName = escapeScript($("input#newuser").val());
        str.eMail = escapeScript($("input#newemail").val());
        let age = $("input#newage").val();
        str.age = parseInt(age);
        let dataToSend = JSON.stringify(str);

            $.ajax({
                url:"http://192.168.1.81:8080/add",
                data: dataToSend,
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                success: function(data) {
                    $("#entry").remove();
                    let ms = $("<p class='msg'>Item '" + str.userName + "' entered</p><br>");
                    ms.append("<input id='msreturn' type='button' value='Return'></input><br>")
                    ms.appendTo("#formholder");
                    $("#msreturn").click(function(){
                        ms.remove();
                    });

                }
            });


        };   //IF pabaiga
}


// Pagrindinė dalis

$(document).ready(function(){

    $("#listbutton").click(function(){
        $("#biglist").remove();
        $("#entry").remove();
        $.ajax({
            url:"http://192.168.1.81:8080/list",
            type: "GET",
            contentType: "application/json",
            success: function(data) {

                bigList = $("<table id='biglist'>");
                bigList.append("<thead><tr><td>Id</td><td>User name</td><td>eMail</td><td>Age</td><td></td><td></td></tr></thead>");

                for (var i = 0; i < data.length; i++) {
                    bigList.append("<tr id='tr"+i+"'>");
                    let a = escapeScript(data[i].id + "");
                    let b = escapeScript(data[i].userName + "");
                    let c = escapeScript(data[i].eMail + "");
                    let d = escapeScript(data[i].age + "");
                    bigList.append("<td class='td"+i+"'>" + a + "</td><td class='td"+i+"'>" + b + "</td><td class='td"+i+"'>" + c + "</td><td class='td"+i+"'>" + d + "</td>");
                    bigList.append("<td class='td"+i+"'><button id = 'upd" + i + "' type='button' name='button' method='get'>Update</button>" + "</td><td class='td"+i+"'>" + "<button id = " + "'del" + i + "' 'type'='button' name='button'>Delete</button><br>");
                    bigList.append("</tr>");
                };
                    bigList.append("</table>");
                    bigList.appendTo("#formholder");


                    //delete funkcijos pradžia


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
                                
                                let toDelete = ".td"+j;
                                $(toDelete).remove();

                                toDelete = '#tr'+j;
                                $(toDelete).remove();
                                bigList.append("<tr><td colspan=6 class='msg'>Item '" + str.userName + "' deleted</td></tr>");
                            }
                        });


                    });

                    /*delete funkcijos pabaiga, update pradžia*/

                        $("#upd"+j).click(function(){
                            $("#biglist").remove();
                            // let updated = false;


                            let ustr = {};
                            ustr.id = parseInt(data[j].id);
                            ustr.userName = escapeScript(data[j].userName);
                            ustr.eMail = escapeScript(data[j].eMail);
                            ustr.age = parseInt(data[j].age);
                            updform = $("<form id='entry'>Update user data:<br>");
                            updform.append("User Name: <input id='upduser' type='text' value = '" + ustr.userName + "'></input><br>");
                            updform.append("Email: <input id='updemail' type='text' value = '"+ ustr.eMail +"'></input><br>");
                            updform.append("Age: <input id='updage' type='text' value = '"+ ustr.age +"'></input><br>");
                            updform.append("<input id='updsubmit' type='button' value='Update'></input><br>");
                            updform.append("<input id='updreset' type='button' value='Reset' ></input><br>");
                            updform.append("<input id='updcancel' type='button' value='Cancel' ></input><br></form>");
                            updform.appendTo("#formholder");

                        $("#updsubmit").click(function(){

                            // if (!updated) {

                            ustr.userName = $("#upduser").val();
                            ustr.eMail = $("#updemail").val();
                            let age = $("#updage").val();
                            ustr.age = parseInt(age);

                            let dataToSend = JSON.stringify(ustr);
                            console.log(dataToSend);

                                $.ajax({
                                    url:"http://192.168.1.81:8080/update",
                                    data: dataToSend,
                                    type: "POST",
                                    contentType: "application/json",
                                    dataType: "json",
                                    success: function(data) {

                                        $("#entry").append("User '" + ustr.userName + "' updated")
                                        $("#entry").append("<input id='updreturn' type='button' value='Return'></input><br>")
                                        updated = true;

                                        $("#updreturn").click(function(){
                                            $("#entry").remove();
                                        });
                                    }
                                });

                            // } //"if !updated pabaiga"


                            }); /*update > submit pabaiga */

                            $("#updreset").click(function(){
                                document.getElementById('upduser').value = ustr.userName;
                                document.getElementById('updemail').value = ustr.eMail;
                                document.getElementById('updage').value = ustr.age;


                            });

                            $("#updcancel").click(function(){

                                $("#entry").remove();
                            });


                            // $("#entry").remove();
                    }); /* update funkcijos pabaiga*/
                };
                    // delete-update pabaiga
            }     //ajax-success pabaiga
        });     // ajax pabaiga
    });   //list pabaiga


// Mygtukas NEW

    $("#newbutton").click(function(){

        $("#biglist").remove();
        $("#entry").remove();
        let newform = $("<form id='entry'>Enter new User:<br>");
        newform.append("User Name: <input id='newuser' type='text'></input><br>");
        newform.append("Email: <input id='newemail' type='text'></input><br>");
        newform.append("Age: <input id='newage' type='text'></input><br>");
        newform.append("<input id='newsubmit' type='button' value='Submit' onclick='submitbut()'></input><br>");
        newform.append("<input id='newcancel' type='button' value='Cancel' onclick='cancelbut()'></input><br></form>");
        newform.appendTo("#formholder");
    });
})

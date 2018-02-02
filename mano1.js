var allData = [];
var allDataJSON = "";


function getData () {
    let data = window.localStorage.getItem("bigList");
    if (data) {
        data = JSON.parse(data);
    } else {
        data = [];
    }
    return data;
}

function getId () {
    let idIndex = $("#holder").attr("value");
    if (!idIndex) {
        idIndex = 0;
        data = getData();
        for (let i = 0, j = data.length; i < j; i++) {
            if (data[i].id > idIndex) {
                idIndex = data[i].id;
            }
        }
    };
        return idIndex;
}


$(function(){
    $("#listButton").click(showList);
    $("#newButton").click(saveRecord);

})

function showList() {
    $("#myContent").empty();

            let table = $("<table>");

            let data = getData();
            allData = data;

            for (let i = 0, j = data.length; i < j; i++) {

                let row = $("<tr>");
                let cell = $("<td>");
                cell.text(data[i].id);
                row.append(cell);
                cell = $("<td>");
                cell.text(data[i].userName);
                row.append(cell);
                cell = $("<td>");
                cell.text(data[i].eMail);
                row.append(cell);
                cell = $("<td>");
                cell.text(data[i].age);
                row.append(cell);
                cell = $("<td>");
                let delButton = $("<button>Delete</button>");
                cell.append(delButton);
                row.append(cell);
                cell = $("<td>");
                let updateButton = $("<button>Update</button>");
                cell.append(updateButton);
                row.append(cell);
                table.append(row);
                delButton.attr("value", data[i].id);
                delButton.click(deleteRecord);
                updateButton.attr("value", data[i].id);
                updateButton.click(saveRecord);
            }
            idIndex = getId();
            $("#myContent").append(table);
            $("#holder").attr("value", idIndex);
};



function saveRecord () {

    $("#myContent").empty();
    let formDiv = $("<div>");
    formDiv.append($("<h4>User name:</h4>"));
    let userName = $("<input id='userName'>");
    formDiv.append(userName);

    formDiv.append($("<p>"));
    formDiv.append($("<h4>e-mail:</h4>"));
    let eMail = $("<input id='eMail'>");
    formDiv.append(eMail);

    formDiv.append($("<p>"));
    formDiv.append($("<h4>Age:</h4>"));
    let age = $("<input id='age'>");
    formDiv.append(age);

    formDiv.append($("<p>"));

    let saveButton = $("<button>Save</button>");
    saveButton.click(saveClick);
    formDiv.append(saveButton);

    let cancelButton = $("<button>Cancel</button>");
    cancelButton.click(cancelClick);
    formDiv.append(cancelButton);

    if (this.value) {
        let o;

        for (let i = 0, j = allData.length; i < j; i++) {
            if (allData[i].id == this.value) {
                o = allData[i];
                break;
            }
        }
    let userid = $("<input type = 'hidden' id='userid'>");    //hidden input
    userid.val(o.id);
    formDiv.append(userid);

    eMail.val(o.eMail);
    age.val(o.age);
    userName.val(o.userName);

    }
    $("#myContent").append(formDiv);

}


function deleteRecord () {

    allData = getData();

    for (let i = 0, j = allData.length; i < j; i++) {
        if (allData[i].id == this.value) {
            allData.splice(i, 1);
            allDataJSON = JSON.stringify(allData);
            window.localStorage.setItem("bigList", allDataJSON);
            break;
        };
    };
    showList();
}



function saveClick() {
    allData = getData();

    let o = {
        'userName': $("#userName").val(),
        'eMail': $("#eMail").val(),
        'age': parseInt($("#age").val())
    };
    let uid = $("#userid");

    if (uid.length) {
            o.id = parseInt(uid.val());

            for (let i = 0, j = allData.length; i < j; i++) {
                if (allData[i].id == o.id) {
                    allData[i] = o;
                    break;
                };
            };

        } else {

//intarpas
            //
            // if (allData.length == 0) {
            //     o.id = 0;
            // } else {
            //     o.id = allData[allData.length-1].id + 1;



// o toliau
            let index = getId();
            index++;
            o.id = index;

            $("#holder").attr("value", index);
            allData.push(o);
    };

    allDataJSON = JSON.stringify(allData);
    window.localStorage.setItem("bigList", allDataJSON);
    showList();
}

function cancelClick() {
    $("#myContent").empty();
}

$(function () {
      let data 

    $("#loadbutton").click(async e => {

        if(sessionStorage.getItem("studentData") === null) {
            const url = "https://raw.githubusercontent.com/elauersen/info3070/master/jqueryex5.json";
            $('#results').text('Locating student data on Github, please wait...');

            try {
                let response = await fetch(url);
                if(!response.ok)
                throw new Error(`Status - ${response.status}, Text - ${response.statusText}`);
                data = await response.json();
                sessionStorage.setItem("studentData", JSON.stringify(data));
                $('#results').text('Student data on Github loaded!');
            }
            catch(error) {
                $("#results").text(error.message);
            }
        }
        else {
            data = JSON.parse(sessionStorage.getItem("studentData"));
        }

        let html = "";
        data.map(student => {
            html += `<div id="${student.id}" class="list-group-item">${student.firstname},${student.lastname} </div>`;
        });
        $("#studentList").html(html);
        $("#loadbutton").hide();
        $("#addbutton").show();
        $("#removebutton").show();

        });

        
    $("#studentList").click(e => {
        const student = data.find(s => s.id === parseInt(e.target.id));

        $("#results").text(`you selected ${student.firstname},${student.lastname}`);
    });

    $("#addbutton").click(e => {
        if(data.length > 0) {
            const student = data[data.length - 1];
            data.push({"id": student.id + 101, "firstname" : "new", "lastname": "student"});
            $("#results").text(`added student ${student.id + 101}`);
        }
        else {
            data.push({"id": 101, "firstname": "new", "lastname": "student"});
        }


        sessionStorage.setItem("studentData", JSON.stringify(data));
        let html = "";
        html += `<div id="${student.id}" class="list-group-item">${student.firstname},${student.lastname}</div>`;
        $("#studentList").html(html);
    });

    $("#removebutton").click(e => {
        if(data.length > 0) {
            const student = data[data.length - 1];
            data.splice(-1, 1);
            $("#results").text(`removed student ${student.id}`);

            sessionStorage.setItem("studentData", JSON.stringify(data));
            let html = "";
            data.map(student => {
                html += `<div id="${student.id}" class="list-group-item">${student.firstname},${student.lastname}</div>`;
            });
            $("#studentList").html(html);
        }
        else {
            $("#results").text(`no students to remove`);
        }
    });
});
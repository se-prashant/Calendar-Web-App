const buttons = document.querySelectorAll('button');
const form = document.querySelector(".inputField");

for (let button = 7; button <= 37; button++) {
    buttons[button].addEventListener('click', (e) => {
        document.querySelector(".inputField").style.opacity = 1;
        let mid = "";
        if (button < 16) {
            mid = "0";
        }
        form[1].value = "2021-07-" + mid + (button - 6).toString();
        refresh();
    })
}

function getSchedules(id) {
    const url = 'https://apischedulescal.herokuapp.com/schedules/' + id;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            // console.log("s");
            myJson.forEach(element => {
                var javaDate = new Date(element.date);
                var curDate = javaDate.getDate();
                let data = '<h3 class="dateVal">' + (curDate).toString() + '</h3><button class="deleteButton" onclick="deleteVal(' + (curDate).toString() + ')">-</button><h3 class="taskName">' + element.task_name + '</h3><p>' + element.time + '</p>';
                buttons[curDate + 6].innerHTML = data;
                buttons[curDate + 6].style.backgroundColor = "#dbeee0";
                buttons[curDate + 6].style.position = "relative";
                buttons[curDate + 6].disabled = true;
            });

        }).catch(function (error) {
            console.log(error);
        });
}

function freeSchedules(teachers_id, date) {
    // console.log('FreeApiCalling');
    const data = {
        date: date
    };
    
    const url = 'https://apischedulescal.herokuapp.com/schedules/delete/' + teachers_id;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data);
            // console.log("DO");
            // location.reload();
            resetButtons();
            getSchedules(teachers_id);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        return;
}

function postData(taskName, date, time, teachers_id) {
    console.log('apiCalling');
    const data = {
        task_name: taskName,
        date: date,
        time: time
    };
    const url = 'https://apischedulescal.herokuapp.com/schedules/' + teachers_id;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            resetButtons();
            getSchedules(teachers_id);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function resetButtons() {

    for (let button = 7; button <= 37; button++) {
        buttons[button].style.background = "white";
        buttons[button].disabled = false;
        buttons[button].innerHTML = button - 6;
    }
}

function selectTeacher(selObj) {
    resetButtons();
    getSchedules(selObj.value);
}
function getTeacherId() {
    let id = document.querySelector('.selectTeachers').value;
    return id;
}

function getView() {
    let viewType = document.querySelector('.selectView').value;
    return viewType;
}

function refresh() {
    const taskName = form[0].value;
    const date = form[1].value;
    const time = form[2].value;
    if (taskName != '' && date != '' && time != '') {
        const teacherId = getTeacherId();
        if (teacherId != '-') {
            postData(taskName, date, time, teacherId);
            alert("Data Added");
            resetForm();
            return false;
        }
        else {
            alert("please select valid teacher");
        }
        return false;
    }
    return false;
}

function addData() {
    // console.log("i got Clicked");
    document.querySelector(".inputField").style.opacity = 1;
}

function deleteVal(date) {
    let mid = "";
    if (date< 10) {
        mid = "0";
    }
    date= "2021-07-" + mid + (date).toString();
    let id = getTeacherId();
    freeSchedules(id, date);
    
}
function resetForm(){
    form[0].value="";
    form[1].value = "";
    form[2].value ="";
    document.querySelector(".inputField").style.opacity = 0;
}
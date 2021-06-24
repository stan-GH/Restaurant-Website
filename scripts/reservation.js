function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}


let date = new Date();
let currMonth = date.getMonth() + 1;
let currYear = date.getFullYear();

if (!/\w\w/.exec(currMonth)) {
    currMonth = "0" + currMonth;
}

document.getElementById("reservation").min = currYear + "-" + currMonth + "-01";
document.getElementById("reservation").max = currYear + "-" + currMonth + "-" + daysInMonth(currMonth, 2021);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function reserveTimeAction(timeReserved, dateReserved) {
    localStorage.setItem('reservedTime', timeReserved);
    localStorage.setItem('reservedDate', dateReserved);
    location.href = "signup.html";
} 

document.getElementById("submit-reservation").onclick = () => {
    removeAllChildNodes(document.getElementById("available-reservation-times"));

    let options = {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }

    let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    let date = document.getElementById("reservation").value;
    let month = date.slice(5, 7)
    month = months[parseInt(month) - 1];
    let day = date.slice(date.length-2, date.length);
    let year = date.slice(0, 4);
    let fullDate = month + " " + day + ", " + year;
    
    
    let availableTimes = ["10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM",
                          "12:30PM", "1:00PM", "1:45PM", "2:30PM", "3:00PM",
                          "3:30PM", "4:00PM", "6:00PM", "6:30PM", "7:00PM", 
                          "7:30PM", "8:00PM", "8:15PM", "8:30PM", "9:00PM",
                          "9:30PM"];

    fetch("http://localhost:3000/reservation/" + year + "/" + month + "/" + day, options).then((res) => res.json()).then(reservationTimeData => {
        if (reservationTimeData.success) {
            let reservationContainer = document.getElementById("available-reservation-times");

            let counter = 1;
            let reservationItemRow = document.createElement("div");
            reservationItemRow.className = "reservation-item";

            availableTimes.forEach((time) => {
                let btn = document.createElement("button");
                btn.className = "reservation-btn";
                btn.innerHTML = time;
                
                if (reservationTimeData.data == null || reservationTimeData.data.length === 0 || !reservationTimeData.data.includes(time)) {
                    btn.onclick = () => {reserveTimeAction(time, fullDate)};
                } else {
                    btn.disabled = true;
                    btn.id = "disabled";
                }

                if (counter++ < 3) {
                    reservationItemRow.appendChild(btn);
                } else {
                    reservationItemRow.appendChild(btn);
                    reservationContainer.appendChild(reservationItemRow);
                    reservationItemRow = document.createElement("div");
                    counter = 1;
                }
            })
        }
    })
}


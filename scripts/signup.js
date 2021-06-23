let reservedTime = localStorage.getItem("reservedTime");
let reservedDate = localStorage.getItem("reservedDate");
document.getElementById("time-reserved-title").innerHTML = "Sign up now to reserve your registration on " + reservedDate + " at " + reservedTime;

document.getElementById("submitForm").onclick = () => {
    let firstNameVal = document.getElementById("firstName").value;
    let lastNameVal = document.getElementById("lastName").value;
    let emailVal = document.getElementById("email").value;

    let verifyNamePattern = /^[a-zA-Z]+$/;
    let verifyEmailPattern = /^\w+@\w+\.\w+$/;

    if (verifyNamePattern.exec(firstNameVal) && verifyNamePattern.exec(lastNameVal) && verifyEmailPattern.exec(emailVal)) {
        document.getElementById("firstName").classList.remove("error");
        document.getElementById("lastName").classList.remove("error");
        let data = {firstName: firstNameVal, lastName: lastNameVal, email: emailVal, dateReserved: reservedDate, timeReserved: reservedTime};
        let options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:3000/reservation/", options).then((res) => res.json).then(resData => {
            if (resData.success) {
                console.log("success");
            }
        });
    } else {
        if (!verifyNamePattern.exec(firstNameVal)) {
            document.getElementById("firstName").classList.add("error");
        }else {
            document.getElementById("firstName").classList.remove("error");
        } 

        if (!verifyNamePattern.exec(lastNameVal)) {
            document.getElementById("lastName").classList.add("error");
        } else {
            document.getElementById("lastName").classList.remove("error");
        }
        
        if (!verifyEmailPattern.exec(emailVal)) {
            document.getElementById("email").classList.add("error");
        } else {
            document.getElementById("email").classList.remove("error");
        }
    }
}
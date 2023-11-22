var empList = [];

$("#submit").click(() => {
    let email = $("#email").val();
    let pass = $("#pass").val();
    let age = $("#age").val();
    let bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    let bloodGroup = $("#bloodGroup").val();

    if (parseInt(age)<17){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:  " age must be greater than 18",
                footer: '<a href="#"></a>'
            });
            return;
        }else if (!bloodGroups.includes(bloodGroup)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Blood Group",
                text: "Please enter a valid blood group (A+, A-, B+, B-, O+, O-, AB+, AB-)",
                footer: '<a href="#"></a>'
            });
            return;
        }
    if (email !== "" && pass !== "" && age !== "" && bloodGroup !== "") {
        // Additional validation can be added as needed

        var emp = { email: email, pass: pass, age: age, bloodGroup: bloodGroup };

        if (empList.some((element) => element.email === emp.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: emp.email + " is already exist!",
                footer: '<a href="#">do not add duplicate email</a>'
            });
        } else {
            empList.push(emp);
            Swal.fire({
                title: "Good Job!",
                text: "Employee details added successfully",
                icon: "success"
            });
            $("#email").val("");
            $("#pass").val("");
            $("#age").val("");
            $("#bloodGroup").val("");
        }

        renderTable();
    } else {
        Swal.fire({
            title: "Cannot be empty",
            text: "Fill all the input fields",
            icon: "warning",
        });
    }
});

// ... (remaining code)
$('body').on('click', '.delete', function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#dd3",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let id = $(this).attr('id');
            empList = empList.filter(a => a.email !== id);
            console.log(empList);
            renderTable();

            Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success"
            });
        }
    });
});

function renderTable() {
    if (empList.length !== 0) {
        let table = `<table class="table table-secondary table-hover">
            <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Age</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>`;

        empList.forEach(e => {
            table += `<tr>
                <td>${e.email}</td>
                <td>${e.pass}</td>
                <td>${e.age}</td>
                <td>${e.bloodGroup}</td>
                <td><div class="fa fa-trash-o delete" id="${e.email}"></div></td>
                </tr>`;
        });

        table += `</tbody></table>`;
        $(".empData").html(table);
    } else {
        $(".empData").html("");
    }
}
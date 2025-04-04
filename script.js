document.addEventListener("DOMContentLoaded", function () {  
    // عند الضغط على زر الإرسال
    if (document.getElementById("submit")) {
        document.getElementById("submit").addEventListener("click", function () {
            let name = document.getElementById("name").value;
            let phone = document.getElementById("phone").value;
            let date = document.getElementById("date").value;
            let specialty = document.getElementById("specialty").value; // حقل التخصص الجديد

            // قائمة التخصصات المتاحة
            const validSpecialties = ["طبيب باطنة", "طبيب أطفال", "طبيب نساء وتوليد", "طبيب جراحة"];

            // التحقق من صحة التخصص المدخل
            if (!validSpecialties.includes(specialty)) {
                alert("هذا التخصص غير موجود! يرجى إدخال تخصص صحيح.");
                return; // إيقاف تنفيذ باقي الكود إذا كان التخصص غير صحيح
            }

            if (name && phone && date && specialty) {
                let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
                appointments.push({ name, phone, date, specialty }); // إضافة التخصص مع باقي البيانات
                localStorage.setItem("appointments", JSON.stringify(appointments));

                alert(`تم إرسال البيانات بنجاح! \nاسم المريض: ${name}\nرقم الهاتف: ${phone}\nالتاريخ المطلوب: ${date}\nتخصص الطبيب: ${specialty}`);

                console.log("تم إرسال البيانات بنجاح!");
                console.log("البيانات المدخلة:", { name, phone, date, specialty });

                window.location.href = "table.html"; // التوجيه إلى صفحة عرض المواعيد
            } else {
                alert("يرجى إدخال جميع البيانات!");
            }
        });
    }

    // عرض البيانات في الجدول
    if (document.getElementById("appointmentTable")) {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        let table = document.getElementById("appointmentTable");

        if (appointments.length > 0) {
            appointments.forEach(appointment => {
                let row = `<tr>
                            <td>${appointment.name}</td>
                            <td>${appointment.phone}</td>
                            <td>${appointment.date}</td>
                            <td>${appointment.specialty}</td> <!-- عرض التخصص في الجدول -->
                           </tr>`;
                table.innerHTML += row;
            });
        } else {
            table.innerHTML = `<tr><td colspan="4">لا توجد مواعيد مسجلة</td></tr>`;
        }
    }
});

// مسح جميع البيانات
function resetTable() {
    localStorage.removeItem('appointments');
    const tableBody = document.getElementById('appointmentTable');
    tableBody.innerHTML = `<tr><td colspan="4">لا توجد مواعيد مسجلة</td></tr>`;
}


 
// change color 
const toggleSwitch = document.getElementById("themeToggle");
    
toggleSwitch.addEventListener("change", function() {
    document.body.classList.toggle("dark-mode", this.checked);
});   
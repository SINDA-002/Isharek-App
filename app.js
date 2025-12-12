function go(page) {
    window.location.href = page;
}

// حفظ بلاغ
function saveReport() {
    let num = document.getElementById("number").value;
    let details = document.getElementById("details").value;

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.push({
        number: num,
        details: details,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("reports", JSON.stringify(reports));

    alert("تم رفع البلاغ بنجاح ✔");
}

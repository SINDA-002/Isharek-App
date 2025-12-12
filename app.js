/* ===============================
   التنقل بين الصفحات (الأيقونات)
================================ */
window.go = function (page) {
  window.location.href = page;
};

/* ===============================
   فحص الرابط (HTTPS)
================================ */
function checkLink(url) {
  try {
    const u = new URL(url);

    if (u.protocol !== "https:") {
      return {
        valid: false,
        message: "⚠️ الرابط غير آمن لأنه لا يستخدم HTTPS"
      };
    }

    return {
      valid: true,
      message: "🔒 الرابط يستخدم HTTPS (آمن مبدئيًا)"
    };
  } catch (e) {
    return {
      valid: false,
      message: "❌ رابط غير صالح"
    };
  }
}

/* ===============================
   فحص الرابط + كلمات مشبوهة
================================ */
function checkURL() {
  let url = document.getElementById("urlInput").value;
  let result = document.getElementById("urlResult");

  if (!url) {
    result.innerHTML = "⚠️ الرجاء إدخال الرابط";
    result.style.color = "red";
    return;
  }

  let linkCheck = checkLink(url);
  if (!linkCheck.valid) {
    result.innerHTML = linkCheck.message;
    result.style.color = "red";
    return;
  }

  let suspiciousWords = ["bank", "login", "free", "gift", "verify", "code"];
  let isSuspicious = suspiciousWords.some(w =>
    url.toLowerCase().includes(w)
  );

  if (isSuspicious) {
    result.innerHTML = "⛔ الرابط غير آمن - قد يكون احتيالي!";
    result.style.color = "red";
  } else {
    result.innerHTML = "✅ الرابط يبدو آمنًا حسب الفحص المبدئي";
    result.style.color = "green";
  }
}

/* ===============================
   التحليل الذكي للنصوص
================================ */
function analyzeText() {
  let text = document.getElementById("aiText").value;
  let result = document.getElementById("aiResult");

  if (!text) {
    result.innerHTML = "⚠️ الرجاء إدخال النص للتحليل";
    result.style.color = "red";
    return;
  }

  let dangerKeywords = [
    "تحويل",
    "رمز",
    "أرسل",
    "اضغط",
    "معلق",
    "حساب",
    "تحديث",
    "فوري"
  ];

  let detected = dangerKeywords.filter(k => text.includes(k));

  if (detected.length > 0) {
    result.innerHTML =
      "⛔ الرسالة تحتوي كلمات تحذيرية: " + detected.join("، ");
    result.style.color = "red";
  } else {
    result.innerHTML = "✅ لم يتم اكتشاف كلمات احتيالية";
    result.style.color = "green";
  }
}

/* ===============================
   حفظ البلاغات
================================ */
function saveReport() {
  let num = document.getElementById("number").value;
  let details = document.getElementById("details").value;

  if (!num) {
    alert("ادخل البيانات");
    return;
  }

  let reports = JSON.parse(localStorage.getItem("reports")) || [];

  reports.push({
    number: num,
    details: details,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("reports", JSON.stringify(reports));
  alert("تم رفع البلاغ بنجاح");
}

/* ===============================
   عرض سجل البلاغات
================================ */
function loadHistory() {
  let box = document.getElementById("historyList");
  let reports = JSON.parse(localStorage.getItem("reports")) || [];

  if (reports.length === 0) {
    box.innerHTML = "لا يوجد بلاغات";
    return;
  }

  box.innerHTML = "";
  reports.forEach(r => {
    box.innerHTML += `
      <div>
        <strong>${r.number}</strong><br>
        ${r.details}<br>
        <small>${r.date}</small>
        <hr>
      </div>
    `;
  });
}

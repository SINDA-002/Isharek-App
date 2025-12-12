function go(page) {
    window.location.href = page;
}
function checkLink(url) {
  try {
    const u = new URL(url);

    // نرفض أي رابط مو HTTPS
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
  }

  return {
    valid: true,
    message: "🔗 تنسيق الرابط صحيح"
  };
}/* ============================
     فحص الرابط
=============================*/
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
  let isSuspicious = suspiciousWords.some(w => url.toLowerCase().includes(w));

  if (isSuspicious) {
    result.innerHTML = "⛔ الرابط غير آمن - قد يكون احتيالي!";
    result.style.color = "red";
  } else {
    result.innerHTML = "✅ الرابط يبدو آمنًا حسب الفحص المبدئي";
    result.style.color = "green";
  }
}

/* ============================
     التحليل الذكي للنصوص
=============================*/
function analyzeText() {
    let text = document.getElementById("aiText").value;
    let result = document.getElementById("aiResult");

    if (!text) {
        result.innerHTML = "⚠ الرجاء إدخال النص للتحليل";
        result.style.color = "red";
        return;
    }

    let dangerKeywords = ["تحويل", "رمز", "ارسل", "اضغط", "معلق", "موقوف", "تحديث", "فوز"];

    let detected = dangerKeywords.filter(k => text.includes(k));

    if (detected.length > 0) {
        result.innerHTML = "🚫 الرسالة تحتوي كلمات تحذيرية: " + detected.join("، ");
        result.style.color = "red";
    } else {
        result.innerHTML = "✔ لم يتم اكتشاف أي كلمات احتيالية.";
        result.style.color = "green";
    }
}

/* ============================
      حفظ البلاغات
=============================*/
function saveReport() {
    let num = document.getElementById("number").value;
    let details = document.getElementById("details").value;

    if (!num) { alert("أدخل البيانات"); return; }

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.push({
        number: num,
        details: details,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("reports", JSON.stringify(reports));

    alert("تم رفع البلاغ بنجاح ✔");
}

/* ============================
      عرض سجل البلاغات
=============================*/
function loadHistory() {
    let box = document.getElementById("historyList");

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    if (reports.length === 0) {
        box.innerHTML = "لا يوجد بلاغات.";
        return;
    }

    box.innerHTML = "";

    reports.forEach(r => {
        box.innerHTML += `
            <div style='margin-bottom:15px; padding:10px; border-bottom:1px solid #ddd'>
                <b>البيان:</b> ${r.number}<br>
                <b>تفاصيل:</b> ${r.details}<br>
                <b>التاريخ:</b> ${r.date}
            </div>
        `;
    });
}

/* ============================
      إعدادات الإشعارات
=============================*/
function saveSettings() {
    let toggle = document.getElementById("alertToggle").checked;
    localStorage.setItem("alertsEnabled", toggle);
    alert("تم حفظ الإعدادات ✔");
}

function loadSettings() {
    let saved = localStorage.getItem("alertsEnabled") === "true";
    document.getElementById("alertToggle").checked = saved;
}

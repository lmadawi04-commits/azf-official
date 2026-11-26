// ==========================================
// AIdev PRO - SMART AI SYSTEM
// ==========================================

const input = document.getElementById("messageInput");
const messages = document.getElementById("chatMessages");

let chatHistory = JSON.parse(
    localStorage.getItem("AIdev_history") || "[]"
);

let isThinking = false;

// ==========================================
// اختيار المنصة
// ==========================================

function selectPlatform(platform) {
    localStorage.setItem("AIdev_platform", platform);

    document.querySelector(".platforms").style.display = "none";
    document.querySelector(".welcome").style.display = "none";

    document.getElementById("setupScreen").style.display = "block";
}

// ==========================================
// إعداد المساعد
// ==========================================

function saveSetup() {
    const aiName = document.getElementById("aiName").value.trim();
    const userName = document.getElementById("userName").value.trim();

    if (!aiName || !userName) {
        alert("اكتب اسمك واسم المساعد!");
        return;
    }

    localStorage.setItem("AIdev_aiName", aiName);
    localStorage.setItem("AIdev_userName", userName);
    localStorage.setItem("AIdev_setupCompleted", "true");

    document.getElementById("setupScreen").style.display = "none";
    document.getElementById("loadingScreen").style.display = "block";

    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("chatScreen").style.display = "flex";

        document.getElementById("chatAIName").textContent = aiName;

        loadChat();

        if (chatHistory.length === 0) {
            addMessage(
                "السلام عليكم " + userName +
                "! أنا " + aiName +
                "، مساعدك الذكي. وش نبدأ نطور اليوم؟ 🚀",
                "ai"
            );
        }
    }, 1500);
}

// ==========================================
// عرض الرسائل
// ==========================================

function addMessage(text, type) {
    const message = document.createElement("div");

    message.className = "message " +
        (type === "user" ? "user-message" : "ai-message");

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    return message;
}

// ==========================================
// تحميل المحادثة
// ==========================================

function loadChat() {
    messages.innerHTML = "";

    chatHistory.forEach(item => {
        addMessage(
            item.content,
            item.role === "user" ? "user" : "ai"
        );
    });
}

// ==========================================
// حفظ المحادثة
// ==========================================

function saveChat() {
    localStorage.setItem(
        "AIdev_history",
        JSON.stringify(chatHistory)
    );
}

// ==========================================
// مؤشر التفكير
// ==========================================

function showThinking() {
    const thinking = document.createElement("div");

    thinking.className = "message ai-message thinking-message";
    thinking.textContent = "يفكر الآن... 🤖";

    messages.appendChild(thinking);

    messages.scrollTop = messages.scrollHeight;

    return thinking;
}

// ==========================================
// إرسال الرسائل للذكاء الاصطناعي
// ==========================================

async function sendMessage() {

    if (isThinking) return;

    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    chatHistory.push({
        role: "user",
        content: text
    });

    saveChat();

    isThinking = true;

    const sendButton = document.querySelector(".chat-input-area button");
    sendButton.disabled = true;

    const thinking = showThinking();

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: text,

                history: chatHistory.slice(0, -1).slice(-20)

            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "حدث خطأ في الاتصال.");
        }

        if (!data.reply) {
            throw new Error("لم يصل رد من الذكاء الاصطناعي.");
        }

        thinking.remove();

        addMessage(data.reply, "ai");

        chatHistory.push({
            role: "assistant",
            content: data.reply
        });

        saveChat();

    } catch (error) {

        thinking.remove();

        addMessage(
            "تعذر الاتصال بالذكاء الاصطناعي.\n" +
            "السبب: " + error.message +
            "\nتأكد أن الخادم يعمل.",
            "ai"
        );

        console.error(error);

    } finally {

        isThinking = false;
        sendButton.disabled = false;
        input.focus();

    }
}

// ==========================================
// زر Enter
// ==========================================

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});

// ==========================================
// أوامر المطور
// ==========================================

function useCommand(command) {

    input.value = command + " ";
    input.focus();

}

// ==========================================
// مسح المحادثة
// ==========================================

function clearChat() {

    if (!confirm("هل تريد حذف المحادثة بالكامل؟")) {
        return;
    }

    chatHistory = [];

    localStorage.removeItem("AIdev_history");

    messages.innerHTML = "";

    addMessage(
        "تم فتح محادثة جديدة! وش نشتغل عليه؟ 🚀",
        "ai"
    );

}
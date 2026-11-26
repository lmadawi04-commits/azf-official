const input = document.getElementById("messageInput");
const messages = document.getElementById("chatMessages");

let chatHistory = JSON.parse(localStorage.getItem("AIdev_history") || "[]");
let isThinking = false;

function selectPlatform(platform) {
    localStorage.setItem("AIdev_platform", platform);
    document.querySelector(".platforms").style.display = "none";
    document.querySelector(".welcome").style.display = "none";
    document.getElementById("setupScreen").style.display = "block";
}

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
            addMessage("السلام عليكم " + userName + "! أنا " + aiName + "، مساعدك لتطوير ألعاب Roblox. وش نبدأ؟ 🚀", "ai");
        }
    }, 1000);
}

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "message " + (type === "user" ? "user-message" : "ai-message");
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
}

function loadChat() {
    messages.innerHTML = "";
    chatHistory.forEach(item => {
        addMessage(item.content, item.role === "user" ? "user" : "ai");
    });
}

function saveChat() {
    localStorage.setItem("AIdev_history", JSON.stringify(chatHistory));
}

function createScript(text) {
    const t = text.toLowerCase();

    if (t.includes("leaderstats") || t.includes("فلوس") || t.includes("نقود")) {
        return `-- نظام الفلوس والانتصارات
game.Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local Money = Instance.new("IntValue")
    Money.Name = "Money"
    Money.Value = 0
    Money.Parent = leaderstats

    local Wins = Instance.new("IntValue")
    Wins.Name = "Wins"
    Wins.Value = 0
    Wins.Parent = leaderstats
end)`;
    }

    if (t.includes("سرعة") || t.includes("speed")) {
        return `-- Speed Pad
local pad = script.Parent

pad.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.WalkSpeed = 50
        task.wait(5)
        humanoid.WalkSpeed = 16
    end
end)`;
    }

    if (t.includes("قتل") || t.includes("kill brick")) {
        return `-- Kill Brick
local part = script.Parent

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.Health = 0
    end
end)`;
    }

    if (t.includes("قفز") || t.includes("jump")) {
        return `-- Jump Pad
local pad = script.Parent

pad.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.JumpPower = 100
        humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
    end
end)`;
    }

    if (t.includes("عملة") || t.includes("coin")) {
        return `-- Coin
local coin = script.Parent
local collected = false

coin.Touched:Connect(function(hit)
    if collected then return end

    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end

    local stats = player:FindFirstChild("leaderstats")
    local money = stats and stats:FindFirstChild("Money")

    if money then
        collected = true
        money.Value += 10
        coin:Destroy()
    end
end)`;
    }

    if (t.includes("اختفاء") || t.includes("يختفي")) {
        return `-- Disappearing Part
local part = script.Parent
local busy = false

part.Touched:Connect(function()
    if busy then return end
    busy = true

    part.Transparency = 1
    part.CanCollide = false

    task.wait(3)

    part.Transparency = 0
    part.CanCollide = true
    busy = false
end)`;
    }

    if (t.includes("باب") || t.includes("door")) {
        return `-- Door
local door = script.Parent
local opened = false

door.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player or opened then return end

    opened = true
    door.Transparency = 0.7
    door.CanCollide = false

    task.wait(3)

    door.Transparency = 0
    door.CanCollide = true
    opened = false
end)`;
    }

    if (t.includes("انفجار") || t.includes("explosion")) {
        return `-- Explosion
local part = script.Parent

part.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")

    if humanoid then
        local explosion = Instance.new("Explosion")
        explosion.Position = part.Position
        explosion.BlastRadius = 10
        explosion.Parent = workspace
    end
end)`;
    }

    if (t.includes("دوران") || t.includes("يدور")) {
        return `-- Rotating Part
local part = script.Parent

while true do
    part.CFrame = part.CFrame * CFrame.Angles(0, math.rad(2), 0)
    task.wait(0.03)
end`;
    }

    if (t.includes("صحة") || t.includes("علاج") || t.includes("health")) {
        return `-- Health Pad
local pad = script.Parent

pad.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.Health = humanoid.MaxHealth
    end
end)`;
    }

    return null;
}

function checkScript(code) {
    const problems = [];

    if (!code.trim()) {
        return "ما وصلني أي سكربت. الصق السكربت بعد الأمر.";
    }

    const opens = (code.match(/\bfunction\b|\bthen\b|\bdo\b/g) || []).length;
    const ends = (code.match(/\bend\b/g) || []).length;

    if (ends < opens) {
        problems.push("قد يكون عندك end ناقص.");
    }

    if (code.includes("wait()")) {
        problems.push("يفضل استخدام task.wait() بدل wait().");
    }

    if (code.includes("LocalPlayer") && code.includes("ServerScriptService")) {
        problems.push("تأكد من مكان السكربت؛ LocalPlayer يُستخدم عادةً في LocalScript.");
    }

    if (problems.length === 0) {
        return "لم أكتشف مشكلة واضحة بالفحوصات البسيطة. هذا لا يضمن أن السكربت خالٍ من الأخطاء.";
    }

    return "نتائج الفحص:\n\n" + problems.map(p => "⚠️ " + p).join("\n");
}

function generateReply(text) {
    const t = text.toLowerCase();

    if (t.includes("/مساعدة")) {
        return `أوامر AIdev:
/إنشاء سكربت
/فحص سكربت
/شرح سكربت
/إصلاح سكربت
/أفكار ألعاب

أقدر أساعدك بقوالب Roblox وأمثلة برمجية جاهزة.`;
    }

    if (t.includes("السلام عليكم")) {
        return "وعليكم السلام ورحمة الله وبركاته! حيّاك الله ❤️ وش نبرمج اليوم؟";
    }

    if (t.includes("شلونك") || t.includes("كيف حالك")) {
        return "بخير دامك بخير! 😎 وش أخبار تطوير لعبتك؟";
    }

    if (t.includes("أفكار") || t.includes("افكار")) {
        return `🎮 أفكار ألعاب Roblox:
1. مدينة الزومبي.
2. سرقة البنك.
3. الهروب من السجن.
4. جزيرة البقاء.
5. مصنع الأسلحة.
6. محاكي جمع الأموال.
7. مدينة الوظائف.
8. سباق السيارات.
9. برج التحديات.
10. صيد الوحوش.`;
    }

    if (t.includes("/فحص سكربت") || t.includes("/كشف الأخطاء")) {
        return checkScript(text.replace(/^\/(?:فحص سكربت|كشف الأخطاء)/, ""));
    }

    if (t.includes("/إنشاء سكربت") || t.includes("أنشئ سكربت") || t.includes("سوي سكربت")) {
        const result = createScript(text);
        return result
            ? "هذا قالب سكربت مناسب لطلبك:\n\n" + result + "\n\nضعه في Script داخل المكان المناسب في Roblox Studio."
            : "حدد لي وظيفة السكربت بشكل أوضح، مثل: فلوس، سرعة، عملات، باب، قفز أو قتل.";
    }

    if (t.includes("/إصلاح سكربت")) {
        if (text.includes("wait()")) {
            return "وجدت wait()، تقدر تستبدلها بـ task.wait().\n\nلكن أحتاج تفاصيل الخطأ حتى أساعدك بإصلاحه.";
        }
        return "أرسل السكربت ورسالة الخطأ عشان أساعدك في تحديد المشكلة. الفحص هنا بسيط وليس إصلاحًا آليًا كاملًا.";
    }

    if (t.includes("/شرح سكربت")) {
        return "أرسل الكود بعد الأمر /شرح سكربت، وبساعدك في توضيح أجزاء الكود المعروفة.";
    }

    if (t.includes("/تحسين سكربت")) {
        return "أرسل السكربت، وبراجع لك بعض التحسينات الشائعة مثل استخدام task.wait() وتقليل الحلقات غير الضرورية.";
    }

    if (t.includes("/تحويل سكربت")) {
        return "أرسل السكربت وحدد وش تبي تحوّله إليه.";
    }

    if (t.includes("/فحص أداء")) {
        return "نصيحة للأداء: قلل الحلقات المستمرة، واستخدم task.wait()، ولا تنشئ أجزاء كثيرة بدون حاجة.";
    }

    if (t.includes("شكرا") || t.includes("يعطيك العافية")) {
        return "العفو! بالخدمة دائمًا ❤️";
    }

    if (t.includes("زومبي")) {
        return "تقدر تسوي نظام زومبي باستخدام Humanoid وPathfindingService. تبي قالب زومبي يلاحق اللاعبين؟";
    }

    if (t.includes("roblox") || t.includes("روبلوكس") || t.includes("سكربت")) {
        return "أنا مساعد AIdev المحلي. أقدر أقدم قوالب سكربتات وأوامر محددة، لكن ما عندي نموذج ذكاء اصطناعي متصل يفهم كل الطلبات. اكتب /مساعدة لمعرفة الأوامر.";
    }

    return "هلا! 🤖 أنا AIdev. أقدر أساعدك بقوالب Roblox الجاهزة. اكتب /مساعدة عشان تشوف الأوامر المتاحة.";
}

async function sendMessage() {
    if (isThinking) return;

    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    chatHistory.push({ role: "user", content: text });
    saveChat();

    isThinking = true;
    const sendButton = document.querySelector(".chat-input-area button");
    sendButton.disabled = true;

    const thinking = addMessage("جاري تجهيز الرد... 🤖", "ai");

    setTimeout(() => {
        const reply = generateReply(text);
        thinking.remove();
        addMessage(reply, "ai");

        chatHistory.push({ role: "assistant", content: reply });
        saveChat();

        isThinking = false;
        sendButton.disabled = false;
        input.focus();
    }, 400);
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") sendMessage();
});

function useCommand(command) {
    input.value = command + " ";
    input.focus();
}

function clearChat() {
    if (!confirm("هل تريد حذف المحادثة بالكامل؟")) return;

    chatHistory = [];
    localStorage.removeItem("AIdev_history");
    messages.innerHTML = "";
    addMessage("بدأنا محادثة جديدة! وش نطور اليوم؟ 🚀", "ai");
}

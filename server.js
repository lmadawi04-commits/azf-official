import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" }));
app.use(express.static(__dirname));

// ======================================
// شخصية AIdev
// ======================================

const SYSTEM_NAME = "AIdev";

const ideas = [
    "🧟 مدينة الزومبي: اقتل الزومبي واجمع الأموال وطوّر أسلحتك.",
    "🏙️ حياة واقعية: وظائف ومنازل وسيارات وترقيات.",
    "🏝️ جزيرة النجاة: اجمع الموارد وابنِ قاعدتك.",
    "🏦 سرقة البنك: خطط للسرقة واهرب من الشرطة.",
    "🚀 مغامرة الفضاء: استكشف الكواكب واجمع المعادن.",
    "🏎️ سباقات السيارات: تسابق وطوّر محركاتك.",
    "👻 بيت الرعب: اهرب من الوحوش والألغاز.",
    "💰 مصنع الأموال: ابنِ مصنعك واجمع الأرباح.",
    "⚔️ ساحة القتال: قاتل اللاعبين وطوّر أسلحتك.",
    "🏪 إدارة متجر: اشترِ المنتجات وبعها.",
    "🌋 الهروب من البركان: اهرب قبل ثوران البركان.",
    "🦈 هروب من القرش: حاول النجاة في البحر.",
    "🚢 سفينة الغرق: أنقذ نفسك والركاب.",
    "🏜️ صحراء النجاة: ابحث عن الماء والطعام.",
    "🏰 بناء المملكة: ابنِ مملكتك ودرّب جيشك.",
    "🐉 صيد التنانين: اصطد التنانين النادرة.",
    "⛏️ منجم الذهب: احفر واجمع المعادن.",
    "🎢 مدينة الملاهي: أنشئ ألعابك واربح المال.",
    "🚓 الشرطة والحرامي: مطاردات ومهام وسرقات.",
    "🧪 مختبر التجارب: نفّذ تجارب وافتح مناطق.",
    "🏥 المستشفى: عالج المرضى وطوّر المستشفى.",
    "✈️ محاكاة الطيران: قد الطائرات ونفّذ الرحلات.",
    "🌲 الغابة المسكونة: ابحث عن طريق الهروب.",
    "🛒 سوبر ماركت: أدر المتجر وعيّن الموظفين.",
    "🏡 حياة المزرعة: ازرع واحصد وربّ الحيوانات.",
    "🎯 تحديات البقاء: أكمل تحديات مختلفة.",
    "🧊 عالم الجليد: اهرب من العاصفة الثلجية.",
    "🦖 عصر الديناصورات: اصطد الديناصورات ونجُ منها.",
    "🏟️ بطولة الأبطال: تنافس في ألعاب مصغرة.",
    "🔮 عالم السحر: اجمع القوى وتعلم التعويذات."
];

// ======================================
// فحص السكربتات
// ======================================

function checkScript(code) {

    const errors = [];

    if (!code.trim()) {
        return "أرسل السكربت أولاً حتى أقدر أفحصه.";
    }

    if (!code.includes("end") && (
        code.includes("function") ||
        code.includes("if ") ||
        code.includes("for ")
    )) {
        errors.push("قد يكون هناك نقص في كلمة end.");
    }

    if ((code.match(/\(/g) || []).length !==
        (code.match(/\)/g) || []).length) {
        errors.push("عدد الأقواس () غير متطابق.");
    }

    if ((code.match(/\{/g) || []).length !==
        (code.match(/\}/g) || []).length) {
        errors.push("عدد الأقواس {} غير متطابق.");
    }

    if ((code.match(/\[/g) || []).length !==
        (code.match(/\]/g) || []).length) {
        errors.push("عدد الأقواس [] غير متطابق.");
    }

    if (code.includes("game.Players.LocalPlayer") &&
        code.includes("DataStoreService")) {
        errors.push(
            "انتبه: DataStoreService يجب استخدامه من سكربت سيرفر."
        );
    }

    if (code.includes("wait()")) {
        errors.push(
            "يفضل استخدام task.wait() بدلاً من wait()."
        );
    }

    if (errors.length === 0) {
        return "لم أكتشف أخطاء شائعة واضحة، لكن هذا ليس فحصاً كاملاً للكود.";
    }

    return "نتيجة الفحص:\n\n" +
        errors.map((e, i) => `${i + 1}. ${e}`).join("\n");
}

// ======================================
// قوالب إنشاء السكربتات
// ======================================

function createScript(message) {

    const text = message.toLowerCase();

    const scripts = [

        {
            keys: ["leaderstats", "لوحة", "فلوس", "نقاط"],
            name: "Leaderstats",
            type: "Script",
            place: "ServerScriptService",
            code: `
game.Players.PlayerAdded:Connect(function(player)

    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local money = Instance.new("IntValue")
    money.Name = "Money"
    money.Value = 0
    money.Parent = leaderstats

    local wins = Instance.new("IntValue")
    wins.Name = "Wins"
    wins.Value = 0
    wins.Parent = leaderstats

end)
`
        },

        {
            keys: ["سرعة", "speed"],
            name: "Speed Pad",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

part.Touched:Connect(function(hit)

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.WalkSpeed = 40
    end

end)
`
        },

        {
            keys: ["قتل", "kill brick", "موت"],
            name: "Kill Brick",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

part.Touched:Connect(function(hit)

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.Health = 0
    end

end)
`
        },

        {
            keys: ["قفز", "jump"],
            name: "Jump Pad",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

part.Touched:Connect(function(hit)

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.JumpPower = 100
        humanoid.Jump = true
    end

end)
`
        },

        {
            keys: ["عملات", "coin", "عملة"],
            name: "Coin",
            type: "Script",
            place: "داخل Part العملة",
            code: `
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

end)
`
        },

        {
            keys: ["زر", "button"],
            name: "GUI Button",
            type: "LocalScript",
            place: "داخل TextButton",
            code: `
local button = script.Parent

button.MouseButton1Click:Connect(function()

    print("تم الضغط على الزر!")

end)
`
        },

        {
            keys: ["اختفاء", "شفاف", "fade"],
            name: "Disappear Part",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent
local busy = false

part.Touched:Connect(function(hit)

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if not humanoid or busy then return end

    busy = true

    part.Transparency = 1
    part.CanCollide = false

    task.wait(3)

    part.Transparency = 0
    part.CanCollide = true

    busy = false

end)
`
        },

        {
            keys: ["تجديد", "شفاء", "health"],
            name: "Health Pad",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

part.Touched:Connect(function(hit)

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then
        humanoid.Health = humanoid.MaxHealth
    end

end)
`
        },

        {
            keys: ["بوابة", "انتقال", "teleport"],
            name: "Teleport Part",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent
local destination = workspace:WaitForChild("Destination")

part.Touched:Connect(function(hit)

    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")

    if humanoid then
        character:PivotTo(destination.CFrame + Vector3.new(0, 3, 0))
    end

end)
`
        },

        {
            keys: ["انفجار", "bomb"],
            name: "Explosion",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

part.Touched:Connect(function(hit)

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid then

        local explosion = Instance.new("Explosion")
        explosion.Position = part.Position
        explosion.BlastRadius = 10
        explosion.BlastPressure = 0
        explosion.Parent = workspace

    end

end)
`
        },

        {
            keys: ["دوران", "rotate"],
            name: "Rotating Part",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

while true do

    part.CFrame *= CFrame.Angles(0, math.rad(5), 0)

    task.wait(0.03)

end
`
        },

        {
            keys: ["إضاءة", "اضاءة", "light"],
            name: "Light Part",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

local light = Instance.new("PointLight")
light.Brightness = 2
light.Range = 15
light.Parent = part
`
        },

        {
            keys: ["فتح باب", "باب"],
            name: "Door",
            type: "Script",
            place: "داخل Part الباب",
            code: `
local door = script.Parent
local opened = false

door.Touched:Connect(function(hit)

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")

    if humanoid and not opened then

        opened = true

        door.Transparency = 1
        door.CanCollide = false

        task.wait(3)

        door.Transparency = 0
        door.CanCollide = true

        opened = false

    end

end)
`
        },

        {
            keys: ["نقاط خبرة", "xp", "خبرة"],
            name: "XP System",
            type: "Script",
            place: "ServerScriptService",
            code: `
game.Players.PlayerAdded:Connect(function(player)

    local stats = Instance.new("Folder")
    stats.Name = "leaderstats"
    stats.Parent = player

    local xp = Instance.new("IntValue")
    xp.Name = "XP"
    xp.Value = 0
    xp.Parent = stats

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = stats

    xp.Changed:Connect(function()

        local required = level.Value * 100

        if xp.Value >= required then
            xp.Value -= required
            level.Value += 1
        end

    end)

end)
`
        },

        {
            keys: ["مكافأة", "جائزة", "reward"],
            name: "Reward Part",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent
local used = {}

part.Touched:Connect(function(hit)

    local player = game.Players:GetPlayerFromCharacter(hit.Parent)

    if not player or used[player.UserId] then return end

    local stats = player:FindFirstChild("leaderstats")
    local money = stats and stats:FindFirstChild("Money")

    if money then
        used[player.UserId] = true
        money.Value += 100
    end

end)

game.Players.PlayerRemoving:Connect(function(player)
    used[player.UserId] = nil
end)
`
        }

    ];

    for (const item of scripts) {

        if (item.keys.some(key => text.includes(key))) {

            return `
🛠️ اسم السكربت: ${item.name}

📌 النوع: ${item.type}

📂 المكان: ${item.place}

الكود:

\`\`\`lua
${item.code.trim()}
\`\`\`

تم إنشاء هذا السكربت من مكتبة AIdev المحلية.

ملاحظة: تأكد من وجود العناصر المطلوبة قبل تشغيله.
`;
        }

    }

    return null;
}

// ======================================
// إصلاح بعض الأخطاء البسيطة
// ======================================

function repairScript(code) {

    let fixed = code;
    let changes = [];

    if (fixed.includes("wait()")) {
        fixed = fixed.replaceAll("wait()", "task.wait()");
        changes.push("استبدال wait() بـ task.wait()");
    }

    if (changes.length === 0) {
        return {
            reply: "لم أجد إصلاحاً تلقائياً آمناً لهذا السكربت.\nأحتاج رسالة الخطأ أو وصف المشكلة حتى أساعدك."
        };
    }

    return {
        reply:
            "تم تطبيق الإصلاحات التالية:\n\n" +
            changes.map((c, i) => `${i + 1}. ${c}`).join("\n") +
            "\n\nالسكربت بعد الإصلاح:\n\n```lua\n" +
            fixed +
            "\n```"
    };
}

// ======================================
// المساعدة
// ======================================

function help() {

    return `أهلاً بك! أنا AIdev 🛠️

أوامري:

/فحص سكربت
/شرح سكربت
/إصلاح سكربت
/تحسين سكربت
/إنشاء سكربت
/تحويل سكربت
/فحص أداء
/كشف الأخطاء
/مساعدة

أقدر أساعدك في:
- Roblox Studio
- Studio Lite
- Luau
- Lua
- أفكار الألعاب
- إنشاء السكربتات
- فحص الأخطاء الشائعة

اكتب الأمر ثم أرسل طلبك أو الكود.`;
}

// ======================================
// الردود المحلية
// ======================================

function generateReply(message) {

    const original = message.trim();
    const text = original.toLowerCase();

    if (!original) {
        return "اكتب لي وش تحتاج وأنا أساعدك.";
    }

    if (
        text.includes("السلام عليكم") ||
        text === "سلام"
    ) {
        return "وعليكم السلام ورحمة الله وبركاته! ❤️ شلونك؟";
    }

    if (
        text.includes("شلونك") ||
        text.includes("كيف حالك")
    ) {
        return "بخير الحمد لله! وأنت شلونك؟ 😎";
    }

    if (
        text.includes("من أنت") ||
        text.includes("من انت")
    ) {
        return "أنا AIdev، مساعدك المحلي للبرمجة وصناعة ألعاب Roblox! 🛠️";
    }

    if (
        text.includes("شكرا") ||
        text.includes("مشكور")
    ) {
        return "العفو! بالخدمة دائماً ❤️";
    }

    if (
        text.includes("فكرة") ||
        text.includes("افكار") ||
        text.includes("أفكار")
    ) {
        return "هذه أفكار ألعاب ممكن تطورها:\n\n" +
            ideas.map((idea, i) => `${i + 1}. ${idea}`).join("\n\n");
    }

    if (
        text.includes("مساعدة") ||
        text === "/مساعدة"
    ) {
        return help();
    }

    if (
        text.includes("فحص سكربت") ||
        text.startsWith("/فحص")
    ) {
        return checkScript(original.replace(/^\/فحص سكربت/, "").trim());
    }

    if (
        text.startsWith("/كشف الأخطاء")
    ) {
        return checkScript(original.replace("/كشف الأخطاء", "").trim());
    }

    if (
        text.startsWith("/إصلاح سكربت")
    ) {
        const code = original.replace("/إصلاح سكربت", "").trim();

        if (!code) {
            return "أرسل السكربت بعد الأمر حتى أحاول إصلاحه.";
        }

        return repairScript(code).reply;
    }

    if (
        text.startsWith("/شرح سكربت")
    ) {
        return "أرسل الكود الذي تريد شرحه. أستطيع مساعدتك في تحديد وظيفة الأجزاء الواضحة منه، لكن التحليل هنا محدود.";
    }

    if (
        text.startsWith("/تحسين سكربت") ||
        text.startsWith("/فحص أداء")
    ) {
        return "أرسل السكربت وسأفحص بعض الأنماط والمشاكل الشائعة. هذا الفحص المحلي محدود.";
    }

    if (
        text.startsWith("/إنشاء سكربت")
    ) {
        const result = createScript(
            original.replace("/إنشاء سكربت", "").trim()
        );

        return result ||
            "ما عندي قالب جاهز لهذا الطلب حالياً. جرّب وصف نظام بسيط مثل: سكربت سرعة أو عملات أو Leaderstats.";
    }

    if (
        text.includes("سكربت") ||
        text.includes("roblox") ||
        text.includes("lua")
    ) {
        const result = createScript(original);

        if (result) return result;

        return "أقدر أساعدك بقوالب برمجية محلية محدودة.\n\nجرّب طلب سكربت عملات أو سرعة أو Kill Brick أو Leaderstats.";
    }

    return "هلا! 😎 أنا AIdev.\n\nأقدر أساعدك في البرمجة بأوامر محلية محدودة، أو أعطيك أفكار مابات.\n\nاكتب /مساعدة لمعرفة الأوامر.";
}

// ======================================
// استقبال الرسائل
// ======================================

app.post("/api/chat", (req, res) => {

    try {

        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                error: "الرسالة فارغة."
            });
        }

        if (message.length > 50000) {
            return res.status(400).json({
                error: "الرسالة طويلة جداً."
            });
        }

        const commands = [
            "/فحص سكربت",
            "/شرح سكربت",
            "/إصلاح سكربت",
            "/تحسين سكربت",
            "/إنشاء سكربت",
            "/تحويل سكربت",
            "/فحص أداء",
            "/كشف الأخطاء",
            "/مساعدة"
        ];

        const command = commands.find(c =>
            message.trim().startsWith(c)
        ) || null;

        const reply = generateReply(message);

        res.json({
            reply,
            command
        });

    } catch (error) {

        console.error("AIdev ERROR:", error);

        res.status(500).json({
            error: "حدث خطأ أثناء معالجة الرسالة."
        });

    }

});

// ======================================
// حالة الخادم
// ======================================

app.get("/api/status", (req, res) => {

    res.json({
        online: true,
        name: SYSTEM_NAME,
        model: "Local Rules Engine",
        mode: "FREE",
        commands: 9
    });

});

// ======================================
// تشغيل الخادم
// ======================================

app.listen(PORT, () => {

    console.log("================================");
    console.log("AIdev PRO - FREE MODE");
    console.log("Server: http://localhost:" + PORT);
    console.log("Mode: Local");
    console.log("API: Disabled");
    console.log("================================");

});
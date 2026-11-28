import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" }));
app.use(express.static(__dirname));

const SYSTEM_NAME = "AIdev";

// ======================================
// أفكار الألعاب
// ======================================

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
        errors.push("انتبه: DataStoreService يجب استخدامه من سكربت سيرفر.");
    }

    if (code.includes("wait()")) {
        errors.push("يفضل استخدام task.wait() بدلاً من wait().");
    }

    if (errors.length === 0) {
        return "لم أكتشف أخطاء شائعة واضحة، لكن هذا ليس فحصاً كاملاً للكود.";
    }

    return "نتيجة الفحص:\n\n" +
        errors.map((e, i) => `${i + 1}. ${e}`).join("\n");
}

// ======================================
// مكتبة السكربتات
// ======================================

function createScript(message) {
    const text = message.toLowerCase();

    const scripts = [

        // نظام الفلوس
        {
            keys: ["leaderstats", "لوحة", "فلوس", "نظام المال", "نظام الفلوس"],
            name: "Money System",
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

        // متجر السرعة - قبل لوحة السرعة
        {
            keys: ["متجر سرعة", "شراء سرعة", "speed shop"],
            name: "Speed Shop",
            type: "Script",
            place: "داخل Part",
            code: `
local part = script.Parent

local prompt = Instance.new("ProximityPrompt")
prompt.ActionText = "Buy Speed"
prompt.ObjectText = "Speed Shop"
prompt.Parent = part

prompt.Triggered:Connect(function(player)

    local stats = player:FindFirstChild("leaderstats")
    if not stats then return end

    local money = stats:FindFirstChild("Money")
    local character = player.Character

    if not money or not character then return end

    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return end

    local price = 100

    if money.Value >= price then
        money.Value -= price
        humanoid.WalkSpeed += 5
    end

end)
`
        },

        // نظام الريبرث
        {
            keys: ["ريبرث", "rebirth", "إعادة الولادة"],
            name: "Rebirth System",
            type: "Script",
            place: "ServerScriptService",
            code: `
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local event = ReplicatedStorage:FindFirstChild("RebirthEvent")

if not event then
    event = Instance.new("RemoteEvent")
    event.Name = "RebirthEvent"
    event.Parent = ReplicatedStorage
end

Players.PlayerAdded:Connect(function(player)

    local stats = player:WaitForChild("leaderstats")

    local rebirths = stats:FindFirstChild("Rebirths")

    if not rebirths then
        rebirths = Instance.new("IntValue")
        rebirths.Name = "Rebirths"
        rebirths.Value = 0
        rebirths.Parent = stats
    end

end)

event.OnServerEvent:Connect(function(player)

    local stats = player:FindFirstChild("leaderstats")
    if not stats then return end

    local money = stats:FindFirstChild("Money")
    local rebirths = stats:FindFirstChild("Rebirths")

    if not money or not rebirths then return end

    local required = 1000 * (2 ^ rebirths.Value)

    if money.Value >= required then
        money.Value = 0
        rebirths.Value += 1
        print(player.Name .. " completed a Rebirth!")
    end

end)
`
        },

        // نقاط الحفظ
        {
            keys: ["checkpoint", "نقطة حفظ", "نقاط الحفظ", "نقطة التفتيش"],
            name: "Checkpoint System",
            type: "Script",
            place: "داخل SpawnLocation",
            code: `
local checkpoint = script.Parent

checkpoint.Touched:Connect(function(hit)

    local character = hit.Parent
    local player = game.Players:GetPlayerFromCharacter(character)

    if player then
        player.RespawnLocation = checkpoint
        print("Checkpoint saved for " .. player.Name)
    end

end)
`
        },

        // لوحة السرعة
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

        // Kill Brick
        {
            keys: ["قتل", "kill brick", "موت", "قطعة تقتل"],
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

        // القفز
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

        // العملات
        {
            keys: ["عملات", "عملة", "coin", "نقود", "جمع المال"],
            name: "Coin System",
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

        // زر GUI
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

        // اختفاء القطعة
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

        // الشفاء
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

        // الانتقال
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

        // الانفجار
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

        // دوران القطعة
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

        // الإضاءة
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

        // الباب
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

        // الخبرة
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

        // المكافأة
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
// إصلاح السكربتات
// ======================================

function repairScript(code) {

    let fixed = code;
    const changes = [];

    if (fixed.includes("wait()")) {
        fixed = fixed.replaceAll("wait()", "task.wait()");
        changes.push("استبدال wait() بـ task.wait()");
    }

    if (changes.length === 0) {
        return {
            reply: "لم أجد إصلاحاً تلقائياً آمناً لهذا السكربت.\nأرسل رسالة الخطأ حتى أساعدك."
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
// نظام الردود
// ======================================

function generateReply(message) {

    const original = String(message || "").trim();
    const text = original.toLowerCase();

    if (!original) {
        return "اكتب طلبك بالتفصيل، وأنا أساعدك خطوة بخطوة. 🛠️";
    }

    // التحية
    if (/السلام عليكم|^سلام$/.test(text)) {
        return "وعليكم السلام ورحمة الله وبركاته! ❤️\nحياك في AIdev. وش المشروع أو السكربت اللي نشتغل عليه اليوم؟";
    }

    if (/شلونك|كيف حالك|كيفك/.test(text)) {
        return "بخير دامك بخير! 😎 جاهز أساعدك في Roblox Studio وStudio Lite.";
    }

    if (/من أنت|من انت|وش اسمك|اسمك/.test(text)) {
        return "أنا AIdev، مساعدك في برمجة Roblox وتطوير الألعاب. 🛠️\n\nأعمل حالياً بنظام ردود وقواعد محلية، ولست نموذج ذكاء اصطناعي متصلاً بالإنترنت.";
    }

    if (/شكرا|مشكور|يعطيك العافية/.test(text)) {
        return "العفو! ❤️ بالخدمة دائماً.";
    }

    // المساعدة
    if (text === "/مساعدة" || text.includes("وش تقدر تسوي")) {
        return help() + "\n\nاكتب طلبك بالتفصيل حتى أقدر أساعدك بشكل أفضل.";
    }

    // أفكار الألعاب
    if (/فكرة|افكار|أفكار|اقترح.*ماب/.test(text)) {
        return "هذه أفكار ألعاب تقدر تطورها:\n\n" +
            ideas.map((idea, i) => `${i + 1}. ${idea}`).join("\n\n");
    }

    // فحص السكربت
    if (
        text.startsWith("/فحص سكربت") ||
        text.startsWith("/كشف الأخطاء") ||
        text.startsWith("/فحص")
    ) {

        const code = original
            .replace(/^\/فحص سكربت/i, "")
            .replace(/^\/كشف الأخطاء/i, "")
            .replace(/^\/فحص/i, "")
            .trim();

        if (!code) {
            return "أرسل الكود بعد الأمر:\n\n/فحص سكربت\n```lua\nضع الكود هنا\n```";
        }

        return checkScript(code);
    }

    // إصلاح السكربت
    if (text.startsWith("/إصلاح سكربت")) {

        const code = original.replace(/^\/إصلاح سكربت/i, "").trim();

        if (!code) {
            return "أرسل السكربت ورسالة الخطأ من Output.";
        }

        return repairScript(code).reply +
            "\n\nملاحظة: الإصلاح التلقائي محدود حالياً.";
    }

    // شرح السكربت
    if (text.startsWith("/شرح سكربت")) {

        const code = original.replace(/^\/شرح سكربت/i, "").trim();

        if (!code) {
            return "أرسل الكود الذي تريد شرحه.";
        }

        return "وصلني الكود! نسخة AIdev المحلية لا تملك محلّل Luau كاملاً، لذلك أرسل الجزء الذي تريد فهمه أو وضّح وظيفته حتى أساعدك دون تخمين.";
    }

    // تحسين الأداء
    if (
        text.startsWith("/تحسين سكربت") ||
        text.startsWith("/فحص أداء")
    ) {

        const code = original
            .replace(/^\/تحسين سكربت/i, "")
            .replace(/^\/فحص أداء/i, "")
            .trim();

        if (!code) {
            return "أرسل السكربت حتى أفحص بعض مشاكل الأداء الشائعة.";
        }

        const findings = [];

        if (code.includes("while true do") && !code.includes("task.wait")) {
            findings.push("قد تسبب حلقة while true ضغطاً على الأداء إذا لم تحتوِ على انتظار.");
        }

        if (code.includes("wait()")) {
            findings.push("يفضل استخدام task.wait() بدلاً من wait().");
        }

        if (findings.length > 0) {
            return "ملاحظات أولية:\n\n" +
                findings.map((v, i) => `${i + 1}. ${v}`).join("\n\n");
        }

        return "لم أكتشف مشاكل الأداء الشائعة التي يفحصها النظام. هذا ليس فحصاً كاملاً.";
    }

    // إنشاء السكربتات بالأمر
    if (text.startsWith("/إنشاء سكربت")) {

        const request = original.replace(/^\/إنشاء سكربت/i, "").trim();

        if (!request) {
            return "اكتب وصف السكربت.\nمثال: /إنشاء سكربت عملات تزيد عند لمس Part";
        }

        const result = createScript(request);

        return result ||
            "ما عندي قالب مطابق لهذا الطلب حالياً.\n\nجرّب طلب سكربت عملات أو سرعة أو ريبرث أو متجر سرعة أو نقاط حفظ.";
    }

    // إنشاء السكربتات باللغة الطبيعية
    if (/سكربت|script|luau|lua/.test(text)) {

        const result = createScript(original);

        if (result) {
            return result;
        }

        return "فهمت أنك تريد سكربت! 🛠️\n\nلكن ما عندي قالب مطابق لهذا الطلب حالياً.\nجرّب كتابة: أبي سكربت ريبرث أو أبي سكربت متجر سرعة أو أبي سكربت عملات.";
    }

    // Studio Lite
    if (/studio lite|استديو لايت|ستوديو لايت/.test(text)) {
        return "أقدر أساعدك في Studio Lite! 🛠️\n\nهل تريد إضافة Script أو LocalScript؟ أو إنشاء Part أو GUI؟ اشرح لي وش تبي تسوي.";
    }

    // أماكن السكربتات
    if (/explorer|اكسبلورر|وين.*احط|مكان.*السكربت/.test(text)) {
        return "أماكن السكربتات:\n\n" +
            "• Script: غالباً ServerScriptService.\n" +
            "• LocalScript: غالباً StarterGui أو StarterPlayerScripts.\n" +
            "• سكربت القطعة: يمكن وضعه داخل Part.\n\n" +
            "قل لي وظيفة السكربت وأحدد لك المكان الصحيح.";
    }

    // الأخطاء
    if (/output|خطأ|error|ما يشتغل|لا يعمل|خربان/.test(text)) {
        return "خلّنا نحل المشكلة! 🔍\n\nأرسل لي:\n" +
            "1. رسالة الخطأ من Output.\n" +
            "2. السكربت المستخدم.\n" +
            "3. نوع السكربت.\n" +
            "4. مكانه في Explorer.";
    }

    // GUI
    if (/gui|واجهة|قائمة/.test(text)) {
        return "أقدر أساعدك في تصميم GUI.\n\nاشرح لي شكل الواجهة، والأزرار التي تريدها، وماذا يحدث عند الضغط عليها.";
    }

    // DataStore
    if (/datastore|حفظ البيانات|حفظ الفلوس|يحفظ التقدم/.test(text)) {
        return "نظام DataStore يحفظ بيانات اللاعبين.\n\n" +
            "يجب استخدامه من Script على السيرفر.\n\n" +
            "تحتاج إلى:\n" +
            "1. تحميل البيانات عند دخول اللاعب.\n" +
            "2. حفظ البيانات عند خروجه.\n" +
            "3. استخدام pcall لمعالجة الأخطاء.\n\n" +
            "اكتب القيم التي تريد حفظها مثل Money وWins وRebirths.";
    }

    return "هلا! 😎 أنا AIdev.\n\nأقدر أساعدك في Roblox Studio وStudio Lite، وإنشاء السكربتات وفحص الأخطاء الشائعة.\n\nاكتب /مساعدة لمعرفة الأوامر.";
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

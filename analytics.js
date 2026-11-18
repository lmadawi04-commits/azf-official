// AZF OFFICIAL - Online Counter

(function () {
    const SUPABASE_URL = "https://sbudwgxyoeqosvyhckvb.supabase.co";

    // ضع هنا نفس المفتاح العام Publishable Key الذي استخدمته سابقاً
    const SUPABASE_KEY = "sb_publishable_SvYg2gBqI72GHDLNH7V_Yg_eYDMigYX";

    const SESSION_KEY = "azf_visitor_id";

    let visitorId = localStorage.getItem(SESSION_KEY);

    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, visitorId);
    }

    const counter = document.createElement("div");

    counter.id = "azf-online-counter";

    counter.innerHTML = `
        <span class="online-dot"></span>
        <span>المتواجدون الآن:</span>
        <strong id="azf-online-number">...</strong>
    `;

    document.body.appendChild(counter);

    const style = document.createElement("style");

    style.textContent = `
        #azf-online-counter {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 999999;
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 12px 18px;
            background: #171124;
            color: white;
            border: 1px solid #873cff;
            border-radius: 30px;
            box-shadow: 0 0 20px #873cff55;
            font-family: Cairo, sans-serif;
            font-size: 13px;
            direction: rtl;
        }

        #azf-online-counter strong {
            color: #b98aff;
            font-size: 17px;
        }

        .online-dot {
            width: 9px;
            height: 9px;
            background: #36e98a;
            border-radius: 50%;
            box-shadow: 0 0 10px #36e98a;
            animation: azfPulse 1.5s infinite;
        }

        @keyframes azfPulse {
            50% { opacity: .4; }
        }
    `;

    document.head.appendChild(style);

    const script = document.createElement("script");

script.src = "https://unpkg.com/@supabase/supabase-js@2";
    script.onload = async function () {

        const supabase = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

        async function updateOnline() {

            const { error } = await supabase.rpc("azf_heartbeat", {
                p_visitor_id: visitorId
            });

            if (error) {
                console.log("AZF Error:", error.message);
                return;
            }

            const { data, error: statsError } =
                await supabase.rpc("azf_get_stats");

            if (statsError) {
                console.error("AZF Stats Error:", statsError);
                return;
            }

            document.getElementById("azf-online-number").textContent =
                data.online_now ?? 0;
        }

        if (!sessionStorage.getItem("azf_visit_recorded")) {

            const { error } = await supabase.rpc("azf_track_visit", {
                p_visitor_id: visitorId
            });

            if (!error) {
                sessionStorage.setItem("azf_visit_recorded", "yes");
            }
        }

        await updateOnline();

        setInterval(updateOnline, 10000);
    };

    script.onerror = function () {
        document.getElementById("azf-online-number").textContent = "!";
    };

    document.head.appendChild(script);

})();

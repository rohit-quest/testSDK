class config {
    static BACKEND_URL = 'https://api.questprotocol.xyz/';
    static FLAG_CONSTRAINTS = {
        OnboardingFlag: "quest.sdk.onboardings",
        AnalyticsFlag: "quest.sdk.analytics",
        PaymentFlag: "quest.sdk.payment",
        ChatFlag: "quest.sdk.chat",
    }
}

export default config;
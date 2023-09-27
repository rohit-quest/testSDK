class config {
    static BACKEND_URL = 'http://localhost:8081/';
    static FLAG_CONSTRAINTS = {
        OnboardingFlag: "quest.sdk.onboardings",
        AnalyticsFlag: "quest.sdk.analytics",
        PaymentFlag: "quest.sdk.payment",
        ChatFlag: "quest.sdk.chat",
    }
}

export default config;
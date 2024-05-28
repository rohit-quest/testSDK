class config {
    static BACKEND_URL = 'https://api.questprotocol.xyz/';
    static BASE_IPFS_URL = "https://pin.questprotocol.xyz/ipfs/"
    static BACKEND_URL_STAGING = 'http://localhost:8081/';
    static FLAG_CONSTRAINTS = {
        OnboardingFlag: "quest.sdk.onboardings",
        AnalyticsFlag: "quest.sdk.analytics",
        PaymentFlag: "quest.sdk.payment",
        ChatFlag: "quest.sdk.chat",
        FeedbackWorkflowFlag: "quest.sdk.feedback_workflow",
        GetStartedFlag: "quest.sdk.get_started",
    }
}

export default config;
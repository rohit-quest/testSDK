class config {
    static APP_URL = "https://beta.questapp.xyz/";
    static BACKEND_URL = 'https://staging.questprotocol.xyz/' //  "http://localhost:8081/"; 
    static RARIBLE_BASE_URL =  "https://rarible.com/"; // "https://rarible.com/";
    static RARIBLE_BASE_API_URL = "https://api.rarible.com/"; // "https://api.rarible.com/";
    static ERC1155_ADDRESS =  "0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7"; // "0xB66a603f4cFe17e3D27B87a8BfCaD319856518B8";
    static BLOCKCHAIN_NETWORK =  "rinkeby"; // "mainnet";
    static ROYALTY_ADDRESS = "0x0631aBa27f206AF64A1a78B5070E8898A05070DF";
    static DEFAULT_PROFILE_IMG = "https://pin.questprotocol.xyz/ipfs/QmVi5LKevzcXBX9vWmfmqx4Jr3y3yrHFYDHTcPkvHSufss";

    static QUEST_COMMUNITY_ID = "e-0000000000";
    static QUEST_OPEN_COMMUNITY_ID = "e-0000000001";
    static BASE_IPFS_URL = "https://pin.questprotocol.xyz/ipfs/";
    static BASE_OPENSEA_URL = "https://testnets.opensea.io/assets/matic/";

    static TWITTER_OAUTH_CLIENT_ID = "MTBHdUstWGJxcWR2OGd5ekYxUzc6MTpjaQ";

    static DISCORD_OAUTH_CLIENT_ID = "1128311373533806612";

    static SLACK_OAUTH_CLIENT_ID = "5757231096614.5787670559984";

    static QUEST_PROTOCOL_API_KEY = "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be";
    static QUEST_PROTOCOL_API_SECRET = "s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36";

    // REDIRECT URIs
    static REDIRECT_URI_EDIT_PROFILE = this.APP_URL + "profile/edit";  
    static REDIRECT_URI_ADMIN_SETTING = this.APP_URL + "admin/settings";
    static REDIRECT_URI_DISCORD_CONNECT = this.APP_URL + "connect-discord";  
    static REDIRECT_URI_TWITTER_CONNECT = this.APP_URL + "connect-twitter";  
    static REDIRECT_URI_SLACK_CONNECT = this.APP_URL + "connect-slack"; 

    // LOGIN & WEB3AUTH
    static EVM_TESTNET_CLIENT_ID = "BI87YMD_qNahBLIn2srBlTT4oxYMFqwTO4p6s8Quz8lUSit_vqlyCNewQrV90ct6zTNkN51dx5nBiuv7bKCj-Tg";
    static EVM_MAINNET_CLIENT_ID = "BHU1mgutwLfN7b8yKj91Jy_8Y0sAqVzL7Qdkijmy0Rw6nMqRsB0SfZm8pPGNGYMDt44iXjHj--_TMI2NWq2p7JU";

    static EVM_TESTNET_RPC = "https://rpc.ankr.com/polygon_mumbai/04346d7ddee4bf5ef026c40675c9089335a4b5e85086af43b30d804b821551b8";
    static EVM_MAINNET_RPC = "https://rpc.ankr.com/polygon/04346d7ddee4bf5ef026c40675c9089335a4b5e85086af43b30d804b821551b8";

    //stripe key
    static PUBLISHABLE_KEY = "pk_test_51NQ7BBSEjbArJKRyiAelVC0LVf1bNgYrlK7S1kJR9IeaeeDOJSiGXACoauoMWkyfSA7jDFThEczl5hJJhGmgcKTv00pKjFm9bq";


    // google client id for google OAuth login
    static GOOGLE_CLIENT_ID = "867106888033-a6ml9eisjtos8al0eel6fbcsjh8bst3l.apps.googleusercontent.com";
}

export default config;

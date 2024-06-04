import axios from "axios";
import General from "../../general";

export const createDefaultQuest = async (
  backend_url: string,
  entityId: string,
  userId: string,
  token: string,
  apikey: string,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    const endsAtDate = new Date().setFullYear(new Date().getFullYear() + 2);

    let parentCampaign = {
      campaignId: 'q-default-helphub',
      defaultId: 'q-default-helphub',
      title: "Helphub",
      description: "Helphub",
      endsAt: endsAtDate,
      rewards: [{ rewardType: "REWARD_XP", xp: 10 }],
      sdkConfig: {
        platform: 'REACT',
        type: 'HELP_HUB',
        category: 'USER_ASSISTANCE'
      },
      userTargeting: {
        isEnabled: false,
        properties: [],
        propertyRelations: []
      }
    }
    let childCampaigns = [
      {
        title: "Helphub Feedback",
        description: "Helphub Feedback",
        endsAt: endsAtDate,
        sdkConfig: parentCampaign.sdkConfig,
        actions: [
          {
            title: "How do you like our App?",
            description: '',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'RATING'
          }
        ]
      },
      {
        title: "Helphub FAQ",
        description: "Helphub FAQ",
        endsAt: endsAtDate,
        sdkConfig: parentCampaign.sdkConfig,
        actions: [
          {
            title: "How can I assist you today?",
            description: 'You can complete your user information details by sharing the details asked in the form',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'VIEW_ONLY_TEXT'
          },
          {
            title: "How can I assist you tomorrow?",
            description: 'You can complete your user information details by sharing the details asked in the form',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'VIEW_ONLY_TEXT'
          },
          {
            title: "How can I assist you day after tomorrow?",
            description: 'You can complete your user information details by sharing the details asked in the form',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'VIEW_ONLY_TEXT'
          },
        ]
      },
      {
        title: "Helphub Updates",
        description: "Helphub Updates",
        endsAt: endsAtDate,
        sdkConfig: parentCampaign.sdkConfig,
        actions: [
          {
            title: "Update1",
            description: 'AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'LINK_OPEN_READ',
            metadata: {
              link: 'https://www.questlabs.ai/'
            }
          },
          {
            title: "Update2",
            description: 'Play with our pre-made templates and create your frame',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'LINK_OPEN_READ',
            metadata: {
              link: 'https://main.d2h2uj2sjo2c2h.amplifyapp.com/'
            }
          },
          {
            title: "Updates3",
            description: 'Conect with us to explore more',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'LINK_OPEN_READ',
            metadata: {
              link: 'https://www.linkedin.com/company/questai/'
            }
          },
        ]
      },
      {
        title: "Helphub Tasks",
        description: "Helphub Tasks",
        endsAt: endsAtDate,
        sdkConfig: parentCampaign.sdkConfig,
        actions: [
          {
            title: "Tasks-QuestLabs",
            description: 'AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'LINK_OPEN_READ',
            metadata: {
              link: 'https://www.questlabs.ai/'
            }
          },
          {
            title: "Tasks-React Playground",
            description: 'Play with our pre-made templates and create your frame',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'LINK_OPEN_READ',
            metadata: {
              link: 'https://main.d2h2uj2sjo2c2h.amplifyapp.com/'
            }
          },
          {
            title: "Tasks-Quest Linkedin",
            description: 'Conect with us to explore more',
            xp: 10,
            frequency: 'ONCE',
            isRequired: true,
            actionType: 'LINK_OPEN_READ',
            metadata: {
              link: 'https://www.linkedin.com/company/questai/'
            }
          },
        ]
      }
    ]
    let body = {parentCampaign, childCampaigns}

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    let request = `${backend_url}api/v2/entities/${entityId}/campaigns/parent`;

    let response = await axios.post(request, body, { headers });

    let responseObj = response?.data;

    if (responseObj?.success) {
      let getQuestResponse = await getDefaultQuest(
        backend_url,
        entityId,
        responseObj?.parentId,
        userId,
        token,
        apikey
      );
      return getQuestResponse;
    }
  } catch (err) {
    return err?.response?.data;
  }
};

export const getDefaultQuest = async (
  backend_url: string,
  entityId: string,
  questId: string,
  userId: string,
  token: string,
  apikey: string,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string,
  variation?: string
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    const params = new URLSearchParams()
    if(variation) params.set('variation', variation)

    let request = `${backend_url}api/v2/entities/${entityId}/campaigns/${questId}/parent?${params.toString()}`;

    let response = await axios(request, { headers });

    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getEntityDetails = async (
  backend_url: string,
  entityId: string,
  questId: string,
  userId: string,
  token: string,
  apikey: string,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string
) => {
  try {
    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    let request = `${backend_url}api/entities/${entityId}`;

    let response = await axios(request, { headers });

    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const claimQuest = async (
  backend_url: string,
  entityId: string,
  questId: string,
  userId: string,
  token: string,
  apikey: string,
  criteriaId: string,
  campaignVariationId: string,
  answer?: string[] | number[],
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string,
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    let request = `${backend_url}api/v2/entities/${entityId}/campaigns/${questId}/verify`;

    let response = await axios.post(
      request,
      { 
        campaignVariationId,
        actions: [
          {actionId: criteriaId, answers: answer.map(answer => String(answer))}
        ]
      },
      { headers }
    );
    return response.data;
  } catch (err) {
    return err?.response.data;
  }
};

export const getMessages = async (
  backend_url: string,
  entityId: string | undefined,
  //   questId: string,
  userId: string | undefined,
  token: string | undefined,
  apikey: string | undefined,
  conversationId: string | undefined,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string,
  //   criteriaId: string,
  //   answer?: string[] | number[]
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };
    let request = !!conversationId
      ? `${backend_url}api/entities/${entityId}/users/${userId}/conversation/user?conversationId=${conversationId}`
      : `${backend_url}api/entities/${entityId}/users/${userId}/conversation/user`;

    let response = await axios.get(request, { headers });
    return response.data;
  } catch (err) {
    return err?.response.data;
  }
};

export const sendMessage = async (
  backend_url: string,
  entityId: string | undefined,
  //   questId: string,
  userId: string | undefined,
  token: string | undefined,
  apikey: string | undefined,
  message: string,
  conversationId: string,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };
    let body = {
      message: message,
    };
    // console.log(entityId);
    let request = conversationId
      ? `${backend_url}api/entities/${entityId}/users/${userId}/conversation/user?conversationId=${conversationId}`
      : `${backend_url}api/entities/${entityId}/users/${userId}/conversation/user?new_conversation=true`;

    let response = await axios.post(request, body, { headers });
    // console.log("res", response);
    // console.log("res", response.data.success);
    return response.data;
  } catch (err) {
    return err?.response.data;
  }
};

export const satisfyOrNot = async (
  backend_url: string,
  entityId: string | undefined,
  //   questId: string,
  userId: string | undefined,
  token: string | undefined,
  apikey: string | undefined,
  isSatisfied: boolean,
  conversationId: string,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };
    let body = {
      isSatisfied,
    };
    // console.log(entityId);
    let request = `${backend_url}api/entities/${entityId}/users/${userId}/user/satisfied?conversationId=${conversationId}`;

    let response = await axios.post(request, body, { headers });

    return response.data;
  } catch (err) {
    return err?.response.data;
  }
};

export const closeChat = async (
  backend_url: string,
  entityId: string | undefined,
  userId: string | undefined,
  token: string | undefined,
  apikey: string | undefined,
  conversationId: string,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };
    
    let request = `${backend_url}api/entities/${entityId}/users/${userId}/conversation/user/close?conversationId=${conversationId}`;

    let response = await axios.post(request, {}, { headers });

    return response.data;
  } catch (err) {
    return err?.response.data;
  }
};

export const getUserData = async (
  backend_url: string,
  entityId: string | undefined,
  userId: string | undefined,
  token: string | undefined,
  apikey: string | undefined,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string
) => {
  try {
    if (uniqueUserId || uniqueEmailId) {
      let generalFunction = new General("", apiType);
      let userData = await generalFunction.getExternalLogin({
        apiType: apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey: apikey,
        apiSecret: "",
        token,
        uniqueEmailId,
      });
      if (userData?.userId) {
        userId = userData?.userId;
        token = userData?.token;
      }
    }

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    let request = `${backend_url}api/entities/${entityId}/users/${userId}/connected-socials`;

    let response = await axios(request, { headers });

    return response.data;

  } catch (err) {
    return err?.response.data;
  }
};

export const submitEmail = async (
  backend_url: string,
  entityId: string | undefined,
  userId: string | undefined,
  token: string | undefined,
  apikey: string | undefined,
  uniqueUserId?: string,
  uniqueEmailId?: string,
  apiType?: string,
  email?: string
) => {
  try {
    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    const body = {
      externalUserId: !!uniqueUserId && uniqueUserId,
      entityId: entityId,
      email: email,
    };

    let request = `${backend_url}api/users/external/login`;

    let response = await axios.post(request, body, { headers });

    return response.data;

  } catch (err) {
    return err?.response.data;
  }
};

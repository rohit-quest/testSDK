import axios from "axios";

export const createDefaultQuest = async (
  backend_url: string,
  entityId: string,
  userId: string,
  token: string,
  apikey: string
) => {
  try {
    const endsAtDate = new Date().setFullYear(new Date().getFullYear() + 2);
    let body = {
      defaultId: "q-default-helphub",
      title: "Helphub",
      description: "Helphub",
      endsAt: endsAtDate,
      eligibilityCriteriaArray: [
        [
          {
            type: "RATING",
            source: "USER_INPUT",
            data: {
              title: "How do you like our App?",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
              isRequired: true,
            },
          },
        ],
        [
          {
            type: "VIEW_ONLY_TEXT",
            source: "VIEW_ONLY",
            data: {
              question: "How can I assist you today?",
              answer:
                "You can complete your user information details by sharing the details asked in the form",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
            },
          },
          {
            type: "VIEW_ONLY_TEXT",
            source: "VIEW_ONLY",
            data: {
              question: "How can I assist you tomorrow?",
              answer:
                "You can complete your user information details by sharing the details asked in the form",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
            },
          },
          {
            type: "VIEW_ONLY_TEXT",
            source: "VIEW_ONLY",
            data: {
              question: "How can I assist you day after tomorrow?",
              answer:
                "You can complete your user information details by sharing the details asked in the form",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
            },
          },
        ],
        [
          {
            type: "LINK_OPEN_READ",
            source: "LINK",
            data: {
              linkActionName: "Update1",
              linkActionUrl: "https://www.questlabs.ai/",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
              isRequired: true,
              description:
                "AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ",
            },
          },
          {
            type: "LINK_OPEN_READ",
            source: "LINK",
            data: {
              linkActionName: "Update2",
              linkActionUrl: "https://main.d2h2uj2sjo2c2h.amplifyapp.com/",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
              isRequired: true,
              description:
                "Play with our pre-made templates and create your frame",
            },
          },
          {
            type: "LINK_OPEN_READ",
            source: "LINK",
            data: {
              linkActionName: "Updates3",
              linkActionUrl: "https://www.linkedin.com/company/questlabss/",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
              isRequired: true,
              description: "Conect with us to explore more",
            },
          },
        ],
        [
          {
            type: "LINK_OPEN_READ",
            source: "LINK",
            data: {
              linkActionName: "Tasks-QuestLabs",
              linkActionUrl: "https://www.questlabs.ai/",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
              isRequired: true,
              description:
                "AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ",
            },
          },
          {
            type: "LINK_OPEN_READ",
            source: "LINK",
            data: {
              linkActionName: "Tasks-React Playground",
              linkActionUrl: "https://main.d2h2uj2sjo2c2h.amplifyapp.com/",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
              isRequired: true,
              description:
                "Play with our pre-made templates and create your frame",
            },
          },
          {
            type: "LINK_OPEN_READ",
            source: "LINK",
            data: {
              linkActionName: "Tasks-Quest Linkedin",
              linkActionUrl: "https://www.linkedin.com/company/questlabss/",
              effort: "E1",
              importance: "I1",
              xp: 10,
              frequency: "ONCE",
              isRequired: true,
              description: "Conect with us to explore more",
            },
          },
        ],
      ],
      rewards: [{ type: "REWARD_XP", xp: 10 }],
      eligibilityCriteriaIdsToDelete: [],
      type: "HELPHUB",
      questDetails: [
        {
          title: "Helphub Feedback",
          description: "Helphub Feedback",
          endsAt: endsAtDate,
        },
        {
          title: "Helphub FAQ",
          description: "Helphub FAQ",
          endsAt: endsAtDate,
        },
        {
          title: "Helphub Updates",
          description: "Helphub Updates",
          endsAt: endsAtDate,
        },
        {
          title: "Helphub Tasks",
          description: "Helphub Tasks",
          endsAt: endsAtDate,
        },
      ],
    };

    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    let request = `${backend_url}api/entities/${entityId}/quests/parent?userId=${userId}`;

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
  apikey: string
) => {
  try {
    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    let request = `${backend_url}api/entities/${entityId}/quests/${questId}/parent?userId=${userId}&detailedData=true`;

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
  apikey: string
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
  answer?: string[] | number[]
) => {
  try {
    let headers = {
      userId,
      token,
      entityId,
      apikey,
    };

    let request = `${backend_url}api/entities/${entityId}/quests/${questId}/verify?userId=${userId}`;

    let response = await axios.post(
      request,
      { criteriaId, ...(answer && { answer }) },
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
  conversationId: string | undefined
  //   criteriaId: string,
  //   answer?: string[] | number[]
) => {
  try {
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
  conversationId: string
) => {
  try {
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
  conversationId: string
) => {
  try {
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

import { Handler } from "@netlify/functions";

// const private = '민감한 정보!'

export const handler: Handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            name: "jinu",
            age: 85,
            isValid: true,
        }),
    };
};

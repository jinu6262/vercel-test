import { Handler } from "@netlify/functions";
import axios from "axios";

interface RequestBody {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: {
        [key: string]: unknown;
    };
    path: string;
}

const { USERNAME, API_KEY } = process.env;
export const handler: Handler = async (event) => {
    const { data, method, path = "" } = JSON.parse(event.body || "{}") as RequestBody;
    const { data: responseValue } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${path}`,
        headers: {
            "content-type": "application/json",
            apikey: API_KEY,
            username: USERNAME,
        },
        method,
        data,
    });

    return {
        statusCode: 200,
        body: JSON.stringify(responseValue),
    };
};

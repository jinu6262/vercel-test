import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

interface RequestBody {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: {
        [key: string]: unknown;
    };
    path?: string;
}

const { USERNAME, API_KEY } = process.env;
// 요청/반환
export default async (req: VercelRequest, res: VercelResponse) => {
    const { data, method, path = "" } = req.body as RequestBody;
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

    res.status(200).json(responseValue);
};

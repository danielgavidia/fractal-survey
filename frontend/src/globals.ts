import { v4 as uuidv4 } from "uuid";

export const SERVER_URL = "http://localhost:3000";

export const generateUUID = (): string => {
    return uuidv4();
};

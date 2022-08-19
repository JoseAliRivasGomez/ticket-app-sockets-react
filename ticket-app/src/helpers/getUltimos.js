
import { getEnvVariables } from "./getEnvVariables";

const {VITE_API_URL} = getEnvVariables();

export const getUltimos = async () => {
    const resp = await fetch(`${VITE_API_URL}/ultimos`);
    const data = await resp.json();

    return data.ultimos;
}
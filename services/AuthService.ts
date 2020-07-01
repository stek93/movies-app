import { AppRoutes } from "../constants/AppRoutes";
import axios, { AxiosInstance } from "axios";
import { AuthToken, ILogin, SessionToken } from "../constants/types";
import Cookies from 'universal-cookie';
import { NextPageContext } from "next";

const API_KEY = process.env.API_KEY;
const MOVIES_BASE_URL = AppRoutes.MoviesBaseURL;
const AUTH_TOKEN_NEW = AppRoutes.AuthNewTokenURI;
const AUTHENTICATE = AppRoutes.AuthLoginURI;
const SESSION_ID = AppRoutes.AuthNewSessionURI;
const COOKIE_KEY = 'sessionID';

class AuthService {

    private axiosInstance: AxiosInstance = axios.create({
        baseURL: MOVIES_BASE_URL,
        params: {
            api_key: API_KEY
        }
    });

    private async getNewRequestToken(): Promise<AuthToken> {
        return (await this.axiosInstance.get<AuthToken>(AUTH_TOKEN_NEW)).data;
    }

    private async createSessionWithLogin(username: string, password: string, requestToken: string): Promise<ILogin> {
        return (await this.axiosInstance.post<ILogin>(AUTHENTICATE,
            { username, password, request_token: requestToken })).data;
    }

    private async createSessionID(requestToken: string): Promise<SessionToken> {
        return (await this.axiosInstance.post<SessionToken>(SESSION_ID, { request_token: requestToken })).data;
    }

    public async login(username: string, password: string): Promise<SessionToken> {
        const requestToken: string = (await this.getNewRequestToken()).request_token;
        const validateCall: ILogin = (await this.createSessionWithLogin(username, password, requestToken));
        return await this.createSessionID(validateCall.request_token);
    }

    public saveSessionID(sessionID: string) {
        const cookies = new Cookies();
        cookies.set(COOKIE_KEY, sessionID);
    }

    public isAuthenticated(context: NextPageContext) {
        const cookies = new Cookies(context.req ? context.req.headers.cookie : null);
        const sessionID = cookies.get(COOKIE_KEY)

        return sessionID != null;
    }

    public getSessionIDFromCookie(): string {
        const cookies = new Cookies();
        return cookies.get(COOKIE_KEY);
    }
}

export default new AuthService();
import { OAuth2Client } from 'google-auth-library';
import 'dotenv/config'

const CLIENT_ID = process.env.GG_CLIENT_ID;
const CLIENT_SECRET = process.env.GG_CLIENT_SECRET;
const REDIRECT_URI = process.env.URL_CLIENT;
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
export default oAuth2Client;
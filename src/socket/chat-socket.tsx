import { io } from "socket.io-client";
import { siteUrl } from "../constants";

const socket = io(siteUrl);

export default socket;
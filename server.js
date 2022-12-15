import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import onSocket from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
	console.log('connedted')
});

app.use(express.static(__dirname + "/public"));

const io = new Server(httpServer);
onSocket(io);

const random = Math.floor(Math.random() * 9000 + 1000);

console.log(random);
const port = process.env.PORT || random;


httpServer.listen(port, () => console.log(`Listening on port ${port}...`));

const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        console.log("onconnect", session.id);
        cb(); //Accept the connection
    },
    onMailFrom(address, session, cb) {
        console.log("onMailFrom", address.address, session.id);
        cb(); //Accept the address
    },
    onRcptTo(address, session, cb) {
        console.log("onRcptTo", address.address, session.id);
        cb(); //Accept the address
    },
    onData(stream, session, cb) {
        stream.on("data", (data) => console.log(`onData ${data.toString()}`));
        stream.pipe(process.stdout);
        stream.on("end", cb);
    },
});

server.listen(25, () => console.log("Server running on port 25"));

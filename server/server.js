require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const { Server } = require("socket.io");
const { ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());
const PORT = 3001;
const server = http.createServer(app);

server.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else 
        console.log("Error occurred, server can't start", error);   
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods:["GET", "POST"]
    }
});

io.on("connect", (socket) => {
    // console.log(socket.id);
    
    socket.join('roomName', (data) => {
        console.log(data + "✅🚀");
    })

    socket.on('join', room => {
        socket.join(room);

        socket.to(room).emit('user joined', {
            username: socket.id
        })
    })

    socket.on("message", data => {
        console.log("Socket => " + data);
    })
});

// LOGIN

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password, res);
})

async function login(email, password, res) {
    await client.connect();
    const db = client.db('ClusterIRC');
    const collection = db.collection('users');

    const finder = await collection.findOne({email: email , password: password})
    if (finder) {
        console.log(email + " exist");
        const data = await getUserData(email, password)
        res.send(data);
    } else {
        console.log(email + " no exist");
        res.send("pas ok");
    }
}

app.post('/addChannel', (req, res) => {
    addChannel(req.body.title, res);
});

async function addChannel(title, res) {
    await client.connect();
    const db = client.db('ClusterIRC');
    const collection = db.collection('channels');
    await collection.insertOne({title}).then((data) => {
        res.send(data.insertedId.toString());
    })
}

app.get('/getMessages/:_id', async (req, res) => {
    console.log(`get  all messages`)
    const messages = await getMessages(req.params._id);
    // console.log(messages)
    res.send(messages);
});

async function getMessages(_id) {
    await client.connect();
    const db =  client.db('ClusterIRC');
    const collection = db.collection('messages');
    const cursor = collection.find({roomSelected: _id});
    return cursor.toArray();
}

// IN WORK

app.post('/addChannelInUser', (req, res) => {
    addChannelInUser(req, res);
})

async function addChannelInUser(req, res) {
    uid = req.body.uid;
    rid = req.body.rid;
    var newvalues = { $set: { room: rid } };
    console.log(uid);
    console.log(rid);
    await client.connect();
    const db = client.db('ClusterIRC');
    const collection = db.collection('users');
    await collection.updateOne({ _id: ObjectId(uid) }, newvalues).then(() => {
        console.log(uid);
    })
}

app.get('/getChannels', async (req, res) => {
    console.log(`get  all channel`)
    const channels = await getChannels();
    res.send(channels);
});

app.delete('/deleteChannel/:_id', (req, res) => {
    const myid = req.params._id;
    console.log("delete: " + myid);
    deleteChannel(myid)
    res.send("ok")
})

app.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    addUser(email, password, nickname, res);
})

app.post('/sendMessage', (req, res) => {
    sendMessage(req.body.uid, req.body.message, req.body.roomSelected, req.body.nickname);
    res.send(res)
})

async function sendMessage(uid, message, roomSelected, nickname) {
    await client.connect();
    const db = client.db('ClusterIRC');
    const collection = db.collection('messages');
    if (uid && message && roomSelected) {
        await collection.insertMany([{
            uid: uid,
            message: message,
            roomSelected: roomSelected,
            nickname: nickname,
        }]).then((data) => {
            console.log(data)
        })
    }

}

async function addUser(email, password, nickname, res) {
    const user = { email: email, password: password, nickname: nickname }
    await client.connect();
    const db = client.db('ClusterIRC');
    const collection = db.collection('users');
    console.log(email);

    const finder = await collection.findOne({email: email});
    if (finder) {
        console.log("exist");
        res.send("pas ok")
    } else {
        console.log("not exist"); 
        await collection.insertMany([{
            email: email,
            password: password,
            nickname: nickname,
        }]).then((data) => {
            res.send(data.insertedIds[0].toString());
        })
    }
}

// FUNCTION

async function getUserData(email, password) {
    await client.connect();
    const db =  client.db('ClusterIRC');
    const collection = db.collection('users');
    const cursor = collection.find({email:email, password: password});
    return cursor.toArray();
}

async function  getChannels () {
    await client.connect();
    const db =  client.db('ClusterIRC');
    const collection = db.collection('channels');
    const cursor = collection.find({});
    return cursor.toArray();
}

async function asyncConnexion() {
    await client.connect();
}

async function deleteChannel(_id) {
    await client.connect()
    .then(() => {
      const collection = client.db("ClusterIRC").collection("channels");
      return collection.deleteOne({ _id: new ObjectID(_id) });
    })
    .then(result => {
      console.log(`${result.deletedCount} documents ont été supprimés.`);
      result.send("ok");
    })
    .catch(err => console.error(err));
}

// MAIN

async function main() {
    asyncConnexion();
    return ('Launch server');
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())

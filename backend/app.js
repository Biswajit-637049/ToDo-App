const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const express = require("express");
const dotEnv = require("dotenv");
dotEnv.config();

const PORT = process.env.PORT || 4050;
const conString = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/users", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("ToDo");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});
app.get("/appointments", (req, res) => {
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("ToDo");
        database.collection("appointments").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});
app.get("/appointments/:id", (req, res) => {
    var id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("ToDo");
        database.collection("appointments").findOne({ id: id }).then(document => {
            res.send(document);
            res.end();
        });
    });
});
app.post("/register-user", (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("ToDo");
        database.collection("users").insertOne(user).then(() => {
            console.log('User Registered');
            res.end();
        });
    });
});
app.post("/add-appointment", (req, res) => {
    var appointment = {
        id: parseInt(req.body.id),
        title: req.body.title,
        date: new Date(req.body.date),
        username: req.body.username
    };

    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("ToDo");
        database.collection('appointments').insertOne(appointment).then(() => {
            console.log('Appointment Added');
            res.end();
        });
    });
});
app.put("/edit-appointment/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var appointment = {
        id: parseInt(req.body.id),
        title: req.body.title,
        date: new Date(req.body.date),
        username: req.body.username
    };

    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("ToDo");
        database.collection('appointments').updateOne({ id: id }, { $set: appointment }).then(() => {
            console.log('Appointment updated');
            res.end();
        });
    });
});
app.delete("/delete-appointment/:id", (req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObj => {
        var database = clientObj.db("ToDo");
        database.collection('appointments').deleteOne({ id: id })
            .then(() => {
                console.log('Appointment Deleted');
                res.end();
            });
    });
})
app.listen(PORT);
console.log(`server started http://127.0.0.1:${PORT}`);
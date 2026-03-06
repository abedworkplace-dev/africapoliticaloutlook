const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const app = express()
require("dotenv").config()
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

db.getConnection()
    .then(connection => {
        console.log("Connexion à la base de données réussie !");
        connection.release();
    })
    .catch(err => {
        console.error("Erreur de connexion :", err.message);
    });


app.listen(3006, () => {
    console.log(`Serveur en écoute`);
})


app.get("/token", (req, res) => {
    const token = jwt.sign(
        {},
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.send(token);
});


app.get("/", (req, res) => {
    const sql = "SELECT * FROM admin";
    db.query(sql)
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});

app.get("/inscription", (req, res) => {
    const sql = "SELECT * FROM apo_2026 ORDER BY created_at DESC";
    db.query(sql)
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});

app.get("/presse", (req, res) => {
    const sql = "SELECT * FROM accreditation_presse";
    db.query(sql)
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});

app.get("/newsletter", (req, res) => {
    const sql = "SELECT * FROM newsletter";
    db.query(sql)
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});

app.post("/newPassword", (req, res) => {
    const { mdp, role } = req.body

    const sql = "UPDATE admin SET password=? where role=?"

    db.query(sql, [mdp, role])
        .then(([rows]) => {
            res.send("Mise à jour réussie !");
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});


app.get("/promo", (req, res) => {
    const sql = "SELECT * FROM promo_codes";
    db.query(sql)
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});


app.post("/desac-promo", (req, res) => {
    const { id } = req.body

    const sql = "UPDATE promo_codes SET is_active=? where id=?"

    db.query(sql, [0, id])
        .then(([rows]) => {
            res.send("Mise à jour réussie !");
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});

app.post("/activ-promo", (req, res) => {
    const { id } = req.body

    const sql = "UPDATE promo_codes SET is_active=? where id=?"

    db.query(sql, [1, id])
        .then(([rows]) => {
            res.send("Mise à jour réussie !");
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});


app.post("/insert-promo", (req, res) => {
    const { code, label, value } = req.body

    const sql = "SELECT * FROM promo_codes where code=?"

    db.query(sql, [code])
        .then(([rows]) => {
            if (rows.length > 0) {
                res.send("existant")
            } else {
                const sql1 = "INSERT INTO promo_codes (code,label,value,is_active,created_at) VALUES (?,?,?,?,?)"
                const now = new Date();
                const created_at = now.toISOString().slice(0, 19).replace("T", " ");
                db.query(sql1, [code, label, value, 1, created_at])
                    .then(([rows1]) => {
                        res.send("ajoute")
                    })
                    .catch(err => {
                        console.error("Erreur SQL :", err);
                        res.status(500).send("Erreur serveur");
                    });
            }
        })
        .catch(err => {
            console.error("Erreur SQL :", err);
            res.status(500).send("Erreur serveur");
        });
});
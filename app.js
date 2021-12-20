const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9711Naoya',
    database: 'ch1'
});

app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM talk',
        (error, results) => {
            res.render('index.ejs', {talk: results});
        }
    );
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/create', (req, res) => {
    let sql = 'INSERT INTO talk SET ?';
    let post = {
        username: req.body.itemUsername,
        content: req.body.itemContent
    };
    connection.query(sql, post, (error, results) => {
            connection.query(
                'SELECT * FROM talk',
                (error, results) => {
                    res.redirect('/');
                }
            );
            
        }
        );
});

app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM talk WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.redirect('/');
        }
    );
});

app.get('/edit/:id', (req, res) => {
    connection.query(
        'SELECT*FROM talk WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.render('edit.ejs', {item: results[0]});
        }
    );
});

app.post('/update/:id', (req, res) => {
    let sql = 'UPDATE talk SET ? WHERE id = ?';
    let post = {
        username: req.body.itemUsername,
        content: req.body.itemContent
    };
    connection.query(sql, [post, req.params.id], (error, results) => {
        res.redirect('/');
    });
});

app.listen(3003);
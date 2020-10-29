const express = require('express');
const app = express();
const BlogPost = require('../models/blogPost');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// Create storage engine
const storage = new GridFsStorage({
    url: 'mongodb://localhost/nodedb',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

app.get('/tasks', (req, res) => {
    BlogPost.find()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.post('/task', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const role = req.body.role;
    const team = req.body.team;
    const image = req.body.image;

    const newExercise = new BlogPost({
        name,
        email,
        address,
        role,
        team,
        image
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//app.post('/task', (req, res) => {
//    if (!req.body.firstName) {
//        res.status(400)
//        res.json({
//            error: 'Bad Data'
//        })
//    } else {
//        BlogPost.create(req.body)
//            .then(data => {
//                res.send(data)
//            })
//            .catch(err => {
//                res.json('error: ' + err)
//            })
//    }
//})

app.delete('/task/:id', (req, res) => {
    BlogPost.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.json({ status: 'Task Deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.put('/task/:id', (req, res) => {
    if (!req.body.name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        BlogPost.findOneAndUpdate(
            { _id: req.params.id },
            {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                role: req.body.role,
                team: req.body.team,
                image: req.body.image
            }


        )
            .then(() => {
                res.json({ status: 'Task Updated!' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
})


module.exports = app

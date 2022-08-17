module.exports.releasesController = {
    get: (req, res) => {
        const now = new Date().getTime();
    
        req.app.get('db').query(`select * from releases where release_date > ${now} order by release_date limit 5`).then(response => {
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(200).send(null);
            }
        }).catch(error => {
            console.log('Releases Query Error');
            console.log(error);
        });
    },

    getAll: (req, res) => {
    
        req.app.get('db').query(`select * from releases order by release_date`).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('Releases Query All Error');
            console.log(error);
            res.sendStatus(500);
        });
    },

    post: (req, res) => {

        if (req.isAuthenticated()) {
            req.app.get('db').releases.insert({title: req.body.releaseTitle, release_date: req.body.releaseDate, link: req.body.releaseLink}).then(response => {
                res.sendStatus(200);
            }).catch(postError => {
                console.log('Release Post DB Error');
                console.log(postError);
                res.sendStatus(500);
            })
        }
    },

    delete: (req, res) => {

        if (req.isAuthenticated()) {
            req.app.get('db').query(`delete from releases where id = ${req.params.id}`).then(response => {
                res.sendStatus(200);
            }).catch(deleteError => {
                console.log('Delete Releases Error: ', deleteError);
                res.sendStatus(500);
            });
        }
    },
}
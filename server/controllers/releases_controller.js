module.exports = {
    get: (req, res, next) => {
        const db = app.get('db');
        const now = new Date();

        db.query(`select * from releases where release_date > ${now}`).then(response => {
            if (response >= 1) {
                res.status(200).send(response);
            } else {
                res.status(200).send(null);
            }
        });
    }
}
module.exports = {
    get: (req, res) => {
    
        req.app.get('db').query('select character_name, level, race, class, spec_name, realm, avatar_med, avatar_large, spec_icon, spec_desc, azerite_lvl,	azerite_xp,	azerite_xp_remaining from characters where raider = 1').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('Raider DB Error');
            console.log(error);
            res.status(500).send('Raider DB Call Error');
        })
    },
}
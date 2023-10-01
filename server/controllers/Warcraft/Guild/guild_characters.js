const bnet = require('../../Axios/bnet');

module.exports = (realm, guild) => bnet.get(`/data/wow/guild/${realm}/${guild}/roster?namespace=profile-us&locale=en_US`).then(res => {
    return res.data.members;
}).catch(error => {
    
});
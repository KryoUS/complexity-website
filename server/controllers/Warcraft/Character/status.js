const bnet = require('../../Axios/bnet');

module.exports = (name, realm) => bnet.get(`/profile/wow/character/${realm}/${name}/status?namespace=profile-us&locale=en_US`).then(res => {
    if (res.data.id && res.data.is_valid) {
        return res.data;
    }
}).catch(error => {
    
});
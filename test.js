const axios = require('axios');

let achievementsArr = [];

const findAchievement = (data, id) => {
    for (let i in data) {
        if (i == 'id' && data[i] == id && data['title']) return data
        if (typeof data[i] == 'object' && findAchievement(data[i], id)) return findAchievement(data[i], id);
    }
    return false
};

const achievementInfo = (arr, id) => {
    let objTest = {};
    let loop = true;

    arr.achievements.map((obj) => {
        if (loop == true) {
            let category = '';
            let test = '';
            if (obj.name) category = obj.name;
            test = findAchievement(obj, id);
            if (test != false) {
                test.category = category;
                objTest = test;
                loop = false;
                return objTest
            }
        }
    });
    return objTest
}

//Set Master Achivements Array
const setAchievements = () => {
    axios.get(`https://us.api.blizzard.com/wow/data/character/achievements?locale=en_US&access_token=USo0ikpQTbZItpZkCG7NkeMFe4lScet7RH`).then(response => {
        console.log('Master Achievement List Set!');
        achievementsArr = JSON.parse(JSON.stringify(response.data));

        
        console.log(achievementInfo(achievementsArr, 2056));
        // console.log('96: ', findAchievement(achievementsArr, 96));
        // console.log('2056: ', findAchievement(achievementsArr, 2056));
        // console.log('5215: ', findAchievement(achievementsArr, 5215));

    }).catch(error => {
        console.log('Get Classes Error: ', error);
    });
}

setAchievements();

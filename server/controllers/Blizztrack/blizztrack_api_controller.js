const axios = require('axios');
const forumCategory = require('./wow_forum_cat.json');

let blizztrackWoWPatchNotes = {};
let blizztrackWoWVer = {};
let blizztrackWoWLatestPosts = {};
let blizztrackWoWBluePosts = [];

const classColors = {
    deathKnight: '#c41e3b',
    demonHunter: '#a330c9',
    druid: '#ff7c0a',
    hunter: '#aad372',
    mage: '#68ccef',
    monk: '#00ffba',
    paladin: '#f48cba',
    priest: '#f0ebe0',
    rogue: '#fff468',
    shaman: '#2359ff',
    warlock: '#9382c9',
    warrior: '#c69b6d'
}

module.exports = {

    setWoWPatchNotes: (req, res) => {
        axios.get(`https://blizztrack.com/feeds/world_of_warcraft/notes/json`).then(response => {
            blizztrackWoWPatchNotes = response.data;
            blizztrackWoWPatchNotes.items.forEach(obj => {
                obj.content_html = obj.content_html.replace(new RegExp('<strong>Death Knight</strong>', 'g'), '<strong id="deathKnight">Death Knight</strong>')
                .replace(new RegExp('<strong>Demon Hunter</strong>', 'g'), '<strong id="demonHunter">Demon Hunter</strong>')
                .replace(new RegExp('<strong>Druid</strong>', 'g'), '<strong id="druid">Druid</strong>')
                .replace(new RegExp('<strong>Hunter</strong>', 'g'), '<strong id="hunter">Hunter</strong>')
                .replace(new RegExp('<strong>Mage</strong>', 'g'), '<strong id="mage">Mage</strong>')
                .replace(new RegExp('<strong>Monk</strong>', 'g'), '<strong id="monk">Monk</strong>')
                .replace(new RegExp('<strong>Paladin</strong>', 'g'), '<strong id="paladin">Paladin</strong>')
                .replace(new RegExp('<strong>Priest</strong>', 'g'), '<strong id="priest">Priest</strong>')
                .replace(new RegExp('<strong>Rogue</strong>', 'g'), '<strong id="rogue">Rogue</strong>')
                .replace(new RegExp('<strong>Shaman</strong>', 'g'), '<strong id="shaman">Shaman</strong>')
                .replace(new RegExp('<strong>Warlock</strong>', 'g'), '<strong id="warlock">Warlock</strong>')
                .replace(new RegExp('<strong>Warrior</strong>', 'g'), '<strong id="warrior">Warrior</strong>');
            });
            console.log('Blizztrack WoW Patch Notes set!');
        }).catch(error => {
            console.log('Blizztrack WoW Patch Notes API Error', error);
        });
    },

    getWoWPatchNotes: (req, res) => {
            res.send(blizztrackWoWPatchNotes).status(200);
    },

    setWoWVersion: (req, res) => {
        axios.get(`https://blizztrack.com/api/world_of_warcraft/info/json?mode=vers`).then(response => {
            blizztrackWoWVer = response.data;
            console.log('Blizztrack WoW Version set!');
        }).catch(error => {
            console.log('Blizztrack WoW Version API Error', error);
        });
    },

    getWoWVersion: (req, res) => {
            res.send(blizztrackWoWVer).status(200);
    },

    setWoWLatestPosts: (req, res) => {
        axios.get(`https://blizztrack.com/api/forums/world_of_warcraft/latest_post`).then(response => {
            response.data.Posts.forEach(obj => {
                obj.category = forumCategory[`${obj.category_id}`];
            });
            blizztrackWoWLatestPosts = response.data;
            console.log('Blizztrack WoW Latest Posts set!');
        }).catch(error => {
            console.log('Blizztrack WoW Latest Posts API Error', error);
        });
    },

    getWoWLatestPosts: (req, res) => {
            res.send(blizztrackWoWLatestPosts).status(200);
    },

    setWoWBluePosts: (req, res) => {
        axios.get(`https://blizztrack.com/api/forums/world_of_Warcraft/latest_post/blue`).then(response => {
            response.data.forEach(obj => {
                obj.category = forumCategory[`${obj.category_id}`];
            });
            blizztrackWoWBluePosts = response.data;
            console.log('Blizztrack WoW Blue Posts set!');
        }).catch(error => {
            console.log('Blizztrack WoW Blue Posts API Error', error);
        });
    },

    getWoWBluePosts: (req, res) => {
            res.send(blizztrackWoWBluePosts).status(200);
    },

}
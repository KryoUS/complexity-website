const axios = require('axios');
const forumCategory = require('./wow_forum_cat.json');

let blizztrackWoWPatchNotes = {};
let blizztrackWoWVer = {};
let blizztrackWoWLatestPosts = {};
let blizztrackWoWBluePosts = [];

module.exports = {

    setWoWPatchNotes: (req, res) => {
        axios.get(`https://blizztrack.com/feeds/world_of_warcraft/notes/json`).then(response => {
            blizztrackWoWPatchNotes = response.data;
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
const axios = require('axios');

module.exports = {
    characters: (req, res, next) => {

        req.app.get('db').query(`select level, character_name, realm, stat_exhaulted_reps, stat_need_rolls, stat_greed_rolls, stat_mounts, stat_epics from characters order by stat_exhaulted_reps desc;`).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB Character Stats Error');
            console.log(error);
            res.status(500).send('DB Characters Stats Error');
        });
    },

    consumables: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_health_pots, stat_mana_pots, stat_elixirs, stat_flasks, stat_drinks, stat_foods, stat_healthstones from characters order by stat_health_pots desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB Consumable Stats Error');
            console.log(error);
            res.status(500).send('DB Consumable Stats Error');
        })
    },

    combat: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_damage_done, stat_damage_received, stat_healing_done, stat_healing_received, stat_highest_endless_dmg, stat_highest_endless_tank, stat_highest_endless_heals, stat_rebirths, stat_raised, stat_soulstones from characters order by stat_damage_done desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB Combat Stats Error');
            console.log(error);
            res.status(500).send('DB Combat Stats Error');
        })
    },

    kills: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_total_kills, stat_creature_kills, stat_critter_kills, stat_honor_kills, stat_world_honor_kills, stat_arena_kills, stat_2v2_kills, stat_3v3_kills, stat_5v5_kills, stat_bg_kills from characters order by stat_total_kills desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB kills Stats Error');
            console.log(error);
            res.status(500).send('DB kills Stats Error');
        })
    },

    deaths: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_total_deaths, stat_2v2_deaths, stat_3v3_deaths, stat_5v5_deaths, stat_av_drek_deaths, stat_av_vann_deaths, stat_normal_dungeon_deaths, stat_heroic_dungeon_deaths, stat_raid_deaths, stat_drowning_deaths, stat_hogger_deaths, stat_fatigue_deaths, stat_falling_deaths, stat_fire_or_lava_deaths from characters order by stat_total_deaths desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB deaths Stats Error');
            console.log(error);
            res.status(500).send('DB deaths Stats Error');
        })
    },

    pve: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_quest_completed, stat_quest_dailies, stat_quest_abandoned, stat_cata_dungeons_completed, stat_panda_dungeons_completed, stat_wod_dungeons_completed, stat_legion_dungeons_completed, stat_challenge_modes_completed, stat_cata_raids_completed, stat_panda_raids_completed, stat_wod_raids_completed, stat_legion_raids_completed from characters order by stat_quest_completed desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB pve Stats Error');
            console.log(error);
            res.status(500).send('DB pve Stats Error');
        })
    },

    professions: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_prof_learned, stat_prof_maxed, stat_secondary_prof_maxed, stat_cooking_recipes, stat_fish_caught, stat_alch_recipes, stat_blacksmith_plans, stat_enchants, stat_disenchants, stat_engi_schematics, stat_inscriptions, stat_jewel_designs, stat_leather_patterns, stat_smelting_recipes, stat_tailor_patterns from characters order by stat_prof_learned desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB professions Stats Error');
            console.log(error);
            res.status(500).send('DB professions Stats Error');
        })
    },

    travel: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_flight_paths, stat_summons, stat_mage_portals, stat_hearthstones from characters order by stat_flight_paths desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB travel Stats Error');
            console.log(error);
            res.status(500).send('DB travel Stats Error');
        })
    },

    emotes: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_hugs, stat_facepalms, stat_small_viollins, stat_lols, stat_cheers, stat_waves from characters order by stat_hugs desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB emotes Stats Error');
            console.log(error);
            res.status(500).send('DB emotes Stats Error');
        })
    },

    pvp: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_pvp_deaths, stat_horde_deaths, stat_duels_won, stat_duels_lost, stat_bgs_played, stat_bgs_won, stat_bg_kbs, stat_rbgs_played, stat_rbgs_won from characters order by stat_pvp_deaths desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB pvp Stats Error');
            console.log(error);
            res.status(500).send('DB pvp Stats Error');
        })
    },

    arena: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_arenas_played, stat_arenas_won, stat_arena_kbs, stat_5v5_matches, stat_5v5_won, stat_5v5_highest_personal, stat_5v5_highest_team, stat_5v5_kbs, stat_3v3_matches, stat_3v3_won, stat_3v3_highest_personal, stat_3v3_highest_team, stat_3v3_kbs, stat_2v2_matches, stat_2v2_won, stat_2v2_highest_personal, stat_2v2_highest_team, stat_2v2_kbs from characters order by stat_arenas_played desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB arena Stats Error');
            console.log(error);
            res.status(500).send('DB arena Stats Error');
        })
    },

    pets: (req, res, next) => {

        req.app.get('db').query('select level, character_name, realm, stat_pets, stat_pet_battles_won, stat_pvp_pet_battles_won, stat_pvp_fullteam_pet_battles_won, stat_pet_celestial_tour_won from characters order by stat_pets desc').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB pets Stats Error');
            console.log(error);
            res.status(500).send('DB pets Stats Error');
        })
    },

    members: (req, res) => {
    
        req.app.get('db').query('select character_name, rank, level, average_ilvl, average_equipped_ilvl, azerite_lvl, race, spec_name, class, realm from characters where rank <= 5 order by rank, character_name').then(response => {
            //These calls need to be done on the server and be available as a variable, not done at the member call.
            axios.get(`https://us.api.blizzard.com/wow/data/character/races?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(races => {
                axios.get(`https://us.api.blizzard.com/wow/data/character/classes?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(classes => {
                    response.map((char, index) => {
                        let raceIndex = races.data.races.map((e) => {return e.id}).indexOf(char.race);
                        let classIndex = classes.data.classes.map((e) => {return e.id}).indexOf(char.class);
                        response[index].race = races.data.races[raceIndex].name;
                        response[index].class = classes.data.classes[classIndex].name;
                        if (response[index].rank === 0) {response[index].rank = 'Guild Master'};
                        if (response[index].rank === 1) {response[index].rank = 'Co-Guild Master'};
                        if (response[index].rank === 2) {response[index].rank = 'Raid Officer'};
                        if (response[index].rank === 3) {response[index].rank = 'Raider'};
                        if (response[index].rank === 4) {response[index].rank = 'Raider Alt'};
                        if (response[index].rank === 5) {response[index].rank = 'Member'};
                    });
                    res.status(200).send(response);
                }).catch(classError => {
                    console.log('API Class Call Error');
                    console.log(classError);
                    res.status(500).send('API Class Call Error');
                })
            }).catch(raceError => {
                console.log('API Race Call Error');
                console.log(raceError);
                res.status(500).send('API Race Call Error');
            })
        }).catch(error => {
            console.log('Member DB Call Error')
            console.log(error);
            res.status(500).send('Member DB Call Error');
        })
    },
}
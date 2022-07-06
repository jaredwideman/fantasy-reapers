const statsSheet = require('./batting_stats.json');
const statsSheetExtra = require('./batting_stats_extra.json');
const statsSheetFielding = require('./fielding_stats.json');
const statsSheetPitching = require('./pitching_stats.json');
const statsSheetPitchingExtra = require('./pitching_stats_extra.json');
const player_info = require('./player_info.json');

export function getPlayerBattingTotal(name) {
    let total = 0;
    [{
        'stat': 'R',
        'multiplier': 1,
        'sheet': statsSheet
    }, {
        'stat': 'H',
        'multiplier': 0.5,
        'sheet': statsSheet
    }, {
        'stat': '1B',
        'multiplier': 1,
        'sheet': statsSheet
    }, {
        'stat': '2B',
        'multiplier': 2,
        'sheet': statsSheet
    }, {
        'stat': '3B',
        'multiplier': 3,
        'sheet': statsSheet
    }, {
        'stat': 'HR',
        'multiplier': 4,
        'sheet': statsSheet
    }, {
        'stat': 'RBI',
        'multiplier': 1,
        'sheet': statsSheet
    }, {
        'stat': 'SB',
        'multiplier': 2,
        'sheet': statsSheetExtra
    }, {
        'stat': 'CS',
        'multiplier': -2,
        'sheet': statsSheetExtra
    }, {
        'stat': 'SO',
        'multiplier': -1,
        'sheet': statsSheet
    }, {
        'stat': 'BB',
        'multiplier': 0.5,
        'sheet': statsSheet
    }, {
        'stat': 'HBP',
        'multiplier': 0.5,
        'sheet': statsSheet
    }, {
        'stat': 'E',
        'multiplier': -1,
        'sheet': statsSheetFielding
    }, {
        'stat': 'PIK',
        'multiplier': -2,
        'sheet': statsSheetExtra
    }].forEach(stat_obj => {
        total += Number(getStat(name, stat_obj.stat, stat_obj.sheet)) * stat_obj.multiplier;
    });
    return total; 
}

export function getPlayerPitchingTotal(name) {
    let total = 0;
    [{
        'stat': 'W',
        'multiplier': 5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'L',
        'multiplier': 4,
        'sheet': statsSheetPitching
    }, {
        'stat': 'SV',
        'multiplier': 7,
        'sheet': statsSheetPitching
    }, {
        'stat': 'BS',
        'multiplier': -7,
        'sheet': statsSheetPitching
    }, {
        'stat': 'H',
        'multiplier': -0.5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'SO',
        'multiplier': 1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'BB',
        'multiplier': -1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'HBP',
        'multiplier': -1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'ER',
        'multiplier': -1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'outs',
        'multiplier': 0.5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'PIK',
        'multiplier': 2,
        'sheet': statsSheetPitchingExtra
    }].forEach(stat_obj => {
        total += Number(getStat(name, stat_obj.stat, stat_obj.sheet)) * stat_obj.multiplier;
    });
    return total; 
}

export function getAllOtherRelieversTotal() {
    const mains = getPlayerPitchingTotal('Lavigne') + getPlayerPitchingTotal('Ellingham') + getPlayerPitchingTotal('Avery') + getPlayerPitchingTotal('Dominic Murray') + getPlayerPitchingTotal('Jerome Murray') + getPlayerPitchingTotal('Todd') + getPlayerPitchingTotal('Frobel');

    let total = 0;
    [{
        'stat': 'W',
        'multiplier': 5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'L',
        'multiplier': 4,
        'sheet': statsSheetPitching
    }, {
        'stat': 'SV',
        'multiplier': 7,
        'sheet': statsSheetPitching
    }, {
        'stat': 'BS',
        'multiplier': -7,
        'sheet': statsSheetPitching
    }, {
        'stat': 'H',
        'multiplier': -0.5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'SO',
        'multiplier': 1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'BB',
        'multiplier': -1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'HBP',
        'multiplier': -1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'ER',
        'multiplier': -1,
        'sheet': statsSheetPitching
    }, {
        'stat': 'outs',
        'multiplier': 0.5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'PIK',
        'multiplier': 2,
        'sheet': statsSheetPitchingExtra
    }].forEach(stat_obj => {
        total += Number(getStatTotal(stat_obj.stat, stat_obj.sheet)) * stat_obj.multiplier;
    });
    return total - mains; 
}

getAllOtherRelieversTotal(); // delete

export function getFantasyOwnerBattingTotals(owner_name) {
    const owners_batters = player_info.players.filter(player => {
        return player.batting_owners.includes(owner_name);
    });

    const ret = [];

    owners_batters.forEach(batter => {
        ret.push({'name': batter.name, 'points': getPlayerBattingTotal(batter.name)});
    });

    return ret;
}

export function getFantasyOwnerPitchingTotals(owner_name) {
    const owners_pitchers = player_info.players.filter(player => {
        return player.pitching_owners.includes(owner_name);
    });

    const ret = [];

    owners_pitchers.forEach(batter => {
        ret.push({'name': batter.name, 'points': getPlayerPitchingTotal(batter.name)});
    });

    return ret;
}

export function getStat(playerName, identifier, sheet=statsSheet) {
    return sheet.players[sheet.players.findIndex(player => player.row_info.player_name.includes(playerName))]?.stats[
        sheet.players[sheet.players.findIndex(player => player.row_info.player_name.includes(playerName))].stats.findIndex(stat => stat.identifier.key === identifier)
    ]?.value
}

function getStatTotal(identifier, sheet=statsSheet) {
    return sheet.totals[0]?.stats[sheet.totals[0].stats.findIndex(stat => stat.identifier.key === identifier)]?.value
}
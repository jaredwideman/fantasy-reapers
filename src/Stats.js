const statsSheet = {'base': require('./statistics/batting_stats.json'), 'before': require('./statistics/batting_stats_less_one.json')};
const statsSheetExtra = {'base': require('./statistics/batting_stats_extra.json'), 'before': require('./statistics/batting_stats_extra_less_one.json')};
const statsSheetFielding = {'base': require('./statistics/fielding_stats.json'), 'before': require('./statistics/fielding_stats_less_one.json')};
const statsSheetPitching = {'base': require('./statistics/pitching_stats.json'), 'before': require('./statistics/pitching_stats_less_one.json')};
const statsSheetPitchingExtra = {'base': require('./statistics/pitching_stats_extra.json'), 'before': require('./statistics/pitching_stats_extra_less_one.json')};
const player_info = require('./statistics/player_info.json');


function getPlayerBattingTotal(name, type='base') {
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
        'multiplier': -0.5,
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
        total += Number(getStat(name, stat_obj.stat, stat_obj.sheet, type)) * stat_obj.multiplier;
    });
    return total; 
}

function getPlayerPitchingTotal(name, type='base') {
    let total = 0;
    [{
        'stat': 'W',
        'multiplier': 5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'L',
        'multiplier': -4,
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
        total += Number(getStat(name, stat_obj.stat, stat_obj.sheet, type)) * stat_obj.multiplier;
    });
    return total; 
}

export function getAllOtherRelieversTotal(type='base') {
    const mains = getPlayerPitchingTotal('Lavigne', type) + getPlayerPitchingTotal('Ellingham', type) + getPlayerPitchingTotal('Avery', type) + getPlayerPitchingTotal('Dominic Murray', type) + getPlayerPitchingTotal('Jerome Murray', type) + getPlayerPitchingTotal('Todd', type) + getPlayerPitchingTotal('Frobel', type);

    let total = 0;
    [{
        'stat': 'W',
        'multiplier': 5,
        'sheet': statsSheetPitching
    }, {
        'stat': 'L',
        'multiplier': -4,
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
        total += Number(getStatTotal(null, stat_obj.stat, stat_obj.sheet, type)) * stat_obj.multiplier;
    });
    return total - mains; 
}

export function getFantasyOwnerBattingTotals(owner_name, type='base') {
    const owners_batters = player_info.players.filter(player => {
        return player.batting_owners.includes(owner_name);
    });

    const ret = [];

    owners_batters.forEach(batter => {
        ret.push({'name': batter.name, 'points': getPlayerBattingTotal(batter.name, type)});
    });

    return ret;
}

export function getFantasyOwnerPitchingTotals(owner_name, type='base') {
    const owners_pitchers = player_info.players.filter(player => {
        return player.pitching_owners.includes(owner_name);
    });

    const ret = [];

    owners_pitchers.forEach(batter => {
        ret.push({'name': batter.name, 'points': getPlayerPitchingTotal(batter.name, type)});
    });

    return ret;
}

export function getStat(playerName, identifier, sheet=statsSheet, type='base') {
    return sheet[type].players[sheet[type].players.findIndex(player => player.row_info.player_name.includes(playerName))]?.stats[
        sheet[type].players[sheet[type].players.findIndex(player => player.row_info.player_name.includes(playerName))].stats.findIndex(stat => stat.identifier.key === identifier)
    ]?.value
}

export function getStatTotal(playerName, identifier, sheet=statsSheet, type='base') {
    return sheet[type].totals[0]?.stats[sheet[type].totals[0].stats.findIndex(stat => stat.identifier.key === identifier)]?.value
} 
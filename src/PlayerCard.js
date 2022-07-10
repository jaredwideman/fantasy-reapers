import {
  Box,
  Badge,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react';

import { getStat, getStatTotal } from './Stats'; 

const statsSheet = {'base': require('./statistics/batting_stats.json'), 'before': require('./statistics/batting_stats_less_one.json')};
const statsSheetExtra = {'base': require('./statistics/batting_stats_extra.json'), 'before': require('./statistics/batting_stats_extra_less_one.json')};
const statsSheetFielding = {'base': require('./statistics/fielding_stats.json'), 'before': require('./statistics/fielding_stats_less_one.json')};
const statsSheetPitching = {'base': require('./statistics/pitching_stats.json'), 'before': require('./statistics/pitching_stats_less_one.json')};
const statsSheetPitchingExtra = {'base': require('./statistics/pitching_stats_extra.json'), 'before': require('./statistics/pitching_stats_extra_less_one.json')};

function PlayerCard(props) {
    let getStatFunction = getStat;
    const allOtherRelievers = props.name === "(All Other Pitchers)";
    if (allOtherRelievers) {
      getStatFunction = getStatTotal;
    }
    // Batting Stats
    const runs = getStatFunction(props.name, 'R');
    const runs_diff = isNaN(getStatFunction(props.name, 'R', statsSheet, 'before')) ? runs : runs - getStatFunction(props.name, 'R', statsSheet, 'before')
    const hits = getStatFunction(props.name, 'H');
    const hits_diff = isNaN(getStatFunction(props.name, 'H', statsSheet, 'before')) ? hits : hits - getStatFunction(props.name, 'H', statsSheet, 'before')
    const singles = getStatFunction(props.name, '1B');
    const singles_diff = isNaN(getStatFunction(props.name, '1B', statsSheet, 'before')) ? singles : singles - getStatFunction(props.name, '1B', statsSheet, 'before')
    const doubles = getStatFunction(props.name, '2B');
    const doubles_diff = isNaN(getStatFunction(props.name, '2B', statsSheet, 'before')) ? doubles : doubles - getStatFunction(props.name, '2B', statsSheet, 'before')
    const triples = getStatFunction(props.name, '3B');
    const triples_diff = isNaN(getStatFunction(props.name, '3B', statsSheet, 'before')) ? triples : triples - getStatFunction(props.name, '3B', statsSheet, 'before')
    const homers = getStatFunction(props.name, 'HR');
    const homers_diff = isNaN(getStatFunction(props.name, 'HR', statsSheet, 'before')) ? homers : homers - getStatFunction(props.name, 'HR', statsSheet, 'before')
    const rbis = getStatFunction(props.name, 'RBI');
    const rbis_diff = isNaN(getStatFunction(props.name, 'RBI', statsSheet, 'before')) ? rbis : rbis - getStatFunction(props.name, 'RBI', statsSheet, 'before')
    const sb = getStatFunction(props.name, 'SB', statsSheetExtra);
    const sb_diff = isNaN(getStatFunction(props.name, 'SB', statsSheetExtra, 'before')) ? sb : sb - getStatFunction(props.name, 'SB', statsSheetExtra, 'before')
    const cs = getStatFunction(props.name, 'CS', statsSheetExtra);
    const cs_diff = isNaN(getStatFunction(props.name, 'CS', statsSheetExtra, 'before')) ? cs : cs - getStatFunction(props.name, 'CS', statsSheetExtra, 'before')
    const strikeouts = getStatFunction(props.name, 'SO');
    const strikeouts_diff = isNaN(getStatFunction(props.name, 'SO', statsSheet, 'before')) ? strikeouts : strikeouts - getStatFunction(props.name, 'SO', statsSheet, 'before')
    const walks = getStatFunction(props.name, 'BB');
    const walks_diff = isNaN(getStatFunction(props.name, 'BB', statsSheet, 'before')) ? walks : walks - getStatFunction(props.name, 'BB', statsSheet, 'before')
    const hbp = getStatFunction(props.name, 'HBP');
    const hbp_diff = isNaN(getStatFunction(props.name, 'HBP', statsSheet, 'before')) ? hbp : hbp - getStatFunction(props.name, 'HBP', statsSheet, 'before')
    const error = getStatFunction(props.name, 'E', statsSheetFielding);
    const error_diff = isNaN(getStatFunction(props.name, 'E', statsSheetFielding, 'before')) ? error : error - getStatFunction(props.name, 'E', statsSheetFielding, 'before')
    const PIK = getStatFunction(props.name, 'PIK', statsSheetExtra);
    const PIK_diff = isNaN(getStatFunction(props.name, 'PIK', statsSheetExtra, 'before')) ? PIK : PIK - getStatFunction(props.name, 'PIK', statsSheetExtra, 'before')
    const total_batting = Number(runs) + Number(hits) * 0.5 + Number(singles) + Number(doubles) * 2 + Number(triples) * 3 + Number(homers) * 4 + Number(rbis) + Number(sb) * 2 + Number(cs) * -2 + Number(strikeouts) * -0.5 + Number(walks) * 0.5 + Number(hbp) * 0.5 + Number(PIK) * -2 + Number(error) * -1;
    const total_batting_diff = runs_diff + hits_diff * 0.5 + singles_diff + doubles_diff * 2 + triples_diff * 3 + homers_diff * 4 + rbis_diff + sb_diff * 2 + cs_diff * -2 + strikeouts_diff * -0.5 + walks_diff * 0.5 + hbp_diff * 0.5 + PIK_diff * -2 + error_diff * -1;

    // Pitching Stats
    let wins = getStatFunction(props.name, 'W', statsSheetPitching);
    let losses = getStatFunction(props.name, 'L', statsSheetPitching);
    let saves = getStatFunction(props.name, 'SV', statsSheetPitching);
    let blown_saves = getStatFunction(props.name, 'BS', statsSheetPitching);
    let hits_pitcher = getStatFunction(props.name, 'H', statsSheetPitching);
    let strikeouts_pitcher = getStatFunction(props.name, 'SO', statsSheetPitching);
    let walks_pitcher = getStatFunction(props.name, 'BB', statsSheetPitching);
    let hbp_pitcher = getStatFunction(props.name, 'HBP', statsSheetPitching);
    let earned_runs = getStatFunction(props.name, 'ER', statsSheetPitching);
    let outs = getStatFunction(props.name, 'outs', statsSheetPitching);
    let PIK_pitcher = getStatFunction(props.name, 'PIK', statsSheetPitchingExtra);
    let no_hitters = 0; // not tracked by gamechanger...

    let wins_before = getStatFunction(props.name, 'W', statsSheetPitching, 'before')
    let losses_before = getStatFunction(props.name, 'L', statsSheetPitching, 'before')
    let saves_before =  getStatFunction(props.name, 'SV', statsSheetPitching, 'before')
    let blown_saves_before = getStatFunction(props.name, 'BS', statsSheetPitching, 'before')
    let hits_pitcher_before = getStatFunction(props.name, 'H', statsSheetPitching, 'before')
    let strikeouts_pitcher_before = getStatFunction(props.name, 'SO', statsSheetPitching, 'before')
    let walks_pitcher_before = getStatFunction(props.name, 'BB', statsSheetPitching, 'before')
    let hbp_pitcher_before = getStatFunction(props.name, 'HBP', statsSheetPitching, 'before')
    let earned_runs_before = getStatFunction(props.name, 'ER', statsSheetPitching, 'before')
    let outs_before = getStatFunction(props.name, 'outs', statsSheetPitching, 'before')
    let PIK_pitcher_before = getStatFunction(props.name, 'PIK', statsSheetPitchingExtra, 'before')

    if (allOtherRelievers) {
      wins -= (Number(getStat('Lavigne', 'W', statsSheetPitching)) + Number(getStat('Ellingham', 'W', statsSheetPitching)) + Number(getStat('Avery', 'W', statsSheetPitching)) + Number(getStat('Dominic Murray', 'W', statsSheetPitching)) + Number(getStat('Jerome Murray', 'W', statsSheetPitching)) + Number(getStat('Todd', 'W', statsSheetPitching)) + Number(getStat('Frobel', 'W', statsSheetPitching)));

      losses -= (Number(getStat('Lavigne', 'L', statsSheetPitching)) + Number(getStat('Ellingham', 'L', statsSheetPitching)) + Number(getStat('Avery', 'L', statsSheetPitching)) + Number(getStat('Dominic Murray', 'L', statsSheetPitching)) + Number(getStat('Jerome Murray', 'L', statsSheetPitching)) + Number(getStat('Todd', 'L', statsSheetPitching)) + Number(getStat('Frobel', 'L', statsSheetPitching)));

      saves -= (Number(getStat('Lavigne', 'SV', statsSheetPitching)) + Number(getStat('Ellingham', 'SV', statsSheetPitching)) + Number(getStat('Avery', 'SV', statsSheetPitching)) + Number(getStat('Dominic Murray', 'SV', statsSheetPitching)) + Number(getStat('Jerome Murray', 'SV', statsSheetPitching)) + Number(getStat('Todd', 'SV', statsSheetPitching)) + Number(getStat('Frobel', 'SV', statsSheetPitching)));

      blown_saves -= (Number(getStat('Lavigne', 'BS', statsSheetPitching)) + Number(getStat('Ellingham', 'BS', statsSheetPitching)) + Number(getStat('Avery', 'BS', statsSheetPitching)) + Number(getStat('Dominic Murray', 'BS', statsSheetPitching)) + Number(getStat('Jerome Murray', 'BS', statsSheetPitching)) + Number(getStat('Todd', 'BS', statsSheetPitching)) + Number(getStat('Frobel', 'BS', statsSheetPitching)));

      hits_pitcher -= (Number(getStat('Lavigne', 'H', statsSheetPitching)) + Number(getStat('Ellingham', 'H', statsSheetPitching)) + Number(getStat('Avery', 'H', statsSheetPitching)) + Number(getStat('Dominic Murray', 'H', statsSheetPitching)) + Number(getStat('Jerome Murray', 'H', statsSheetPitching)) + Number(getStat('Todd', 'H', statsSheetPitching)) + Number(getStat('Frobel', 'H', statsSheetPitching)));

      strikeouts_pitcher -= (Number(getStat('Lavigne', 'SO', statsSheetPitching)) + Number(getStat('Ellingham', 'SO', statsSheetPitching)) + Number(getStat('Avery', 'SO', statsSheetPitching)) + Number(getStat('Dominic Murray', 'SO', statsSheetPitching)) + Number(getStat('Jerome Murray', 'SO', statsSheetPitching)) + Number(getStat('Todd', 'SO', statsSheetPitching)) + Number(getStat('Frobel', 'SO', statsSheetPitching)));

      walks_pitcher -= (Number(getStat('Lavigne', 'BB', statsSheetPitching)) + Number(getStat('Ellingham', 'BB', statsSheetPitching)) + Number(getStat('Avery', 'BB', statsSheetPitching)) + Number(getStat('Dominic Murray', 'BB', statsSheetPitching)) + Number(getStat('Jerome Murray', 'BB', statsSheetPitching)) + Number(getStat('Todd', 'BB', statsSheetPitching)) + Number(getStat('Frobel', 'BB', statsSheetPitching)));

      hbp_pitcher -= (Number(getStat('Lavigne', 'HBP', statsSheetPitching)) + Number(getStat('Ellingham', 'HBP', statsSheetPitching)) + Number(getStat('Avery', 'HBP', statsSheetPitching)) + Number(getStat('Dominic Murray', 'HBP', statsSheetPitching)) + Number(getStat('Jerome Murray', 'HBP', statsSheetPitching)) + Number(getStat('Todd', 'HBP', statsSheetPitching)) + Number(getStat('Frobel', 'HBP', statsSheetPitching)));

      earned_runs -= (Number(getStat('Lavigne', 'ER', statsSheetPitching)) + Number(getStat('Ellingham', 'ER', statsSheetPitching)) + Number(getStat('Avery', 'ER', statsSheetPitching)) + Number(getStat('Dominic Murray', 'ER', statsSheetPitching)) + Number(getStat('Jerome Murray', 'ER', statsSheetPitching)) + Number(getStat('Todd', 'ER', statsSheetPitching)) + Number(getStat('Frobel', 'ER', statsSheetPitching)));

      outs -= (Number(getStat('Lavigne', 'outs', statsSheetPitching)) + Number(getStat('Ellingham', 'outs', statsSheetPitching)) + Number(getStat('Avery', 'outs', statsSheetPitching)) + Number(getStat('Dominic Murray', 'outs', statsSheetPitching)) + Number(getStat('Jerome Murray', 'outs', statsSheetPitching)) + Number(getStat('Todd', 'outs', statsSheetPitching)) + Number(getStat('Frobel', 'outs', statsSheetPitching)));

      PIK_pitcher -= (Number(getStat('Lavigne', 'PIK', statsSheetPitchingExtra)) + Number(getStat('Ellingham', 'PIK', statsSheetPitchingExtra)) + Number(getStat('Avery', 'PIK', statsSheetPitchingExtra)) + Number(getStat('Dominic Murray', 'PIK', statsSheetPitchingExtra)) + Number(getStat('Jerome Murray', 'PIK', statsSheetPitchingExtra)) + Number(getStat('Todd', 'PIK', statsSheetPitchingExtra)) + Number(getStat('Frobel', 'PIK', statsSheetPitchingExtra)));

      wins_before -= (Number(getStat('Lavigne', 'W', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'W', statsSheetPitching, 'before')) + Number(getStat('Avery', 'W', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'W', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'W', statsSheetPitching, 'before')) + Number(getStat('Todd', 'W', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'W', statsSheetPitching, 'before')));

      losses_before -= (Number(getStat('Lavigne', 'L', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'L', statsSheetPitching, 'before')) + Number(getStat('Avery', 'L', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'L', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'L', statsSheetPitching, 'before')) + Number(getStat('Todd', 'L', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'L', statsSheetPitching, 'before')));

      saves_before -= (Number(getStat('Lavigne', 'SV', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'SV', statsSheetPitching, 'before')) + Number(getStat('Avery', 'SV', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'SV', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'SV', statsSheetPitching, 'before')) + Number(getStat('Todd', 'SV', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'SV', statsSheetPitching, 'before')));

      blown_saves_before -= (Number(getStat('Lavigne', 'BS', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'BS', statsSheetPitching, 'before')) + Number(getStat('Avery', 'BS', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'BS', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'BS', statsSheetPitching, 'before')) + Number(getStat('Todd', 'BS', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'BS', statsSheetPitching, 'before')));

      hits_pitcher_before -= (Number(getStat('Lavigne', 'H', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'H', statsSheetPitching, 'before')) + Number(getStat('Avery', 'H', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'H', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'H', statsSheetPitching, 'before')) + Number(getStat('Todd', 'H', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'H', statsSheetPitching, 'before')));

      strikeouts_pitcher_before -= (Number(getStat('Lavigne', 'SO', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'SO', statsSheetPitching, 'before')) + Number(getStat('Avery', 'SO', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'SO', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'SO', statsSheetPitching, 'before')) + Number(getStat('Todd', 'SO', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'SO', statsSheetPitching, 'before')));

      walks_pitcher_before -= (Number(getStat('Lavigne', 'BB', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'BB', statsSheetPitching, 'before')) + Number(getStat('Avery', 'BB', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'BB', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'BB', statsSheetPitching, 'before')) + Number(getStat('Todd', 'BB', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'BB', statsSheetPitching, 'before')));

      hbp_pitcher_before -= (Number(getStat('Lavigne', 'HBP', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'HBP', statsSheetPitching, 'before')) + Number(getStat('Avery', 'HBP', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'HBP', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'HBP', statsSheetPitching, 'before')) + Number(getStat('Todd', 'HBP', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'HBP', statsSheetPitching, 'before')));

      earned_runs_before -= (Number(getStat('Lavigne', 'ER', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'ER', statsSheetPitching, 'before')) + Number(getStat('Avery', 'ER', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'ER', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'ER', statsSheetPitching, 'before')) + Number(getStat('Todd', 'ER', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'ER', statsSheetPitching, 'before')));

      outs_before -= (Number(getStat('Lavigne', 'outs', statsSheetPitching, 'before')) + Number(getStat('Ellingham', 'outs', statsSheetPitching, 'before')) + Number(getStat('Avery', 'outs', statsSheetPitching, 'before')) + Number(getStat('Dominic Murray', 'outs', statsSheetPitching, 'before')) + Number(getStat('Jerome Murray', 'outs', statsSheetPitching, 'before')) + Number(getStat('Todd', 'outs', statsSheetPitching, 'before')) + Number(getStat('Frobel', 'outs', statsSheetPitching, 'before')));

      PIK_pitcher_before -= (Number(getStat('Lavigne', 'PIK', statsSheetPitchingExtra, 'before')) + Number(getStat('Ellingham', 'PIK', statsSheetPitchingExtra, 'before')) + Number(getStat('Avery', 'PIK', statsSheetPitchingExtra, 'before')) + Number(getStat('Dominic Murray', 'PIK', statsSheetPitchingExtra, 'before')) + Number(getStat('Jerome Murray', 'PIK', statsSheetPitchingExtra, 'before')) + Number(getStat('Todd', 'PIK', statsSheetPitchingExtra, 'before')) + Number(getStat('Frobel', 'PIK', statsSheetPitchingExtra, 'before')));
    }

    let wins_diff = isNaN(wins - wins_before) ? wins : wins - wins_before;
    let losses_diff = isNaN(losses - losses_before) ? losses : losses - losses_before;
    let saves_diff = isNaN(saves - saves_before) ? saves : saves - saves_before;
    let blown_saves_diff = isNaN(blown_saves - blown_saves_before) ? blown_saves : blown_saves - blown_saves_before;
    let hits_pitcher_diff = isNaN(hits_pitcher - hits_pitcher_before) ? hits_pitcher : hits_pitcher - hits_pitcher_before;
    let strikeouts_pitcher_diff = isNaN(strikeouts_pitcher - strikeouts_pitcher_before) ? strikeouts_pitcher : strikeouts_pitcher - strikeouts_pitcher_before;
    let walks_pitcher_diff = isNaN(walks_pitcher - walks_pitcher_before) ? walks_pitcher : walks_pitcher - walks_pitcher_before;
    let hbp_pitcher_diff = isNaN(hbp_pitcher - hbp_pitcher_before) ? hbp_pitcher : hbp_pitcher - hbp_pitcher_before;
    let earned_runs_diff = isNaN(earned_runs - earned_runs_before) ? earned_runs : earned_runs - earned_runs_before;
    let outs_diff = isNaN(outs - outs_before) ? outs : outs - outs_before;
    let PIK_pitcher_diff = isNaN(PIK_pitcher - PIK_pitcher_before) ? PIK_pitcher : PIK_pitcher - PIK_pitcher_before;
    let no_hitters_diff = 0; // not tracked by gamechanger...

    let total_pitching_diff = wins_diff*5+losses_diff*4+saves_diff*7+blown_saves_diff*-7+hits_pitcher_diff*-0.5+strikeouts_pitcher_diff*1+walks_pitcher_diff*-1+hbp_pitcher_diff*-1+earned_runs_diff*-1+outs_diff*0.5+PIK_pitcher_diff*2;

    const total_pitching = Number(wins)*5 + Number(losses)*4 + Number(saves)*7 + Number(blown_saves)*-7 + Number(hits_pitcher)*-0.5 + Number(strikeouts_pitcher) + Number(walks_pitcher)*-1 + Number(hbp_pitcher)*-1 + Number(earned_runs)*-1 + Number(outs)*0.5 + Number(PIK_pitcher)*2 + Number(no_hitters)*5;
    
    const isBatter = Boolean(props.positions.match(/1B|2B|3B|SS|OF|C|DH|Util/g));
    const isPitcher = Boolean(props.positions.match(/[P]/g));
    const isPitcherPrimarily = props.primarilyPitcher ?? false;

    const battingStatsDisplay = (<TableContainer>
      <Table size='sm' variant='simple'>
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Total</Th>
            <Th>Chg</Th>
            <Th>Fantasy Pts</Th>
            <Th>Chg</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>R (1)</Td>
            <Td isNumeric><Center>{runs}</Center></Td>
            <Td isNumeric><Center style={runs_diff > 0 ? {color: 'green'} : (runs_diff < 0 ? {color: 'red'} : {color: 'black'})}>{runs_diff > 0 ? '+' : ''}{runs_diff}</Center></Td>
            <Td isNumeric><Center>{runs * 1}</Center></Td>
            <Td isNumeric><Center style={runs_diff > 0 ? {color: 'green'} : (runs_diff < 0 ? {color: 'red'} : {color: 'black'})}>{runs_diff > 0 ? '+' : ''}{runs_diff * 1}</Center></Td>
          </Tr>
          <Tr>
            <Td>H (0.5)</Td>
            <Td isNumeric><Center>{hits}</Center></Td>
            <Td isNumeric><Center style={hits_diff > 0 ? {color: 'green'} : (hits_diff < 0 ? {color: 'red'} : {color: 'black'})}>{hits_diff > 0 ? '+' : ''}{hits_diff}</Center></Td>
            <Td isNumeric><Center>{hits * 0.5}</Center></Td>
            <Td isNumeric><Center style={hits_diff > 0 ? {color: 'green'} : (hits_diff < 0 ? {color: 'red'} : {color: 'black'})}>{hits_diff > 0 ? '+' : ''}{hits_diff * 0.5}</Center></Td>
          </Tr>
          <Tr>
            <Td>1B (1)</Td>
            <Td isNumeric><Center>{singles}</Center></Td>
            <Td isNumeric><Center style={singles_diff > 0 ? {color: 'green'} : (singles_diff < 0 ? {color: 'red'} : {color: 'black'})}>{singles_diff > 0 ? '+' : ''}{singles_diff}</Center></Td>
            <Td isNumeric><Center>{singles * 1}</Center></Td>
            <Td isNumeric><Center style={singles_diff > 0 ? {color: 'green'} : (singles_diff < 0 ? {color: 'red'} : {color: 'black'})}>{singles_diff > 0 ? '+' : ''}{singles_diff * 1}</Center></Td>
          </Tr>
          <Tr>
            <Td>2B (2)</Td>
            <Td isNumeric><Center>{doubles}</Center></Td>
            <Td isNumeric><Center style={doubles_diff > 0 ? {color: 'green'} : (doubles_diff < 0 ? {color: 'red'} : {color: 'black'})}>{doubles_diff > 0 ? '+' : ''}{doubles_diff}</Center></Td>
            <Td isNumeric><Center>{doubles * 2}</Center></Td>
            <Td isNumeric><Center style={doubles_diff > 0 ? {color: 'green'} : (doubles_diff < 0 ? {color: 'red'} : {color: 'black'})}>{doubles_diff > 0 ? '+' : ''}{doubles_diff * 2}</Center></Td>
          </Tr>
          <Tr>
            <Td>3B (3)</Td>
            <Td isNumeric><Center>{triples}</Center></Td>
            <Td isNumeric><Center style={triples_diff > 0 ? {color: 'green'} : (triples_diff < 0 ? {color: 'red'} : {color: 'black'})}>{triples_diff > 0 ? '+' : ''}{triples_diff}</Center></Td>
            <Td isNumeric><Center>{triples * 3}</Center></Td>
            <Td isNumeric><Center style={triples_diff > 0 ? {color: 'green'} : (triples_diff < 0 ? {color: 'red'} : {color: 'black'})}>{triples_diff > 0 ? '+' : ''}{triples_diff * 3}</Center></Td>
          </Tr>
          <Tr>
            <Td>HR (4)</Td>
            <Td isNumeric><Center>{homers}</Center></Td>
            <Td isNumeric><Center style={homers_diff > 0 ? {color: 'green'} : (homers_diff < 0 ? {color: 'red'} : {color: 'black'})}>{homers_diff > 0 ? '+' : ''}{homers_diff}</Center></Td>
            <Td isNumeric><Center>{homers * 4}</Center></Td>
            <Td isNumeric><Center style={homers_diff > 0 ? {color: 'green'} : (homers_diff < 0 ? {color: 'red'} : {color: 'black'})}>{homers_diff > 0 ? '+' : ''}{homers_diff * 4}</Center></Td>
          </Tr>
          <Tr>
            <Td>RBI (1)</Td>
            <Td isNumeric><Center>{rbis}</Center></Td>
            <Td isNumeric><Center style={rbis_diff > 0 ? {color: 'green'} : (rbis_diff < 0 ? {color: 'red'} : {color: 'black'})}>{rbis_diff > 0 ? '+' : ''}{rbis_diff}</Center></Td>
            <Td isNumeric><Center>{rbis * 1}</Center></Td>
            <Td isNumeric><Center style={rbis_diff > 0 ? {color: 'green'} : (rbis_diff < 0 ? {color: 'red'} : {color: 'black'})}>{rbis_diff > 0 ? '+' : ''}{rbis_diff * 1}</Center></Td>
          </Tr>
          <Tr>
            <Td>SB (2)</Td>
            <Td isNumeric><Center>{sb}</Center></Td>
            <Td isNumeric><Center style={sb_diff > 0 ? {color: 'green'} : (sb_diff < 0 ? {color: 'red'} : {color: 'black'})}>{sb_diff > 0 ? '+' : ''}{sb_diff}</Center></Td>
            <Td isNumeric><Center>{sb * 2}</Center></Td>
            <Td isNumeric><Center style={sb_diff > 0 ? {color: 'green'} : (sb_diff < 0 ? {color: 'red'} : {color: 'black'})}>{sb_diff > 0 ? '+' : ''}{sb_diff * 2}</Center></Td>
          </Tr>
          <Tr>
            <Td>CS (-2)</Td>
            <Td isNumeric><Center>{cs}</Center></Td>
            <Td isNumeric><Center style={cs_diff > 0 ? {color: 'red'} : (cs_diff < 0 ? {color: 'green'} : {color: 'black'})}>{cs_diff > 0 ? '+' : ''}{cs_diff}</Center></Td>
            <Td isNumeric><Center>{cs * -2}</Center></Td>
            <Td isNumeric><Center style={cs_diff > 0 ? {color: 'red'} : (cs_diff < 0 ? {color: 'green'} : {color: 'black'})}>{cs_diff * -2}</Center></Td>
          </Tr>
          <Tr>
            <Td>K (-0.5)</Td>
            <Td isNumeric><Center>{strikeouts}</Center></Td>
            <Td isNumeric><Center style={strikeouts_diff > 0 ? {color: 'red'} : (strikeouts_diff < 0 ? {color: 'green'} : {color: 'black'})}>{strikeouts_diff > 0 ? '+' : ''}{strikeouts_diff}</Center></Td>
            <Td isNumeric><Center>{strikeouts * -0.5}</Center></Td>
            <Td isNumeric><Center style={strikeouts_diff > 0 ? {color: 'red'} : (strikeouts_diff < 0 ? {color: 'green'} : {color: 'black'})}>{strikeouts_diff * -0.5}</Center></Td>
          </Tr>
          <Tr>
            <Td>BB (0.5)</Td>
            <Td isNumeric><Center>{walks}</Center></Td>
            <Td isNumeric><Center style={walks_diff > 0 ? {color: 'green'} : (walks_diff < 0 ? {color: 'red'} : {color: 'black'})}>{walks_diff > 0 ? '+' : ''}{walks_diff}</Center></Td>
            <Td isNumeric><Center>{walks * 0.5}</Center></Td>
            <Td isNumeric><Center style={walks_diff > 0 ? {color: 'green'} : (walks_diff < 0 ? {color: 'red'} : {color: 'black'})}>{walks_diff > 0 ? '+' : ''}{walks_diff * 0.5}</Center></Td>
          </Tr>
          <Tr>
            <Td>HBP (0.5)</Td>
            <Td isNumeric><Center>{hbp}</Center></Td>
            <Td isNumeric><Center style={hbp_diff > 0 ? {color: 'green'} : (hbp_diff < 0 ? {color: 'red'} : {color: 'black'})}>{hbp_diff > 0 ? '+' : ''}{hbp_diff}</Center></Td>
            <Td isNumeric><Center>{hbp * 0.5}</Center></Td>
            <Td isNumeric><Center style={hbp_diff > 0 ? {color: 'green'} : (hbp_diff < 0 ? {color: 'red'} : {color: 'black'})}>{hbp_diff > 0 ? '+' : ''}{hbp_diff * 0.5}</Center></Td>
          </Tr>
          <Tr>
            <Td>Fielding Error (-1)</Td>
            <Td isNumeric><Center>{error}</Center></Td>
            <Td isNumeric><Center style={error_diff > 0 ? {color: 'red'} : (error_diff < 0 ? {color: 'green'} : {color: 'black'})}>{error_diff > 0 ? '+' : ''}{error_diff}</Center></Td>
            <Td isNumeric><Center>{error * -1}</Center></Td>
            <Td isNumeric><Center style={error_diff > 0 ? {color: 'red'} : (error_diff < 0 ? {color: 'green'} : {color: 'black'})}>{error_diff * -1}</Center></Td>
          </Tr>
          <Tr>
            <Td>PIK (-2)</Td>
            <Td isNumeric><Center>{PIK}</Center></Td>
            <Td isNumeric><Center style={PIK_diff > 0 ? {color: 'red'} : (PIK_diff < 0 ? {color: 'green'} : {color: 'black'})}>{PIK_diff > 0 ? '+' : ''}{PIK_diff}</Center></Td>
            <Td isNumeric><Center>{PIK * -2}</Center></Td>
            <Td isNumeric><Center style={PIK_diff > 0 ? {color: 'red'} : (PIK_diff < 0 ? {color: 'green'} : {color: 'black'})}>{PIK_diff * -2}</Center></Td>
          </Tr>
          <Tr>
            <Td>Total</Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
            <Td isNumeric><Center>{total_batting}</Center></Td>
            <Td isNumeric><Center style={total_batting_diff > 0 ? {color: 'green'} : (total_batting_diff < 0 ? {color: 'red'} : {color: 'black'})}>{total_batting_diff > 0 ? '+' : ''}{total_batting_diff}</Center></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>);

    const pitchingStatsDisplay = (<TableContainer>
      <Table size='sm' variant='simple'>
        <TableCaption>    </TableCaption>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Total</Th>
            <Th>Chg</Th>
            <Th>Fantasy Pts</Th>
            <Th>Chg</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>W (5)</Td>
            <Td isNumeric><Center>{wins}</Center></Td>
            <Td isNumeric><Center style={wins_diff > 0 ? {color: 'green'} : (wins_diff < 0 ? {color: 'red'} : {color: 'black'})}>{wins_diff > 0 ? '+' : ''}{wins_diff}</Center></Td>
            <Td isNumeric><Center>{wins * 5}</Center></Td>
            <Td isNumeric><Center style={wins_diff > 0 ? {color: 'green'} : (wins_diff < 0 ? {color: 'red'} : {color: 'black'})}>{wins_diff > 0 ? '+' : ''}{wins_diff * 5}</Center></Td>
          </Tr>
          <Tr>
            <Td>L (4)</Td>
            <Td isNumeric><Center>{losses}</Center></Td>
            <Td isNumeric><Center style={losses_diff > 0 ? {color: 'green'} : (losses_diff < 0 ? {color: 'red'} : {color: 'black'})}>{losses_diff > 0 ? '+' : ''}{losses_diff}</Center></Td>
            <Td isNumeric><Center>{losses * 4}</Center></Td>
            <Td isNumeric><Center style={losses_diff > 0 ? {color: 'green'} : (losses_diff < 0 ? {color: 'red'} : {color: 'black'})}>{losses_diff > 0 ? '+' : ''}{losses_diff * 4}</Center></Td>
          </Tr>
          <Tr>
            <Td>SV (7)</Td>
            <Td isNumeric><Center>{saves}</Center></Td>
            <Td isNumeric><Center style={saves_diff > 0 ? {color: 'green'} : (saves_diff < 0 ? {color: 'red'} : {color: 'black'})}>{saves_diff > 0 ? '+' : ''}{saves_diff}</Center></Td>
            <Td isNumeric><Center>{saves * 7}</Center></Td>
            <Td isNumeric><Center style={saves_diff > 0 ? {color: 'green'} : (saves_diff < 0 ? {color: 'red'} : {color: 'black'})}>{saves_diff > 0 ? '+' : ''}{saves_diff * 7}</Center></Td>
          </Tr>
          <Tr>
            <Td>BS (-7)</Td>
            <Td isNumeric><Center>{blown_saves}</Center></Td>
            <Td isNumeric><Center style={blown_saves_diff > 0 ? {color: 'red'} : (blown_saves_diff < 0 ? {color: 'green'} : {color: 'black'})}>{blown_saves_diff > 0 ? '+' : ''}{blown_saves_diff}</Center></Td>
            <Td isNumeric><Center>{blown_saves * -7}</Center></Td>
            <Td isNumeric><Center style={blown_saves_diff > 0 ? {color: 'red'} : (blown_saves_diff < 0 ? {color: 'green'} : {color: 'black'})}>{blown_saves_diff * -7}</Center></Td>
          </Tr>
          <Tr>
            <Td>H (-0.5)</Td>
            <Td isNumeric><Center>{hits_pitcher}</Center></Td>
            <Td isNumeric><Center style={hits_pitcher_diff > 0 ? {color: 'red'} : (hits_pitcher_diff < 0 ? {color: 'green'} : {color: 'black'})}>{hits_pitcher_diff > 0 ? '+' : ''}{hits_pitcher_diff}</Center></Td>
            <Td isNumeric><Center>{hits_pitcher * -0.5}</Center></Td>
            <Td isNumeric><Center style={hits_pitcher_diff > 0 ? {color: 'red'} : (hits_pitcher_diff < 0 ? {color: 'green'} : {color: 'black'})}>{hits_pitcher_diff * -0.5}</Center></Td>
          </Tr>
          <Tr>
            <Td>SO (1)</Td>
            <Td isNumeric><Center>{strikeouts_pitcher}</Center></Td>
            <Td isNumeric><Center style={strikeouts_pitcher_diff > 0 ? {color: 'green'} : (strikeouts_pitcher_diff < 0 ? {color: 'red'} : {color: 'black'})}>{strikeouts_pitcher_diff > 0 ? '+' : ''}{strikeouts_pitcher_diff}</Center></Td>
            <Td isNumeric><Center>{strikeouts_pitcher * 1}</Center></Td>
            <Td isNumeric><Center style={strikeouts_pitcher_diff > 0 ? {color: 'green'} : (strikeouts_pitcher_diff < 0 ? {color: 'red'} : {color: 'black'})}>{strikeouts_pitcher_diff > 0 ? '+' : ''}{strikeouts_pitcher_diff * 1}</Center></Td>
          </Tr>
          <Tr>
            <Td>BB (-1)</Td>
            <Td isNumeric><Center>{walks_pitcher}</Center></Td>
            <Td isNumeric><Center style={walks_pitcher_diff > 0 ? {color: 'red'} : (walks_pitcher_diff < 0 ? {color: 'green'} : {color: 'black'})}>{walks_pitcher_diff > 0 ? '+' : ''}{walks_pitcher_diff}</Center></Td>
            <Td isNumeric><Center>{walks_pitcher * -1}</Center></Td>
            <Td isNumeric><Center style={walks_pitcher_diff > 0 ? {color: 'red'} : (walks_pitcher_diff < 0 ? {color: 'green'} : {color: 'black'})}>{walks_pitcher_diff * -1}</Center></Td>
          </Tr>
          <Tr>
            <Td>HBP (-1)</Td>
            <Td isNumeric><Center>{hbp_pitcher}</Center></Td>
            <Td isNumeric><Center style={hbp_pitcher_diff > 0 ? {color: 'red'} : (hbp_pitcher_diff < 0 ? {color: 'green'} : {color: 'black'})}>{hbp_pitcher_diff > 0 ? '+' : ''}{hbp_pitcher_diff}</Center></Td>
            <Td isNumeric><Center>{hbp_pitcher * -1}</Center></Td>
            <Td isNumeric><Center style={hbp_pitcher_diff > 0 ? {color: 'red'} : (hbp_pitcher_diff < 0 ? {color: 'green'} : {color: 'black'})}>{hbp_pitcher_diff * -1}</Center></Td>
          </Tr>
          <Tr>
            <Td>ER (-1)</Td>
            <Td isNumeric><Center>{earned_runs}</Center></Td>
            <Td isNumeric><Center style={earned_runs_diff > 0 ? {color: 'red'} : (earned_runs_diff < 0 ? {color: 'green'} : {color: 'black'})}>{earned_runs_diff > 0 ? '+' : ''}{earned_runs_diff}</Center></Td>
            <Td isNumeric><Center>{earned_runs * -1}</Center></Td>
            <Td isNumeric><Center style={earned_runs_diff > 0 ? {color: 'red'} : (earned_runs_diff < 0 ? {color: 'green'} : {color: 'black'})}>{earned_runs_diff * -1}</Center></Td>
          </Tr>
          <Tr>
            <Td>Outs (0.5)</Td>
            <Td isNumeric><Center>{outs}</Center></Td>
            <Td isNumeric><Center style={outs_diff > 0 ? {color: 'green'} : (outs_diff < 0 ? {color: 'red'} : {color: 'black'})}>{outs_diff > 0 ? '+' : ''}{outs_diff}</Center></Td>
            <Td isNumeric><Center>{outs * 0.5}</Center></Td>
            <Td isNumeric><Center style={outs_diff > 0 ? {color: 'green'} : (outs_diff < 0 ? {color: 'red'} : {color: 'black'})}>{outs_diff > 0 ? '+' : ''}{outs_diff * 0.5}</Center></Td>
          </Tr>
          <Tr>
            <Td>PIK (2)</Td>
            <Td isNumeric><Center>{PIK_pitcher}</Center></Td>
            <Td isNumeric><Center style={PIK_pitcher_diff > 0 ? {color: 'green'} : (PIK_pitcher_diff < 0 ? {color: 'red'} : {color: 'black'})}>{PIK_pitcher_diff > 0 ? '+' : ''}{PIK_pitcher_diff}</Center></Td>
            <Td isNumeric><Center>{PIK_pitcher * 2}</Center></Td>
            <Td isNumeric><Center style={PIK_pitcher_diff > 0 ? {color: 'green'} : (PIK_pitcher_diff < 0 ? {color: 'red'} : {color: 'black'})}>{PIK_pitcher_diff > 0 ? '+' : ''}{PIK_pitcher_diff * 2}</Center></Td>
          </Tr>
          <Tr>
            <Td>No Hitters (5)</Td>
            <Td isNumeric><Center>{no_hitters}</Center></Td>
            <Td isNumeric><Center style={no_hitters_diff > 0 ? {color: 'green'} : (no_hitters_diff < 0 ? {color: 'red'} : {color: 'black'})}>{no_hitters_diff > 0 ? '+' : ''}{no_hitters_diff}</Center></Td>
            <Td isNumeric><Center>{no_hitters * 5}</Center></Td>
            <Td isNumeric><Center style={no_hitters_diff > 0 ? {color: 'green'} : (no_hitters_diff < 0 ? {color: 'red'} : {color: 'black'})}>{no_hitters_diff > 0 ? '+' : ''}{no_hitters_diff * 5}</Center></Td>
          </Tr>
          <Tr>
            <Td>Total</Td>
            <Td isNumeric></Td>
            <Td isNumeric></Td>
            <Td isNumeric><Center>{total_pitching}</Center></Td>
            <Td isNumeric><Center style={total_pitching_diff > 0 ? {color: 'green'} : (total_pitching_diff < 0 ? {color: 'red'} : {color: 'black'})}>{total_pitching_diff > 0 ? '+' : ''}{total_pitching_diff}</Center></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>);

    return (
      <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Center>
          <Image src={`headshots/${props.name.toLowerCase()}.png`} alt={`${props.name}`} boxSize='150px' borderRadius='full' marginTop={6} objectFit='cover'/>
        </Center>
        <Center>
            <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
                style={{"text-transform": "capitalize"}}
              >
                {props.name} {" "}
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  {props.positions}
                </Badge>
            </Box>
          </Center>
        <Box p='6'>
          <Box>
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                {isPitcherPrimarily && isPitcher && <Tab>Pitching</Tab>}
                {isBatter && <Tab>Batting</Tab>}
                {!isPitcherPrimarily && isPitcher && <Tab>Pitching</Tab>}
              </TabList>
            <TabPanels>
              {isPitcher && isPitcherPrimarily && 
              <TabPanel>
                {pitchingStatsDisplay}
              </TabPanel>}
              {isBatter && 
              <TabPanel>
                {battingStatsDisplay}
              </TabPanel>}
              {isPitcher && !isPitcherPrimarily && 
              <TabPanel>
                {pitchingStatsDisplay}
              </TabPanel>}
            </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    )
  }

export default PlayerCard;

import {
    Box,
    Center,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react';

import { 
  getFantasyOwnerBattingTotals,
  getFantasyOwnerPitchingTotals, 
  getAllOtherRelieversTotal,
  getPlayerBattingTotal,
  getPlayerPitchingTotal
} from './Stats';

const player_info = require('./statistics/player_info.json');

function Dashboard() {
    let owner_table_contents = [];
    let player_table_contents = [];
    player_info.owners.forEach(owner => {
        let total_before = 0;
        let total = 0;
        getFantasyOwnerBattingTotals(owner, 'before').forEach(player => total_before += player.points)
        getFantasyOwnerPitchingTotals(owner, 'before').forEach(player => total_before += player.name === '(All Other Pitchers)' ? getAllOtherRelieversTotal('before') : player.points);
        getFantasyOwnerBattingTotals(owner).forEach(player => total += player.points)
        getFantasyOwnerPitchingTotals(owner).forEach(player => total += player.name === '(All Other Pitchers)' ? getAllOtherRelieversTotal() : player.points);
        owner_table_contents.push({owner, total, 'diff': total - total_before})
    });

    player_info.players.forEach(player => {
      if (player.name === "(All Other Pitchers)") return; // Doesn't work without extra calculations and we don't give a shit

      let pitching_before = getPlayerPitchingTotal(player.name, 'before');
      pitching_before = isNaN(pitching_before) ? 0 : pitching_before;

      let batting_before = getPlayerBattingTotal(player.name, 'before');
      batting_before = isNaN(batting_before) ? 0 : batting_before;

      let pitching = getPlayerPitchingTotal(player.name);
      pitching = isNaN(pitching) ? 0 : pitching;

      let batting = getPlayerBattingTotal(player.name);
      batting = isNaN(batting) ? 0 : batting;

      player_table_contents.push({
        player: player.name,
        pitching,
        batting,
        total: pitching + batting,
        diff: (pitching + batting) - (pitching_before + batting_before)
      });
    });

    owner_table_contents.sort((a, b) => b.total - a.total);
    player_table_contents.sort((a, b) => b.total - a.total);

    return (    
    <Center>
    <Box p='6' margin='5px' borderWidth='1px' borderRadius='lg' overflow='hidden' style={{"text-transform": "capitalize"}}>
    <Center fontWeight='semibold' mt='1' as='h4' marginBottom={'15px'}>Owners</Center>
    <TableContainer>
    <Table size='sm' variant='simple'>
      <Thead>
        <Tr>
          <Th><Center>Rank</Center></Th>
          <Th>Owner</Th>
          <Th><Center>Fantasy Pts</Center></Th>
          <Th><Center>Pts Chg</Center></Th>
          <Th><Center>PB</Center></Th>
        </Tr>
      </Thead>
      <Tbody>
        {owner_table_contents.map((content, i) => {
            return (<Tr>
                <Td><Center>{i+1}</Center></Td>
                <Td>{content.owner}</Td>
                <Td><Center>{content.total.toFixed(1)}</Center></Td>
                <Td><Center style={content.diff > 0 ? {color: 'green'} : (content.diff < 0 ? {color: 'red'} : {color: 'yellow'})}>{content.diff > 0 ? '+' : ''}{content.diff}</Center></Td>
                <Td><Center>{(content.total - owner_table_contents[0].total) === 0 ? "-" : -(content.total.toFixed(1) - owner_table_contents[0].total.toFixed(1))}</Center></Td>
                </Tr>)
        })}
      </Tbody>
    </Table>
  </TableContainer>
  </Box>
  <Box p='6' margin='5px' borderWidth='1px' borderRadius='lg' overflow='hidden' style={{"text-transform": "capitalize"}}>
    <TableContainer>
      <Center fontWeight='semibold' mt='1' as='h4' marginBottom={'15px'}>Players</Center>
    <Table size='sm' variant='simple'>
      <Thead>
        <Tr>
          <Th><Center>Rank</Center></Th>
          <Th>Player</Th>
          <Th><Center>Fantasy Pts</Center></Th>
          <Th><Center>Pts Chg</Center></Th>
          <Th>B Pts</Th>
          <Th>P Pts</Th>
        </Tr>
      </Thead>
      <Tbody>
        {player_table_contents.map((content, i) => {
            return (<Tr>
                <Td><Center>{i+1}</Center></Td>
                <Td>{content.player}</Td>
                <Td><Center>{content.total.toFixed(1)}</Center></Td>
                <Td><Center style={content.diff > 0 ? {color: 'green'} : (content.diff < 0 ? {color: 'red'} : {color: 'black'})}>{content.diff > 0 ? '+' : ''}{content.diff}</Center></Td>
                <Td><Center>{content.batting.toFixed(1)}</Center></Td>
                <Td><Center>{content.pitching.toFixed(1)}</Center></Td>
                </Tr>)
        })}
      </Tbody>
    </Table>
  </TableContainer>
  </Box>
  </Center>)
}

export default Dashboard;
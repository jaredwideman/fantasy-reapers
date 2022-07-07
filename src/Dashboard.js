import {
    Box,
    Center,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';

import { getFantasyOwnerBattingTotals, getFantasyOwnerPitchingTotals, getAllOtherRelieversTotal } from './Stats';

const player_info = require('./statistics/player_info.json');

function Dashboard() {
    let table_contents = [];
    player_info.owners.forEach(owner => {
        let total_before = 0;
        let total = 0;
        getFantasyOwnerBattingTotals(owner, 'before').forEach(player => total_before += player.points)
        getFantasyOwnerPitchingTotals(owner, 'before').forEach(player => total_before += player.name === '(All Other Relievers)' ? getAllOtherRelieversTotal() : player.points);
        getFantasyOwnerBattingTotals(owner).forEach(player => total += player.points)
        getFantasyOwnerPitchingTotals(owner).forEach(player => total += player.name === '(All Other Relievers)' ? getAllOtherRelieversTotal() : player.points);
        table_contents.push({owner, total, 'diff': total - total_before})
    });

    table_contents.sort((a, b) => b.total - a.total);

    console.log(JSON.stringify(table_contents))

    return (    
        <Center>
    <Box p='6' maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden' style={{"text-transform": "capitalize"}}>
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
        {table_contents.map((content, i) => {
            return (<Tr>
                <Td><Center>{i+1}</Center></Td>
                <Td>{content.owner}</Td>
                <Td><Center>{content.total.toFixed(1)}</Center></Td>
                <Td><Center style={content.diff > 0 ? {color: 'green'} : (content.diff < 0 ? {color: 'red'} : {color: 'yellow'})}>{content.diff > 0 ? '+' : ''}{content.diff}</Center></Td>
                <Td><Center>{(content.total - table_contents[0].total) === 0 ? "-" : -(content.total.toFixed(1) - table_contents[0].total.toFixed(1))}</Center></Td>
                </Tr>)
        })}
      </Tbody>
    </Table>
  </TableContainer>
  </Box>
  </Center>)
}

export default Dashboard;
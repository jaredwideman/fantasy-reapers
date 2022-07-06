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

const player_info = require('./player_info.json');

function Dashboard(props) {
    let table_contents = [];
    player_info.owners.forEach(owner => {
        let total = 0;
        getFantasyOwnerBattingTotals(owner).forEach(player => total += player.points)
        getFantasyOwnerPitchingTotals(owner).forEach(player => total += player.name === '(All Other Relievers)' ? getAllOtherRelieversTotal() : player.points);
        table_contents.push({owner, total})
    });

    table_contents.sort((a, b) => b.total - a.total);

    console.log(JSON.stringify(table_contents))

    return (    
        <Center>
    <Box p='6' maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden' style={{"text-transform": "capitalize"}}>
<TableContainer>
    <Table size='sm' variant='simple'>
      <TableCaption>    </TableCaption>
      <Thead>
        <Tr>
          <Th>Rank</Th>
          <Th>Owner</Th>
          <Th>Fantasy Pts</Th>
        </Tr>
      </Thead>
      <Tbody>
        {table_contents.map((content, i) => {
            return (<Tr>
                <Td>{i+1}</Td>
                <Td>{content.owner}</Td>
                <Td>{content.total.toFixed(1)}</Td>
                </Tr>)
        })}
      </Tbody>
    </Table>
  </TableContainer>
  </Box>
  </Center>)
}

export default Dashboard;
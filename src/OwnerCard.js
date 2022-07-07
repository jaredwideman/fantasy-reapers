import {
    Badge,
    Box,
    Center,
    Image,
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

function OwnerCard(props) {
    let total_before = 0;
    let total = 0; 
    getFantasyOwnerBattingTotals(props.name, 'before').forEach(player => total_before += player.points)
    getFantasyOwnerPitchingTotals(props.name, 'before').forEach(player => total_before += player.name === '(All Other Relievers)' ? getAllOtherRelieversTotal() : player.points);
    getFantasyOwnerBattingTotals(props.name).forEach(player => total += player.points)
    getFantasyOwnerPitchingTotals(props.name).forEach(player => total += player.name === '(All Other Relievers)' ? getAllOtherRelieversTotal() : player.points);
    return (
    <Box p='6' maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
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
                {props.name}
              </Box>
              </Center>
    <TableContainer>
        <Table size='sm' variant='simple'>
          <Thead>
            <Tr>
              <Th>Position</Th>
              <Th>Player</Th>
              <Th>Fantasy Pts</Th>
              <Th>Chg</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getFantasyOwnerBattingTotals(props.name).map((player, i) => {
                const diffs = getFantasyOwnerBattingTotals(props.name, 'before');
                return (<Tr>
                    <Td>
                        <Center>
                            <Badge borderRadius='full' px='2' colorScheme='red'>
                                B
                            </Badge>
                        </Center>
                    </Td>
                    <Td>{player.name}</Td>
                    <Td isNumeric>{player.points.toFixed(1)}</Td>
                    <Td isNumeric><Center style={player.points - diffs[i].points > 0 ? {color: 'green'} : (player.points - diffs[i].points < 0 ? {color: 'red'} : {color: 'black'})}>{player.points - diffs[i].points > 0 ? '+' : ''}{player.points - diffs[i].points}</Center></Td>
                  </Tr>);
            })}
            {getFantasyOwnerPitchingTotals(props.name).map((player, i) => {
                const diffs = getFantasyOwnerPitchingTotals(props.name, 'before');
                return (<Tr>
                    <Td>
                        <Center>
                            <Badge borderRadius='full' px='2' colorScheme='blue'>
                                P
                            </Badge>
                        </Center>
                    </Td>
                    <Td>{player.name}</Td>
                    <Td isNumeric>{player.name === '(All Other Relievers)' ? getAllOtherRelieversTotal().toFixed(1) : player.points.toFixed(1)}</Td>
                    {player.name === '(All Other Relievers)' && <Td isNumeric><Center style={getAllOtherRelieversTotal() - getAllOtherRelieversTotal('before') > 0 ? {color: 'green'} : (getAllOtherRelieversTotal() - getAllOtherRelieversTotal('before') < 0 ? {color: 'red'} : {color: 'black'})}>{getAllOtherRelieversTotal() - getAllOtherRelieversTotal('before') ? '+' : ''}{getAllOtherRelieversTotal() - getAllOtherRelieversTotal('before')}</Center></Td>}
                    {player.name !== '(All Other Relievers)' &&  <Td isNumeric><Center style={player.points - diffs[i].points > 0 ? {color: 'green'} : (player.points - diffs[i].points < 0 ? {color: 'red'} : {color: 'black'})}>{player.points - diffs[i].points > 0 ? '+' : ''}{player.points - diffs[i].points}</Center></Td>}
                  </Tr>);
            })}
            <Tr>
                <Td></Td>
                <Td><b>Total</b></Td>
                <Td isNumeric><b>{total.toFixed(1)}</b></Td>
                <Td isNumberic><b><Center style={total - total_before > 0 ? {color: 'green'} : (total - total_before < 0 ? {color: 'red'} : {color: 'black'})}>{total - total_before > 0 ? '+' : ''}{total - total_before}</Center></b></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      </Box>
      );
}


export default OwnerCard;
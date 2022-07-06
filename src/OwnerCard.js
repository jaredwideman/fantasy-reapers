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
    let total = 0;
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
          <TableCaption>    </TableCaption>
          <Thead>
            <Tr>
              <Th>Position</Th>
              <Th>Player</Th>
              <Th>Fantasy Pts</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getFantasyOwnerBattingTotals(props.name).map(player => {
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
                  </Tr>);
            })}
            {getFantasyOwnerPitchingTotals(props.name).map(player => {
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
                  </Tr>);
            })}
            <Tr>
                <Td></Td>
                <Td><b>Total</b></Td>
                <Td isNumeric><b>{total.toFixed(1)}</b></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      </Box>
      );
}


export default OwnerCard;
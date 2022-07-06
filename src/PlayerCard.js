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

import { getStat } from './Stats'; 

const statsSheetExtra = require('./batting_stats_extra.json');
const statsSheetFielding = require('./fielding_stats.json');
const statsSheetPitching = require('./pitching_stats.json');            // https://gc.com/stats/team/62702155c4a63df6dd0f8dea/?stats_requested=%5B%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22outs%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22GP%3AP%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22GS%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22W%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22L%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SV%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SVO%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22BS%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SV%25%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22H%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22R%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22ER%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22BB%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SO%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22HBP%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22ERA%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22WHIP%22%7D%5D&qualifying_stat=%7B%22key%22%3A%22GP%3AP%22%2C%22category%22%3A%22defense%22%7D&game_filter=All
const statsSheetPitchingExtra = require('./pitching_stats_extra.json'); // https://gc.com/stats/team/62702155c4a63df6dd0f8dea/?stats_requested=%5B%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22outs%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22LOB%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22BK%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22PIK%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SB%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22CS%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SB%25%22%7D%5D&qualifying_stat=%7B%22key%22%3A%22GP%3AP%22%2C%22category%22%3A%22defense%22%7D&game_filter=All

function PlayerCard(props) {
    // Batting Stats
    const runs = getStat(props.name, 'R');
    const hits = getStat(props.name, 'H');
    const singles = getStat(props.name, '1B');
    const doubles = getStat(props.name, '2B');
    const triples = getStat(props.name, '3B');
    const homers = getStat(props.name, 'HR');
    const rbis = getStat(props.name, 'RBI');
    const sb = getStat(props.name, 'SB', statsSheetExtra);
    const cs = getStat(props.name, 'CS', statsSheetExtra);
    const strikeouts = getStat(props.name, 'SO');
    const walks = getStat(props.name, 'BB');
    const hbp = getStat(props.name, 'HBP');
    const error = getStat(props.name, 'E', statsSheetFielding);
    const PIK = getStat(props.name, 'PIK', statsSheetExtra);
    const total_batting = Number(runs) + Number(hits) * 0.5 + Number(singles) + Number(doubles) * 2 + Number(triples) * 3 + Number(homers) * 4 + Number(rbis) + Number(sb) * 2 + Number(cs) * -2 + Number(strikeouts) * -1 + Number(walks) * 0.5 + Number(hbp) * 0.5 + Number(PIK) * -2 + Number(error) * -1;

    // Pitching Stats
    const wins = getStat(props.name, 'W', statsSheetPitching);
    const losses = getStat(props.name, 'L', statsSheetPitching);
    const saves = getStat(props.name, 'SV', statsSheetPitching);
    const blown_saves = getStat(props.name, 'BS', statsSheetPitching);
    const hits_pitcher = getStat(props.name, 'H', statsSheetPitching);
    const strikeouts_pitcher = getStat(props.name, 'SO', statsSheetPitching);
    const walks_pitcher = getStat(props.name, 'BB', statsSheetPitching);
    const hbp_pitcher = getStat(props.name, 'HBP', statsSheetPitching);
    const earned_runs = getStat(props.name, 'ER', statsSheetPitching);
    const outs = getStat(props.name, 'outs', statsSheetPitching);
    const PIK_pitcher = getStat(props.name, 'PIK', statsSheetPitchingExtra);
    const no_hitters = 0; // not tracked by gamechanger...
    const total_pitching = Number(wins)*5 + Number(losses)*4 + Number(saves)*7 + Number(blown_saves)*-7 + Number(hits_pitcher)*-0.5 + Number(strikeouts_pitcher) + Number(walks_pitcher)*-1 + Number(hbp_pitcher)*-1 + Number(earned_runs)*-1 + Number(outs)*0.5 + Number(PIK_pitcher)*2 + Number(no_hitters)*5; // todo

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
            <Th>Fantasy Pts</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>R (1)</Td>
            <Td isNumeric>{runs}</Td>
            <Td isNumeric>{runs * 1}</Td>
          </Tr>
          <Tr>
            <Td>H (0.5)</Td>
            <Td isNumeric>{hits}</Td>
            <Td isNumeric>{hits * 0.5}</Td>
          </Tr>
          <Tr>
            <Td>1B (1)</Td>
            <Td isNumeric>{singles}</Td>
            <Td isNumeric>{singles * 1}</Td>
          </Tr>
          <Tr>
            <Td>2B (2)</Td>
            <Td isNumeric>{doubles}</Td>
            <Td isNumeric>{doubles * 2}</Td>
          </Tr>
          <Tr>
            <Td>3B (3)</Td>
            <Td isNumeric>{triples}</Td>
            <Td isNumeric>{triples * 3}</Td>
          </Tr>
          <Tr>
            <Td>HR (4)</Td>
            <Td isNumeric>{homers}</Td>
            <Td isNumeric>{homers * 4}</Td>
          </Tr>
          <Tr>
            <Td>RBI (1)</Td>
            <Td isNumeric>{rbis}</Td>
            <Td isNumeric>{rbis * 1}</Td>
          </Tr>
          <Tr>
            <Td>SB (2)</Td>
            <Td isNumeric>{sb}</Td>
            <Td isNumeric>{sb * 2}</Td>
          </Tr>
          <Tr>
            <Td>CS (-2)</Td>
            <Td isNumeric>{cs}</Td>
            <Td isNumeric>{cs * -2}</Td>
          </Tr>
          <Tr>
            <Td>K (-1)</Td>
            <Td isNumeric>{strikeouts}</Td>
            <Td isNumeric>{strikeouts * -1}</Td>
          </Tr>
          <Tr>
            <Td>BB (0.5)</Td>
            <Td isNumeric>{walks}</Td>
            <Td isNumeric>{walks * 0.5}</Td>
          </Tr>
          <Tr>
            <Td>HBP (0.5)</Td>
            <Td isNumeric>{hbp}</Td>
            <Td isNumeric>{hbp * 0.5}</Td>
          </Tr>
          <Tr>
            <Td>Fielding Error (-1)</Td>
            <Td isNumeric>{error}</Td>
            <Td isNumeric>{error * -1}</Td>
          </Tr>
          <Tr>
            <Td>PIK (-2)</Td>
            <Td isNumeric>{PIK}</Td>
            <Td isNumeric>{PIK * -2}</Td>
          </Tr>
          <Tr>
            <Td>Total</Td>
            <Td isNumeric></Td>
            <Td isNumeric>{total_batting}</Td>
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
            <Th>Fantasy Pts</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>W (5)</Td>
            <Td isNumeric>{wins}</Td>
            <Td isNumeric>{wins * 5}</Td>
          </Tr>
          <Tr>
            <Td>L (4)</Td>
            <Td isNumeric>{losses}</Td>
            <Td isNumeric>{losses * 4}</Td>
          </Tr>
          <Tr>
            <Td>SV (7)</Td>
            <Td isNumeric>{saves}</Td>
            <Td isNumeric>{saves * 7}</Td>
          </Tr>
          <Tr>
            <Td>BS (-7)</Td>
            <Td isNumeric>{blown_saves}</Td>
            <Td isNumeric>{blown_saves * -7}</Td>
          </Tr>
          <Tr>
            <Td>H (-0.5)</Td>
            <Td isNumeric>{hits_pitcher}</Td>
            <Td isNumeric>{hits_pitcher * -0.5}</Td>
          </Tr>
          <Tr>
            <Td>SO (1)</Td>
            <Td isNumeric>{strikeouts_pitcher}</Td>
            <Td isNumeric>{strikeouts_pitcher * 1}</Td>
          </Tr>
          <Tr>
            <Td>BB (-1)</Td>
            <Td isNumeric>{walks_pitcher}</Td>
            <Td isNumeric>{walks_pitcher * -1}</Td>
          </Tr>
          <Tr>
            <Td>HBP (-1)</Td>
            <Td isNumeric>{hbp_pitcher}</Td>
            <Td isNumeric>{hbp_pitcher * -1}</Td>
          </Tr>
          <Tr>
            <Td>ER (-1)</Td>
            <Td isNumeric>{earned_runs}</Td>
            <Td isNumeric>{earned_runs * -1}</Td>
          </Tr>
          <Tr>
            <Td>Outs (0.5)</Td>
            <Td isNumeric>{outs}</Td>
            <Td isNumeric>{outs * 0.5}</Td>
          </Tr>
          <Tr>
            <Td>PIK (2)</Td>
            <Td isNumeric>{PIK_pitcher}</Td>
            <Td isNumeric>{PIK_pitcher * 2}</Td>
          </Tr>
          <Tr>
            <Td>No Hitters (5) [not tracked here]</Td>
            <Td isNumeric>{no_hitters}</Td>
            <Td isNumeric>{no_hitters * 5}</Td>
          </Tr>
          <Tr>
            <Td>Total</Td>
            <Td isNumeric></Td>
            <Td isNumeric>{total_pitching}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>);

    return (
      <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
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

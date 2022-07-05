import React, { useState } from 'react';
import {
  Center,
  ChakraProvider,
  theme,
  Select,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react';
import PlayerCard from './PlayerCard';

const player_info = require('./player_info.json');

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const playerName = player_info.players.find(player => player.name === selectedPlayer);
  return (
    <ChakraProvider theme={theme}>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Dashboard</Tab>
          <Tab>Reaper Stats</Tab>
          <Tab>Fantasy Owner Stats</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            To-do
          </TabPanel>
          <TabPanel>
          <Select placeholder='Select Player...' onChange={e => setSelectedPlayer(e.target.value)}>
            {
              player_info.players.map(player => {
                return player.name ? <option value={player.name}>{player.name}</option> : null;
              })
            }
          </Select>
          <Center>
          {selectedPlayer && <PlayerCard 
                                name={selectedPlayer} 
                                positions={playerName.positions} 
                                primarilyPitcher={playerName.primarily_pitcher} />}
          </Center>
          </TabPanel>
          <TabPanel>
            <Select placeholder='Select Owner...'>
              {
                player_info.owners.map(owner => {
                  return <option value={owner}>{owner}</option>;
                })
              }
            </Select>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
    </ChakraProvider>
  );
}

export default App;

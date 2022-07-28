import React, { useState, useEffect, useRef } from 'react';
import {
  Center,
  ChakraProvider,
  Image,
  theme,
  Select,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react';
import PlayerCard from './PlayerCard';
import OwnerCard from './OwnerCard';
import Dashboard from './Dashboard';

const player_info = require('./statistics/player_info.json');

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const egg = useRef("");
  const playerName = player_info.players.find(player => player.name === selectedPlayer);
  let timeout;
  let eggTimeout;
  const [eggActivated, setEggActivated] = useState(false);

  useEffect(() => {
    function handleKeyUp(event) {
      if (egg.current.length >= 3) {
        egg.current = '';
      }
      if (event.keyCode === 74) {
        egg.current += "j";
      } else if (event.keyCode === 69) {
        egg.current += 'e';
      } else if (event.keyCode === 78) {
        egg.current += 'n';
      } else {
        egg.current = '';
      }
      clearTimeout(timeout);
      if (egg.current === 'jen')
      {
        egg.current = '';
        setEggActivated(true);
        clearTimeout(eggTimeout);
        eggTimeout = setTimeout(() => {
          setEggActivated(false);
        }, 18000)
      }
      timeout = setTimeout(() => {
        egg.current = "";
      }, 1000);
    }

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const content = (
    <ChakraProvider theme={theme}>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Dashboard</Tab>
          <Tab>Reaper Stats</Tab>
          <Tab>Fantasy Owner Stats</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Dashboard />
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
            <Select placeholder='Select Owner...' onChange={e => setSelectedOwner(e.target.value)}>
              {
                player_info.owners.map(owner => {
                  return <option value={owner}>{owner}</option>;
                })
              }
            </Select>
            <Center>
              {selectedOwner && <OwnerCard 
                                    name={selectedOwner} />}
          </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );

  const eggContent = <Center><Image src={`egg.gif`} alt={`egg`} display='block' min-height='77%' min-width='1024px' height='auto' width='77%' objectFit='cover'/></Center>;

  return (!eggActivated && content) || eggContent;
}

export default App;

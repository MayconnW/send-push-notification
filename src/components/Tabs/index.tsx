import {
  Container,
} from './styles';
import { Route, useRoute } from '../../hooks/use-route';
import { SendPush } from '../SendPush';
import { Settings } from '../Settings';
import {Tabs as ChakraTabs, Tab, TabList, TabIndicator, TabPanels, TabPanel} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const tabsRoute: Route[] = ['sendPush', 'setting'];

export function Tabs() {

  const { route, changeRoute } = useRoute();

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    changeRoute(tabsRoute[index]);
  }

  useEffect(() => {
    setTabIndex(tabsRoute.indexOf(route));
  }, [route]);

  return (
    <Container>
      <ChakraTabs 
        position="relative" 
        variant="unstyled"
        index={tabIndex} 
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab _focus={{outline: 'none'}} _hover={{borderColor: 'transparent'}}>Send Push</Tab>
          <Tab _focus={{outline: 'none'}} _hover={{borderColor: 'transparent'}}>Settings</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <SendPush />
          </TabPanel>
          <TabPanel>
            <Settings />
          </TabPanel>
        </TabPanels>

      </ChakraTabs>
    </Container>
  );
}


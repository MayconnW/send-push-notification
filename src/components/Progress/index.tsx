import { Center, Flex, Stack, Text, Progress as ChakraProgress } from "@chakra-ui/react"

type ProgressProps = {
  numberOfTokens: number;
  numberOfLots: number;
  startedFromLot: number;
  secondsToWait: number;
  sendingLotNumber: number;
  isSingleToken: boolean;
}

export function Progress(props: ProgressProps) {
  const {
    numberOfLots,
    numberOfTokens,
    secondsToWait,
    sendingLotNumber,
    startedFromLot,
    isSingleToken
  } = props;
  return (
    <Stack
      w="460px"
    >
      <Center>
        <h5>
          {isSingleToken ? 'Single token selected' : 'CSV file selected'}
        </h5>
      </Center>
      <Flex gap="2">
        <Text fontWeight="700">Status:</Text>
        <Text fontWeight="400">Sending</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Number of tokens provided:</Text>
        <Text fontWeight="400">{ numberOfTokens }</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Number of lots:</Text>
        <Text>{ numberOfLots }</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Started from lot:</Text>
        <Text fontWeight="400">{ startedFromLot }</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Seconds to wait until send next lot:</Text>
        <Text fontWeight="400">{ secondsToWait } seconds</Text>
      </Flex>
      <Stack mt="8">
        <ChakraProgress hasStripe value={sendingLotNumber} max={numberOfLots} isAnimated />
        <Center><Text>Sending lot { sendingLotNumber } of { numberOfLots }</Text></Center>
      </Stack>
      
    </Stack>
  );
}

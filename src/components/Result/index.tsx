import { Button, Center, Code, Flex, Stack, Text } from "@chakra-ui/react"

type ResultProps = {
  numberOfTokensSent: number;
  numberOfSuccessDeliveredTokens: number;
  numberOfFailedDeliveredTokens: number;
  failedLots: {
    lotNumber: number;
    startId: string;
    endId: string;
  }[]
  handleClear: () => void;
}

export function Result(props: ResultProps) {

  const {
    numberOfFailedDeliveredTokens,
    numberOfSuccessDeliveredTokens,
    numberOfTokensSent,
    failedLots,
    handleClear
  } = props;
  
  return (
    <Stack
      w="460px"
    >
      <Center>
        <h5>Result</h5>
      </Center>
      <Flex gap="2">
        <Text fontWeight="700">Status:</Text>
        <Text fontWeight="400">Finished</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Number of tokens sent:</Text>
        <Text fontWeight="400">{ numberOfTokensSent }</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Success tokens sent:</Text>
        <Text>{ numberOfSuccessDeliveredTokens }</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Failed to deliver:</Text>
        <Text fontWeight="400">{ numberOfFailedDeliveredTokens }</Text>
      </Flex>
      <Flex gap="2">
        <Text fontWeight="700">Success rate:</Text>
        <Text fontWeight="400">{ numberOfSuccessDeliveredTokens / numberOfTokensSent * 100 }%</Text>
      </Flex>
      {failedLots.length > 0 && (
        <Stack mt="4">
          <Center><h3>Failed lots that needs to be resent</h3></Center>
          {failedLots.map(failedLot => (
            <Stack gap="0" key={failedLot.lotNumber}>
              <Text fontWeight="700">Lot { failedLot.lotNumber }</Text>
              <Text fontWeight="400">Started id: <Code fontSize="x-small">{ failedLot.startId }</Code></Text>
              <Text fontWeight="400">End id: <Code fontSize="x-small">{ failedLot.endId }</Code></Text>
            </Stack>
          ))}
        </Stack>
      )}
      <Button
          _focus={{outline: 'none'}} 
          mt="4"
          onClick={handleClear}
        >
          Clear and start again
        </Button>
    </Stack>
  );
}

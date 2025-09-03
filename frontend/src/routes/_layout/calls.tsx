import { createFileRoute } from "@tanstack/react-router"
import { Box, Heading, Text, VStack } from "@chakra-ui/react"

function Calls() {
    return (
        <Box p={6}>
            <VStack align="stretch" gap={6}>
                <Heading size="lg">Llamadas</Heading>
                <Text>This is the calls page - routing works!</Text>
            </VStack>
        </Box>
    )
}

export const Route = createFileRoute("/_layout/calls")({
    component: Calls,
})
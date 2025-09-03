// frontend/src/routes/_layout/index.tsx
import {
  Box,
  Container,
  Text,
  Grid,
  GridItem,
  Flex,
  Icon,
  Badge,
  VStack,
  Heading,
  Link
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { FiArrowRight } from "react-icons/fi"

import useAuth from "@/hooks/useAuth"
import { mockStats, mockCampaigns, mockRecentCalls } from "@/data/mockDashboardData"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
      <>
        <Container maxW="full" p={6}>
          {/* Welcome Message */}
          <Box mb={8} bg="white" borderRadius="xl" border="1px" borderColor="gray.200" p={6}>
            <Heading size="lg" mb={2}>
              Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
            </Heading>
            <Text color="gray.600" fontSize="md">
              Welcome back, nice to see you again!
            </Text>
          </Box>

          {/* Stats Grid */}
          <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
              gap={6}
              mb={8}
          >
            {mockStats.map((stat, index) => (
                <GridItem key={index}>
                  <Box
                      bg="white"
                      borderRadius="xl"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{ shadow: "lg" }}
                      transition="all 0.2s"
                      p={6}
                  >
                    <Flex mb={4}>
                      <Box
                          w={12}
                          h={12}
                          bg={stat.iconBg}
                          borderRadius="lg"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                      >
                        <Icon as={stat.icon} color={stat.iconColor} boxSize={6} />
                      </Box>
                    </Flex>
                    <Text fontSize="2xl" fontWeight="bold" mb={1}>
                      {stat.value}
                    </Text>
                    <Text color="gray.600" fontSize="sm" mb={2}>
                      {stat.label}
                    </Text>
                    <Badge
                        colorScheme={stat.changeType === "positive" ? "green" : "red"}
                        borderRadius="full"
                        px={2}
                        py={1}
                        fontSize="xs"
                    >
                      {stat.change}
                    </Badge>
                  </Box>
                </GridItem>
            ))}
          </Grid>

          {/* Dashboard Grid */}
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
            {/* Active Campaigns */}
            <GridItem>
              <Box bg="white" borderRadius="xl" border="1px" borderColor="gray.200">
                <Box p={6} borderBottom="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Active Campaigns</Heading>
                    <Link
                        color="teal.500"
                        fontSize="sm"
                        fontWeight="medium"
                        _hover={{ color: "teal.600" }}
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                      View all <Icon as={FiArrowRight} />
                    </Link>
                  </Flex>
                </Box>
                <Box p={6}>
                  <VStack gap={4} align="stretch">
                    {mockCampaigns.map((campaign, index) => (
                        <Flex
                            key={index}
                            justify="space-between"
                            align="center"
                            py={4}
                            borderBottom={index < mockCampaigns.length - 1 ? "1px" : "none"}
                            borderColor="gray.100"
                        >
                          <Box>
                            <Text fontWeight="semibold" mb={1}>
                              {campaign.name}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {campaign.type} • Started {campaign.startDate}
                            </Text>
                          </Box>
                          <Box textAlign="right">
                            <Badge
                                colorScheme={campaign.status === "Active" ? "green" : "yellow"}
                                borderRadius="full"
                                px={3}
                                py={1}
                                mb={1}
                                fontSize="xs"
                            >
                              {campaign.status}
                            </Badge>
                            <Text fontSize="sm" color="gray.600">
                              {campaign.metric}
                            </Text>
                          </Box>
                        </Flex>
                    ))}
                  </VStack>
                </Box>
              </Box>
            </GridItem>

            {/* Recent Calls */}
            <GridItem>
              <Box bg="white" borderRadius="xl" border="1px" borderColor="gray.200">
                <Box p={6} borderBottom="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center">
                    <Heading size="md">Recent Calls (24h)</Heading>
                    <Link
                        color="teal.500"
                        fontSize="sm"
                        fontWeight="medium"
                        _hover={{ color: "teal.600" }}
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                      View all <Icon as={FiArrowRight} />
                    </Link>
                  </Flex>
                </Box>
                <Box p={6}>
                  <VStack gap={3} align="stretch">
                    {mockRecentCalls.map((call, index) => (
                        <Flex
                            key={index}
                            align="center"
                            gap={3}
                            py={3}
                            borderBottom={index < mockRecentCalls.length - 1 ? "1px" : "none"}
                            borderColor="gray.100"
                        >
                          <Box
                              w={8}
                              h={8}
                              bg="gray.200"
                              color="gray.600"
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontWeight="semibold"
                              fontSize="sm"
                          >
                            {call.initials}
                          </Box>
                          <Box flex={1}>
                            <Text fontWeight="semibold" fontSize="sm">
                              {call.name}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              {call.time}
                            </Text>
                          </Box>
                          <Text
                              fontSize="xs"
                              color="teal.500"
                              fontWeight="medium"
                          >
                            {call.duration}
                          </Text>
                        </Flex>
                    ))}
                  </VStack>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </>
  )
}
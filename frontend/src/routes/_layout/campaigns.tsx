//frontend/src/routes/_layout/campaigns.tsx
import { createFileRoute } from "@tanstack/react-router"
import {
    Box,
    Heading,
    Text,
    VStack,
    Button,
    Input,
    HStack
} from "@chakra-ui/react"
import { useState } from "react"
import { CampaignsService } from "@/client" // Import the auto-generated service

function Campaigns() {
    const [campaignName, setCampaignName] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleCreateCampaign = async () => {
        if (!campaignName.trim()) {
            setMessage({ type: 'error', text: 'Campaign name is required' })
            return
        }

        setIsCreating(true)
        setMessage(null)

        try {
            // Use the auto-generated CampaignsService instead of direct fetch
            await CampaignsService.createCampaign({
                requestBody: {
                    name: campaignName.trim()
                }
            })

            setMessage({ type: 'success', text: 'Campaign created successfully!' })
            setCampaignName("") // Clear the input
        } catch (error) {
            console.error('Error creating campaign:', error)
            setMessage({ type: 'error', text: 'Failed to create campaign. Please try again.' })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <Box p={6}>
            <VStack align="stretch" gap={6}>
                <Heading size="lg">Campañas</Heading>

                {/* Campaign Creation Section */}
                <Box
                    borderWidth={1}
                    borderRadius="md"
                    p={4}
                    bg="gray.50"
                    _dark={{ bg: "gray.700" }}
                >
                    <VStack align="stretch" gap={4}>
                        <Heading size="md">Create New Campaign</Heading>

                        {message && (
                            <Box
                                p={3}
                                borderRadius="md"
                                bg={message.type === 'success' ? 'green.50' : 'red.50'}
                                borderColor={message.type === 'success' ? 'green.200' : 'red.200'}
                                borderWidth={1}
                                _dark={{
                                    bg: message.type === 'success' ? 'green.900' : 'red.900',
                                    borderColor: message.type === 'success' ? 'green.700' : 'red.700'
                                }}
                            >
                                <Text
                                    color={message.type === 'success' ? 'green.800' : 'red.800'}
                                    _dark={{
                                        color: message.type === 'success' ? 'green.200' : 'red.200'
                                    }}
                                >
                                    {message.text}
                                </Text>
                            </Box>
                        )}

                        <VStack align="stretch" gap={2}>
                            <Text fontWeight="medium">Campaign Name</Text>
                            <Input
                                placeholder="Enter campaign name..."
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCreateCampaign()
                                    }
                                }}
                                bg="white"
                                _dark={{ bg: "gray.800" }}
                            />
                        </VStack>

                        <HStack>
                            <Button
                                colorScheme="blue"
                                onClick={handleCreateCampaign}
                                loading={isCreating}
                                disabled={!campaignName.trim()}
                            >
                                {isCreating ? 'Creating...' : 'Create Campaign'}
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setCampaignName("")
                                    setMessage(null)
                                }}
                                disabled={!campaignName}
                            >
                                Clear
                            </Button>
                        </HStack>
                    </VStack>
                </Box>

                <Text>This is the campaigns page - routing works!</Text>
            </VStack>
        </Box>
    )
}

export const Route = createFileRoute("/_layout/campaigns")({
    component: Campaigns,
})
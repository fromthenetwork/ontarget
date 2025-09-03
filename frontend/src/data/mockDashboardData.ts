//frontend/src/data/mockDashboardData.ts
import { FiTarget, FiPhone, FiTrendingUp, FiDollarSign } from "react-icons/fi"

export interface StatItem {
    label: string
    value: string
    change: string
    changeType: "positive" | "negative"
    icon: any
    iconColor: string
    iconBg: string
}

export interface Campaign {
    name: string
    type: string
    startDate: string
    status: "Active" | "Paused"
    metric: string
}

export interface RecentCall {
    name: string
    initials: string
    time: string
    duration: string
}

export const mockStats: StatItem[] = [
    {
        label: "Active Campaigns",
        value: "12",
        change: "+2 this week",
        changeType: "positive",
        icon: FiTarget,
        iconColor: "teal.500",
        iconBg: "teal.50"
    },
    {
        label: "Calls (24h)",
        value: "847",
        change: "+12.5%",
        changeType: "positive",
        icon: FiPhone,
        iconColor: "blue.500",
        iconBg: "blue.50"
    },
    {
        label: "Conversion Rate",
        value: "23.4%",
        change: "+3.2%",
        changeType: "positive",
        icon: FiTrendingUp,
        iconColor: "orange.500",
        iconBg: "orange.50"
    },
    {
        label: "Revenue (30d)",
        value: "$45.2K",
        change: "+18.3%",
        changeType: "positive",
        icon: FiDollarSign,
        iconColor: "green.500",
        iconBg: "green.50"
    }
]

export const mockCampaigns: Campaign[] = [
    {
        name: "Summer Sale 2025",
        type: "Email",
        startDate: "3 days ago",
        status: "Active",
        metric: "2,341 sent"
    },
    {
        name: "Product Launch - OnTarget Pro",
        type: "Cold Calling",
        startDate: "1 week ago",
        status: "Active",
        metric: "456 calls"
    },
    {
        name: "Retargeting Campaign",
        type: "Social Media",
        startDate: "5 days ago",
        status: "Paused",
        metric: "$1.2K spent"
    },
    {
        name: "Q3 Lead Generation",
        type: "Mixed",
        startDate: "2 weeks ago",
        status: "Active",
        metric: "89 leads"
    }
]

export const mockRecentCalls: RecentCall[] = [
    {
        name: "John Doe",
        initials: "JD",
        time: "2 hours ago",
        duration: "12:34"
    },
    {
        name: "Sarah Martinez",
        initials: "SM",
        time: "3 hours ago",
        duration: "8:45"
    },
    {
        name: "Robert Johnson",
        initials: "RJ",
        time: "4 hours ago",
        duration: "15:22"
    },
    {
        name: "Maria Kim",
        initials: "MK",
        time: "5 hours ago",
        duration: "6:18"
    },
    {
        name: "Alex Lee",
        initials: "AL",
        time: "6 hours ago",
        duration: "22:05"
    },
    {
        name: "Carlos Brown",
        initials: "CB",
        time: "8 hours ago",
        duration: "9:33"
    }
]
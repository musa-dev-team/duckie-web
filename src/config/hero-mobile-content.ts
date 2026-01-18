/**
 * Hero Section - Mobile Content
 * 
 * Shorter, punchier content optimized for mobile screens.
 * Message sequences are condensed for quicker cycles on mobile.
 */

// Message types for the animated feed
export type MessageType = 'customer' | 'action' | 'response' | 'resolved'

export interface Message {
  id: number
  type: MessageType
  content: string
  detail?: string
}

// Mobile-optimized message sequences - shorter, faster cycles
export const mobileMessageSequences: Message[][] = [
  [
    { id: 1, type: 'customer', content: "Can't log in, keeps saying wrong password", detail: 'Sarah · Now' },
    { id: 2, type: 'action', content: 'Checking account...', detail: '3 failed attempts' },
    { id: 3, type: 'response', content: "Unlocked! Password reset sent to your email.", detail: '' },
    { id: 4, type: 'resolved', content: 'Resolved', detail: '32s' },
  ],
  [
    { id: 1, type: 'customer', content: 'Need a refund, product arrived damaged', detail: 'Mike · 2m ago' },
    { id: 2, type: 'action', content: 'Processing refund...', detail: '$94.99' },
    { id: 3, type: 'response', content: "Done! Refund issued, 3-5 business days.", detail: '' },
    { id: 4, type: 'resolved', content: 'Resolved', detail: '41s' },
  ],
  [
    { id: 1, type: 'customer', content: "How do I add a team member?", detail: 'Alex · Now' },
    { id: 2, type: 'action', content: 'Checking plan...', detail: '1 seat available' },
    { id: 3, type: 'response', content: "Settings → Team → Invite. Want me to send the link?", detail: '' },
    { id: 4, type: 'resolved', content: 'Resolved', detail: '18s' },
  ],
]

// Mobile hero copy - shorter for small screens
export const mobileHeroContent = {
  headline: {
    line1: "AI that",
    highlight: "closes tickets",
  },
  subheadline: "Not just answers · real actions",
  cta: {
    placeholder: "Work email",
    buttonText: "Let's chat",
  },
}

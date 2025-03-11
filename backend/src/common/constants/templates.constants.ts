export const TEMPLATES = {
  'welcome-fresh': {
    id: '1',
    slug: 'welcome-fresh',
    message:
      "Welcome to KatKin, <full-name>! We're super excited for <cat-names> to join the KatKin club and start loving fresh!",
  },
  'your-next-delivery': {
    id: '2',
    slug: 'your-next-delivery',
    title: 'Your next delivery for <cat-names>',
    message:
      "Hey <full-name>! In two days' time, we'll be charging you for your next order for <cat-names>'s fresh food.",
  },
} as const;

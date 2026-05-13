export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: 'Lutho Ntloko',
    role: 'CEO',
    image: '/6.jpg',
    bio: 'CIMA winner and BCom graduate. Spends most of his time figuring out how to keep campus essentials cheap and the business honest.',
  },
  {
    name: 'Aviwe Xaluva',
    role: 'Head of Marketing',
    image: '/7.jpg',
    bio: 'Has built youth brands for Red Bull, Rocking the Daisies, and SABC. Now focused on telling the campus story in plain English.',
  },
  {
    name: 'Blessing Mpafa',
    role: 'CFO',
    image: '/8.png',
    bio: 'Works in wealth management at a major South African bank. Makes sure every rand uTap moves has a number behind it.',
  },
  {
    name: 'Ayabonga Qwabi',
    role: 'CTO',
    image: '/9.png',
    bio: 'Nine years building apps in insurance, healthcare, and fintech. Founder of Namoota and a Project CodeX graduate.',
  },
];

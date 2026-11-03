export type ArtVariant = 'arch' | 'strata' | 'grid' | 'orbit' | 'topo' | 'waves'

export interface Project {
  id: string
  title: string
  kind: string
  year: string
  client: string
  services: string[]
  summary: string
  detail: string[]
  metric: { value: string; label: string }
  art: ArtVariant
}

export const projects: Project[] = [
  {
    id: 'atlas-ceramics',
    title: 'Atlas Ceramics',
    kind: 'Brand site & art direction',
    year: '2025',
    client: 'Atlas Ceramics',
    services: ['Art direction', 'Web design', '3D'],
    summary: 'A quiet home for a studio that still makes every piece by hand.',
    detail: [
      'Atlas needed a shop that felt like walking into their workshop — warm, unhurried, a little dusty in the best way. The catalogue behaves like a shelf: pieces sit still until you ask them to move.',
      'Ten hero pieces are rendered in a single lightweight 3D viewer, with the rest kept as stills. The studio publishes new work itself now, without touching code.',
    ],
    metric: { value: '3×', label: 'enquiries in the first quarter' },
    art: 'arch',
  },
  {
    id: 'northwind-journal',
    title: 'Northwind Journal',
    kind: 'Editorial platform',
    year: '2025',
    client: 'Northwind',
    services: ['Design system', 'Front-end', 'Illustration'],
    summary: 'An independent journal about the north, built to be read slowly.',
    detail: [
      'Long essays, field notes and photography from above the treeline. We rebuilt the reading experience around a single quiet column, generous margins and a type scale that stays out of the way.',
      'Editors assemble issues from a small set of composable blocks. Nothing needs a developer, and nothing looks like a template.',
    ],
    metric: { value: '24k', label: 'readers each month' },
    art: 'strata',
  },
  {
    id: 'ferra-house',
    title: 'Ferra House',
    kind: 'Property experience with 3D walkthrough',
    year: '2024',
    client: 'Ferra Living',
    services: ['3D', 'Interaction', 'Web design'],
    summary: 'One building, three ways to understand it before you visit.',
    detail: [
      'A slow, cinematic introduction to nine apartments — plan, material study and walkthrough, all in the same frame. The model streams in as you move, so the first paint never waits for the building.',
      'Sales enquiries now arrive pre-qualified, with the apartment the client was actually looking at attached.',
    ],
    metric: { value: '2.1×', label: 'viewing requests' },
    art: 'grid',
  },
  {
    id: 'saltwater-swim',
    title: 'Saltwater Swim',
    kind: 'Product configurator',
    year: '2024',
    client: 'Saltwater',
    services: ['3D', 'Front-end', 'Design'],
    summary: 'Forty colourways, one interface, no compromise on load time.',
    detail: [
      'Swimwear is a fitting problem before it is a shopping problem. We built a configurator that shows fabric, cut and colour together, with a single shared 3D asset instead of forty.',
      'Everything is keyboard-operable, and the whole configurator ships in under 90kb of JavaScript.',
    ],
    metric: { value: '1.2s', label: 'first contentful paint' },
    art: 'orbit',
  },
  {
    id: 'fold-and-form',
    title: 'Fold & Form',
    kind: 'Design system & documentation',
    year: '2023',
    client: 'Fold & Form',
    services: ['Design system', 'Documentation'],
    summary: 'A shared language for a studio of eleven designers.',
    detail: [
      'Two product teams were inventing the same button twice. We audited the interface, reduced it to a set of foundations, and wrote the rest down properly.',
      'The library is documented by example: every component has an opinion, a rule and a reason attached to it.',
    ],
    metric: { value: '62', label: 'documented components' },
    art: 'topo',
  },
  {
    id: 'lumen-radio',
    title: 'Lumen Radio',
    kind: 'Independent streaming site',
    year: '2023',
    client: 'Lumen',
    services: ['Web design', 'Motion', 'Front-end'],
    summary: 'A late-night station with a visual identity you can hear.',
    detail: [
      'Lumen broadcasts from a converted garage and needed a home that sounded like it looked. The identity moves with the audio, shifting temperature between shows and hours.',
      'Listeners can keep the player running while they browse, and the site remembers where they left off.',
    ],
    metric: { value: '9k', label: 'weekly listeners' },
    art: 'waves',
  },
]

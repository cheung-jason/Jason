const blogPosts = [
  {
    id: 1,
    slug: 'My First Pour Over Coffee Competition',
    title: 'My First Pour Over Coffee Competition',
    image: process.env.PUBLIC_URL + '/images/blog/the-bac-brewing-competition.JPG',
    category: 'Coffee',
    link: '/blog/My First Pour Over Coffee Competition',
    date: '2025-06-01',
    content: [
      'I saw this and I immediately jumped on this opportunity to compete in this pour-over competition hosted by the Bay Area Coffee (BAC) club. I happened to be in the Bay Area at the time while on vacation, so I decided why not. I was familiar with Moonwake Coffee Roasters and thought it was be a fun thing to try.',
      'Although I did not win, it was cool to see other pouring styles. Everyone had their own unique style and I got alot of feedback from the judges regarding what they liked and disliked about my pour. They said it was a really delicious cup and it was really hard to choose the winner of the round I lost. What ultimately decided the winner was how the coffee tasted when it cooled down and the other competitor just edged me slightly.',
      'It was a fun experience regardless and I got to taste super delicious coffee.',
      'Featured coffee: cafe granja la esperanza finca potosi honey sidra',
      'My recipe-',
      [
        'Dripper: Origami Dripper Air S',
        'Filter: Origami Paper Filter',
        'Kettle: Fellow Stagg EKG',
        'Scale: MHW-3BOMBER Cube Coffee Scale 2.0 Mini',
        'Grinder: Comandante C40',
        'Ratio: 1:16.6 (20g coffee, 200g water)',
        'Temperature: 199F',
        'Grind: medium-coarse',
        'Pours: 50g bloom (20s), 50g * 3 pours',
        'Total brew time: 2-2:30 minutes'
      ],
      'For this, I liked a circle pour, from center to outer, just aggressive enough to disturb the ground bed, but not too much aggitation. I like to place the spout closer to the coffee bed as close to the dripper as possible and wait until the water is nearly reaching the coffee bed before next pour.'
    ]
  },
  {
    id: 2,
    title: '2024 Retrospective: A Year in Review',
    image: process.env.PUBLIC_URL + '/images/blog/2024_retrospective/2024-retrospective.jpg',
    category: 'Coffee',
    link: '/blog/2024-retrospective-a-year-in-review',
    slug: '2024-retrospective-a-year-in-review',
    date: '2025-06-26',
    content: [
      "Sorry, I didn't do the best job logging in the coffee I purchased in 2024. That said, I tried my best to capture accurate information when available. There are some gaps which I might not know such as the origin of coffee in blends or what variety of coffee it is when it's not labeled on the bag. In 2024, I purchased 36 bags (presumably more not captured) of coffee from 18 different roasters, totaling around ~9 kilograms of coffee.",
      "Lets dive deeper...",
      "My home setup-",
      [
        'Dripper: Origami Dripper Air S, Hario V60 02, April Plastic Dripper',
        'Filter Paper: Origami Paper Filter',
        'Kettle: Fellow Stagg EKG',
        'Scale: Brita Pitcher of Filtered Tap Water',
      ],
      { type: 'image', src: process.env.PUBLIC_URL + '/images/blog/2024_retrospective/roasters_tried_this_year.png', alt: 'Roasters Tried This Year' },
      "There's 18 roasters I tried this year and I bought a couple of bags from each of them. This is my first year trying many of these roasters and I have a few in mind to purchase more of.",
      "Drum roll please...",
      "My top 3 roasters/coffees of 2024-",
      '1. Elixr Coffee Roasters - Juan Pena Washed Typica from Ecuador',
      '2. LiLo Coffee Roasters - Finca Villa Maria Co-ferment Geisha from Colombia',
      '3. September Coffee Co. - Pink Lemonade Washed Pink Bourbonfrom Colombia',
      { type: 'image', src: process.env.PUBLIC_URL + '/images/blog/2024_retrospective/countries_of_roasters_tried_this_year.png', alt: 'countries_of_roasters_tried_this_year' },
      "I purchased alot of coffee online from different roasters in US and Canada. Few International roasters were through Fellow Drops which is a coffee subscription service. Lastly, I managed to convince my friends and family to bring back coffee from whereever they travelled!",
      { type: 'image', src: process.env.PUBLIC_URL + '/images/blog/2024_retrospective/top_coffee_origin_countries_by_purchase.png', alt: 'top_coffee_origin_countries_by_purchase' },
      { type: 'image', src: process.env.PUBLIC_URL + '/images/blog/2024_retrospective/top_coffee_varietals_by_purchase.png', alt: 'top_coffee_varietals_by_purchase' },
      "If you can't tell what i like from these bar charts, I'll just say I like coffee that is sweet, stonefruit-y, and has nice clarity. Most of these are Geisha and Pink Bourbon varietals from Colombia for sure. African coffees are also good but they taste a little too fruity and not enough florals. These new SL (28, 34, etc.) and 74XXX (74110, 74112, etc.) varietals are also interesting but I need to try more to have a better assessment of where I rank them.",
      { type: 'image', src: process.env.PUBLIC_URL + '/images/blog/2024_retrospective/coffee_purchased_by_roast_and_process.png', alt: 'coffee_purchased_by_roast_and_process' },
      "Ahhhhhh, typical light roast coffee snobbery right here. I promise to expand my palate in 2025 and try more variety besides washed Geisha and Pink Bourbons. Otherwise, this is an interesting heatmap clearly showing which side I learn more towards.",
      { type: 'image', src: process.env.PUBLIC_URL + '/images/blog/2024_retrospective/tasting_notes_word_cloud.png', alt: 'tasting_notes_word_cloud' },
      "Tasting notes are cool, I guess I like my coffees with Florals and Kiwi and Honeydew. If you look carefully, I still drink coffee that labels with chocolate and nuts, and caramerl. Cheer's to a great 2024 and here's to a great 2025!",
      { type: 'link', text: "p.s Here's raw data file for y'all nerds out there", href: process.env.PUBLIC_URL + '/data/2024_coffee_data.csv' },
    ]
  }
];

export default blogPosts; 
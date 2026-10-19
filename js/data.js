/* ==========================================================
   data.js - project data
   An ARRAY of OBJECTS describing each experience.
   Prices are SAMPLE values for this class project only.
   ========================================================== */

const attractions = [
  {
    id: "dunns-river-falls",
    name: "Dunn's River Falls",
    parish: "St. Ann",
    category: "Adventure",
    difficulty: "Moderate",
    price: 25,          // number: sample price per guest (USD)
    duration: 3,        // number: hours
    rating: 4.8,        // number
    featured: true,     // boolean
    summary: "Climb a terraced waterfall that flows right into the Caribbean Sea.",
    description:
      "Dunn's River Falls near Ocho Rios is one of Jamaica's best-known natural attractions. Visitors can climb the cascading limestone terraces with a guide, usually in a human chain, and finish at the beach below.",
    tips: ["Wear water shoes with a good grip", "Bring a waterproof bag for valuables", "Go early to avoid the biggest crowds"],
    image: "images/dunns-river-falls.jpg",
    alt: "Water cascading over the stepped rocks of Dunn's River Falls"
  },
  {
    id: "blue-mountain-peak",
    name: "Blue Mountain Peak Sunrise Hike",
    parish: "Portland / St. Thomas",
    category: "Adventure",
    difficulty: "Challenging",
    price: 60,
    duration: 8,
    rating: 4.9,
    featured: true,
    summary: "Hike before dawn to Jamaica's highest point for a sunrise above the clouds.",
    description:
      "Blue Mountain Peak is the highest point in Jamaica at roughly 2,250 metres. Guided hikes usually start in the middle of the night so you reach the summit for sunrise, with a chance of views toward Cuba on very clear mornings.",
    tips: ["Pack warm layers - it gets cold at the top", "Bring a headlamp and water", "Book a licensed guide"],
    image: "images/blue-mountain-peak.jpg",
    alt: "Forested ridges of the Blue Mountains under a hazy blue sky"
  },
  {
    id: "seven-mile-beach",
    name: "Negril Seven Mile Beach",
    parish: "Westmoreland",
    category: "Beach",
    difficulty: "Easy",
    price: 15,
    duration: 4,
    rating: 4.7,
    featured: true,
    summary: "Soft white sand, calm water and some of the best sunsets on the island.",
    description:
      "Negril's long beach is known for its relaxed atmosphere and sunsets. It is a good choice for swimming, paddle-boarding, snorkelling or simply relaxing with a cold drink and live music nearby.",
    tips: ["Apply reef-safe sunscreen", "Stay for the sunset", "Agree prices before booking water-sport activities"],
    image: "images/seven-mile-beach.jpg",
    alt: "White sand and turquoise water on Seven Mile Beach, Negril"
  },
  {
    id: "bob-marley-museum",
    name: "Bob Marley Museum",
    parish: "Kingston",
    category: "Culture",
    difficulty: "Easy",
    price: 20,
    duration: 2,
    rating: 4.6,
    featured: false,
    summary: "Tour the Kingston home and studio where reggae history was made.",
    description:
      "Located on Hope Road in Kingston, the museum is in the former home of Bob Marley. Guided tours share the story of his life and music and show the recording studio and exhibits about the Rastafari-inspired roots of reggae.",
    tips: ["Tours run in guided groups, so arrive early", "Photography rules vary inside, so ask your guide", "Combine with other Kingston stops"],
    image: "images/bob-marley-museum.jpg",
    alt: "Bob Marley Museum building with murals of Bob Marley in Kingston"
  },
  {
    id: "boston-bay-jerk",
    name: "Boston Bay Jerk Trail",
    parish: "Portland",
    category: "Food",
    difficulty: "Easy",
    price: 12,
    duration: 2,
    rating: 4.8,
    featured: false,
    summary: "Taste smoky jerk chicken and pork at the roadside home of jerk.",
    description:
      "Boston Bay in Portland is widely considered the birthplace of jerk cooking. Open-air jerk centres slow-cook seasoned meat over pimento wood, and you can eat it with festival, bammy or breadfruit.",
    tips: ["Ask for the spice level you want", "Bring cash", "Try the jerk pork with festival"],
    image: "images/boston-bay-jerk.jpg",
    alt: "Boston Jerk Centre, a roadside jerk spot in Portland"
  },
  {
    id: "ys-falls",
    name: "YS Falls",
    parish: "St. Elizabeth",
    category: "Nature",
    difficulty: "Easy",
    price: 22,
    duration: 4,
    rating: 4.7,
    featured: false,
    summary: "Swim in cool pools and swing from a rope into a tiered waterfall.",
    description:
      "YS Falls in St. Elizabeth is a multi-level waterfall surrounded by gardens and forest. It is popular for swimming, tractor rides through the property and the rope swing over the river.",
    tips: ["Bring a change of clothes", "Wear water shoes", "Check opening days before you go"],
    image: "images/ys-falls.jpg",
    alt: "Tiered waterfalls and a wide pool at YS Falls surrounded by forest"
  },
  {
    id: "luminous-lagoon",
    name: "Luminous Lagoon Night Tour",
    parish: "Trelawny",
    category: "Nature",
    difficulty: "Easy",
    price: 35,
    duration: 2,
    rating: 4.9,
    featured: false,
    summary: "Watch the water glow around your boat after dark.",
    description:
      "Near Falmouth, the Luminous Lagoon glows at night because of tiny organisms called dinoflagellates that light up when the water is disturbed. Evening boat tours let you see the glow around the boat and in your hands.",
    tips: ["Go on a dark, moonless night for the best glow", "Wear swimwear if you plan to swim", "Skip insect repellent in the water"],
    image: "images/luminous-lagoon.jpg",
    alt: "Water glowing bright blue along a shoreline at night"
  },
  {
    id: "port-royal",
    name: "Port Royal Historic Tour",
    parish: "Kingston",
    category: "Culture",
    difficulty: "Easy",
    price: 18,
    duration: 3,
    rating: 4.5,
    featured: false,
    summary: "Explore the old pirate port that was partly swallowed by the sea.",
    description:
      "Port Royal was a major port in the 1600s and was badly damaged by the 1692 earthquake, when part of the town slid into the sea. Today you can visit Fort Charles and local museums and learn about its pirate-era history.",
    tips: ["Wear a hat - there is limited shade", "Finish with fresh fish at a local restaurant", "Travel by road or take the boat from Kingston"],
    image: "images/port-royal.jpg",
    alt: "Brick fort walls and old cannons at Port Royal"
  },
  {
    id: "pelican-bar",
    name: "Floyd's Pelican Bar",
    parish: "St. Elizabeth",
    category: "Beach",
    difficulty: "Easy",
    price: 30,
    duration: 3,
    rating: 4.6,
    featured: false,
    summary: "Take a boat to a bar built on stilts in the middle of the sea.",
    description:
      "Off the south coast near Parottee, Floyd's Pelican Bar sits on a sandbar in shallow water. Boat rides take you out to the colourful wooden bar where you can swim, eat fresh seafood and relax.",
    tips: ["Bring cash for food and drinks", "Wear a life jacket on the boat", "Sea conditions can change, so check with your boat captain"],
    image: "images/pelican-bar.jpg",
    alt: "Thatched-roof Floyd's Pelican Bar on stilts in turquoise water"
  }
];

/* Short facts shown by the "Surprise me" button on the home page */
const islandFacts = [
  "Jamaica is widely recognised as the birthplace of reggae music.",
  "Jamaica became an independent country on 6 August 1962.",
  "Blue Mountain Peak is the island's highest point at roughly 2,250 metres.",
  "Jerk is traditionally cooked slowly over pimento (allspice) wood.",
  "Port Royal was once called the 'wickedest city on Earth' before the 1692 earthquake.",
  "The Luminous Lagoon glows because of microscopic organisms in the water."
];

/* Sample settings used by the trip estimate calculator */
const PICKUP_FEE = 15;          // flat fee per booking if hotel pickup is chosen
const GROUP_SIZE_FOR_DISCOUNT = 5;
const GROUP_DISCOUNT = 0.1;     // 10% off for groups
const MAX_GUESTS = 20;

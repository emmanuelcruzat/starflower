export const DECISIONS = [
  {
    id: "starter_budget",
    type: "incident",
    title: "Budget Shortfall",
    prompt:
      "Revenue projections have fallen short. The cabinet demands action.",
    options: [
      {
        id: "industry",
        label: "Subsidize Heavy Industry",
        description:
          "Only investments in our domestic industry will allow the economy to recover.",
        effects: { economy: 2, stability: -1 },
        log: "Industry was subsidized, angering parts of the populace.",
      },
      {
        id: "welfare",
        label: "Expand Social Programs",
        description:
          "We should provide more support to citizens impacted by the economic downturn.",
        effects: { stability: 2, economy: -1 },
        log: "Social programs were expanded at the cost of economic growth.",
      },
    ],
    author: "E. Cruzat",
    series: "A",
  },
  {
    id: "hypernukes",
    type: "incident",
    title: "Hypernuclear Bomb Testing",
    prompt:
      "The neighboring nation of Hanatono has been conducting hypernuclear bomb testing in nearby systems. Your nation's leading medical experts warn of celestial radiation clouds drifting into your territory, leading to higher cancer rates. Multiple high profile individuals are demanding action.",
    options: [
      {
        id: "diplomatic_response",
        label: "Demand Hanatono Cease Weapons Testing",
        description: "Surely a strongly-worded message will get them to stop.",
        effects: { stability: -1, legitimacy: 1 },
        log: "The government sent a sharply-worded diplomatic note to Hanatono regarding hypernuclear weapons testing.",
      },
      {
        id: "domestic_hypernukes",
        label: "Begin Our Own Hypernuclear Bomb Development",
        description:
          "If they want to play this game, we can play it too. Order the military to begin development of our own hypernukes!",
        effects: { stability: -1, economy: 1 },
        log: "The nation is pursing hypernuclear parity with neighboring nations.",
      },
      {
        id: "military_response",
        label: "Perform a Preemptive Strike Against Hanatonan Hypernuke Caches",
        description:
          "Your top generals offer a third option: the Navy and Special Forces could strike Hanotonan weapons caches to put the issue to rest quickly. Dicussions of a protracted war were quickly dissmissed.",
        effects: { stability: -1, economy: -1, legitimacy: 3 },
        log: "The military launched a preemptive strike against Hanatono to prevent them from developing hypernukes.",
      },
      {
        id: "do_nothing",
        label: "This Will All Just Blow Over, Right?",
        effects: { stability: 1, economy: 1, legitimacy: -3 },
        description:
          "We can't risk destabilizing the local astropolitical landscape over this!",
        log: "The government provided no response to Hanotono's bomb tests, hoping things would just 'blow over.'",
      },
    ],
    author: "E. Cruzat",
    series: "A",
  },
  {
    id: "colony_regulations",
    type: "incident",
    title:
      "Tense Standoff Between Residents and Corporate Interests on New Colony",
    prompt:
      "A new colony in its inital stages of development has been hamstrung by a dispute between the first settlers and the Karuna Corporation. The settlers prefer a more slow-paced, agrarian lifestyle, but Karuna executives instead want to turn the colony into a major mining world. Unable to compromise, representatives of both groups have arrived at the national capital to make their case.",
    options: [
      {
        id: "support_colonists",
        label: "Back the Settlers",
        description:
          "The settlers were there first, they should have a say in how the colony is run.",
        effects: { stability: 1, legitimacy: 1, economy: -1 },
        log: "The government backed settler interests.",
      },
      {
        id: "support_karuna",
        label: "Back Corporate Interests",
        description:
          "The development of a new mining world could be a big boon to the national economy...",
        effects: { stability: -1, economy: 2 },
        log: "The government backed corporate interests.",
      },
      {
        id: "colonial_compromise",
        label: "Try to Please Both Parties",
        description:
          "Maybe with a bit more effort, the two sides might finally reach a compromise.",
        effects: { stability: 1, legitimacy: -1 },
        log: "The government attempted to force a compromise between settler and corporate interests.",
      },
    ],
    author: "E. Cruzat",
    series: "A",
  },
];

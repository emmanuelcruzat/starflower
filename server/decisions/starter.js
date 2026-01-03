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
        effects: { economy: 2, stability: -1 },
        log: "Industry was subsidized, angering parts of the populace.",
      },
      {
        id: "welfare",
        label: "Expand Social Programs",
        effects: { stability: 2, economy: -1 },
        log: "Social programs were expanded at the cost of economic growth.",
      },
    ],
  },
  {
    id: "hypernukes",
    type: "incident",
    title: "Hypernuclear Bomb Testing",
    prompt:
      "The neighboring nation of Hanatono has been conducting hypernuclear bomb testing in nearby systems. Your nation's leading medical experts warn of space radiation clouds drifting into your territory, leading to higher cancer rates. Multiple high profile individuals are demanding action.",
    options: [
      {
        id: "diplomatic_response",
        label: "Demand Hanatono Cease Weapons Testing",
        effects: { stability: -1, legitimacy: 1 },
        log: "The government sent a sharply-worded diplomatic note to Hanatono regarding hypernuclear weapons testing.",
      },
      {
        id: "domestic_hypernukes",
        label: "Begin Our Own Hypernuclear Bomb Development",
        effects: { stability: -1, economy: 1 },
        log: "The nation is pursing hypernuclear parity with neighboring nations.",
      },
      {
        id: "military_response",
        label: "Perform a Preemptive Strike Against Hanatonan Hypernuke Caches",
        effects: { stability: -1, economy: -1, legitimacy: 3 },
        log: "The military launched a preemptive strike against Hanatono to prevent them from developing hypernukes.",
      },
      {
        id: "do_nothing",
        label: "This Will All Just Blow Over, Right?",
        effects: { stability: 1, economy: 1, legitimacy: -3 },
        log: "The government provided no response to Hanotono's bomb tests, hoping things would just 'blow over.'",
      },
    ],
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
        label: "The Colonists Were There First, Back Their Claim",
        effects: { stability: 1, legitimacy: 1, economy: -1 },
        log: "The government backed settler interests.",
      },
      {
        id: "support_karuna",
        label:
          "A New Mining World Could Be a Big Boon to the Economy, Back Corporate Interests",
        effects: { stability: -1, economy: 2 },
        log: "The government backed corporate interests.",
      },
      {
        id: "colonial_compromise",
        label: "Try to Please Both Parties",
        effects: { stability: 1, legitimacy: -1 },
        log: "The government attempted to force a compromise between settler and corporate interests.",
      },
    ],
  },
];

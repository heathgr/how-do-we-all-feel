const config = {
  graphOrigin: [500, 500],
  graphRadius: 300,  //TODO rename to icon radius and create inidivual entries for each arc
  graphArcs: {
    statuses: {
      start: 135,
      end: 45,
      sankeyEndRadius: 190,
      sankeyWidth: 100,
    },
    ageRanges: {
      start: -45,
      end: 9,
      sankeyEndRadius: 200,
      sankeyWidth: 100,
    },
    genders: {
      start: 171,
      end: 207,
      sankeyEndRadius: 200,
      sankeyWidth: 100,
    },
  },
  overallTotal: {
    angle: 261,
    radius: 300,
  },
};

export default config;

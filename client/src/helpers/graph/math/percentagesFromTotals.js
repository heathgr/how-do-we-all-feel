const percentagesFromTotals = (totals) => ({
  ageRanges: {
    overall: totals.ageRangeTotals.overall.map(
      (ageRange) => ageRange / totals.overallCount
    ),
    byGender: totals.ageRangeTotals.byGender.map(
      (gender) => gender.map(
        (ageRange) => ageRange / totals.overallCount
      )
    ),
    byStatus: totals.ageRangeTotals.byStatus.map(
      (status) => status.map(
        (ageRange) => ageRange / totals.overallCount
      )
    ),
  },
  genders: {
    overall: totals.genderTotals.overall.map(
      (gender) => gender / totals.overallCount
    ),
    byAgeRange: totals.genderTotals.byAgeRange.map(
      (ageRange) => ageRange.map(
        (gender) => gender / totals.overallCount
      )
    ),
    byStatus: totals.genderTotals.byStatus.map(
      (status) => status.map(
        (gender) => gender / totals.overallCount
      )
    ),
  },
  statuses: {
    overall: totals.statusTotals.overall.map(
      (status) => status / totals.overallCount
    ),
    byAgeRange: totals.statusTotals.byAgeRange.map(
      (ageRange) => ageRange.map(
        (status) => status / totals.overallCount
      )
    ),
    byGender: totals.statusTotals.byGender.map(
      (gender) => gender.map(
        (status) => status / totals.overallCount
      )
    ),
  },
});

export default percentagesFromTotals;

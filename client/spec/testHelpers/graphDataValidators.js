import Joi from 'joi';
import genders from '../../../config/genders';
import statuses from '../../../config/statuses';
import ageRanges from '../../../config/ageRanges';

const svgDataRegex = /([mlhvcsqta]([\d\.\-]+z?,?)+)+/i;
const transformMatrixRegex = /matrix\((-?[\d]+\.?[\d]*,){5}(-?[\d]+\.?[\d]*)\)/;
const elementCount = genders.length + statuses.length + ageRanges.length;

const iconSchema = Joi.object().keys({
  data: Joi.string().regex(svgDataRegex).required(),
  style: Joi.object().keys({
    background: Joi.string(),
    color: Joi.string().required(),
  }).required(),
  transform: Joi.string().regex(transformMatrixRegex).required(),
});

const iconValidator = (icon) => {
  const res = Joi.validate(icon, iconSchema);

  return res.error ? false : true;
};

const textArcSchema = Joi.object().keys({
  pathData: Joi.string().regex(svgDataRegex).required(),
  style: Joi.object().keys({
    fill: Joi.string().required(),
    fontFamily: Joi.string().required(),
    fontSize: Joi.number().integer().required(),
  }).required(),
  text: Joi.string().required(),
  textId: Joi.string().required(),
});

const textArcValidator = (textArc) => {
  const res = Joi.validate(textArc, textArcSchema);

  return res.error ? false : true;
};

const sankeyStaticsSchema = Joi.object().keys({
  endNormals: Joi.array()
    .items(
      Joi.array()
      .items(
        Joi.number()
      )
      .length(2)
    )
    .length(elementCount)
    .required(),
  endPoints: Joi.array()
    .items(
      Joi.array()
      .items(
        Joi.number()
      )
      .length(2)
    )
    .length(elementCount)
    .required(),
  splitNormals: Joi.array()
    .items(
      Joi.array()
      .items(
        Joi.number()
      )
      .length(2)
    )
    .length(elementCount)
    .required(),
});

const sankeyStaticsValidator = (sankeyStatics) => {
  const res = Joi.validate(sankeyStatics, sankeyStaticsSchema);

  return res.error ? false : true;
};

const totalsSchema = Joi.object().keys({
  ageRangeTotals: Joi.object().keys({
      byGender: Joi.array()
        .items(
          Joi.array()
          .items(
            Joi.number().integer()
          )
          .length(ageRanges.length)
          .required()
        )
        .length(genders.length)
        .required(),
      byStatus: Joi.array()
        .items(
          Joi.array()
          .items(
            Joi.number().integer()
          )
          .length(ageRanges.length)
          .required()
        )
        .length(statuses.length)
        .required(),
      overall: Joi.array()
        .items(
          Joi.number().integer()
        )
        .length(ageRanges.length)
        .required(),
    }).required(),
  genderTotals: Joi.object().keys({
    byAgeRange: Joi.array()
      .items(
        Joi.array()
        .items(
          Joi.number().integer()
        )
        .length(genders.length)
        .required()
      )
      .length(ageRanges.length)
      .required(),
    byStatus: Joi.array()
      .items(
        Joi.array()
        .items(
          Joi.number().integer()
        )
        .length(genders.length)
        .required()
      )
      .length(statuses.length)
      .required(),
    overall: Joi.array()
      .items(
        Joi.number().integer()
      )
      .length(genders.length)
      .required(),
  }).required(),
  statusTotals: Joi.object().keys({
    byAgeRange: Joi.array()
      .items(
        Joi.array()
        .items(
          Joi.number().integer()
        )
        .length(statuses.length)
        .required()
      )
      .length(ageRanges.length)
      .required(),
    byGender: Joi.array()
      .items(
        Joi.array()
        .items(
          Joi.number().integer()
        )
        .length(statuses.length)
        .required()
      )
      .length(genders.length)
      .required(),
    overall: Joi.array()
      .items(
        Joi.number().integer()
      )
      .length(statuses.length)
      .required(),
  }).required(),
  overallCount: Joi.number().integer().required(),
});

const totalsValidator = (totals) => {
  const res = Joi.validate(totals, totalsSchema);

  return res.error ? false : true;
};

const startBadgeSchema = Joi.object().keys({
  backgroundColor: Joi.string().required(),
  count: Joi.number().integer().required(),
  radius: Joi.number().required(),
  transform: Joi.string().required(),
  fontColors: Joi.array().items(
    Joi.string()
  ).required(),
  fontFamilies: Joi.array().items(
    Joi.string()
  ).required(),
  fontSizes: Joi.array().items(
    Joi.number()
  ).required(),
  textLines: Joi.array().items(
    Joi.string(), Joi.number()
  ).required(),
  textPlacements: Joi.array().items(
    Joi.number()
  ).required(),
});

const startBadgeValidator = (startBadge) => {
  const res = Joi.validate(startBadge, startBadgeSchema);

  return res.error ? false : true;
};

const sankeySchema = Joi.object().keys({
  splitPathsData: Joi.array()
    .items(
      Joi.string().regex(svgDataRegex)
    )
    .length(elementCount)
    .required(),
  splitPathStyles: Joi.array()
    .items(
      Joi.object().keys({
        fill: Joi.string().required(),
        stroke: Joi.string().required(),
        strokeWidth: Joi.number().required(),
      })
    )
    .length(elementCount)
    .required(),
  startPathsData: Joi.array()
    .items(
      Joi.string().regex(svgDataRegex)
    )
    .length(3)
    .required(),
  startPathStyles: Joi.array()
    .items(
      Joi.object().keys({
        fill: Joi.string().required(),
        stroke: Joi.string().required(),
        strokeWidth: Joi.number().required(),
      })
    )
    .length(3)
    .required(),
  tipsData: Joi.array()
    .items(
      Joi.string().regex(svgDataRegex)
    )
    .length(elementCount)
    .required(),
  tipStyles: Joi.array()
    .items(
      Joi.object().keys({
        fill: Joi.string().required(),
        stroke: Joi.string().required(),
      })
    )
    .length(elementCount)
    .required(),
});

const sankeyValidator = (sankey) => {
  const res = Joi.validate(sankey, sankeySchema);

  if (res.error) console.log('fuck', res);

  return res.error ? false : true;
};

export {
  textArcValidator,
  iconValidator,
  sankeyStaticsValidator,
  totalsValidator,
  startBadgeValidator,
  sankeyValidator,
};

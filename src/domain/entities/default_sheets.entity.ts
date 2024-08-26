import { ColInfo } from 'xlsx-js-style';

export interface IDefaultSheet {
  ref: string;
  style: object;
}
const fontStyles = {
  name: 'Arial',
  sz: 10
};

const leftAlignment = {
  horizontal: 'left',
  wrapText: true
};

const centerAlignment = {
  horizontal: 'center',
  vertical: 'center',
  wrapText: true
};

const whiteFont = {
  color: { rgb: 'FFFFFF' },
  bold: true
};
const blueFont = {
  color: { rgb: '305496' },
  bold: true
};
const redFont = {
  color: { rgb: 'FF0000' },
  bold: true
};

const blackFont = {
  color: { rgb: '000000' }
};

const borderStyles = {
  top: { style: 'thin', color: { rgb: '000000' } },
  bottom: { style: 'thin', color: { rgb: '000000' } },
  left: { style: 'thin', color: { rgb: '000000' } },
  right: { style: 'thin', color: { rgb: '000000' } }
};
const fillStyle = (rgb: string) => ({
  fgColor: { rgb },
  patternType: 'solid'
});

//** Custom styles */

const redBoxStyle = {
  alignment: {
    ...centerAlignment,
    textRotation: 90
  },
  font: {
    ...fontStyles,
    ...whiteFont
  },
  wpx: 30,
  border: borderStyles,
  fill: fillStyle('FF0000')
};
const blueBoxStyle = {
  alignment: centerAlignment,
  font: {
    ...fontStyles,
    ...whiteFont
  },
  border: borderStyles,
  fill: fillStyle('1F4E78')
};

const blueMarineBoxStyle = {
  alignment: {
    ...leftAlignment,
    vertical: 'center'
  },
  font: {
    ...fontStyles,
    ...blueFont
  },
  border: borderStyles,
  fill: fillStyle('D9E1F2')
};

const blueMarineBoxStyleBlackFont = {
  alignment: {
    ...leftAlignment,
    vertical: 'center',
    wrapText: false
  },
  font: {
    ...fontStyles,
    ...blackFont,
    bold: true
  },
  border: borderStyles,
  fill: fillStyle('D9E1F2')
};
const gray700BoxStyle = {
  alignment: {
    ...centerAlignment
  },
  font: {
    ...fontStyles,
    ...whiteFont
  },
  border: borderStyles,
  fill: fillStyle('757575')
};
const gray300BoxStyle = {
  alignment: {
    ...centerAlignment
  },
  font: {
    ...fontStyles,
    ...blackFont
  },
  border: borderStyles,
  fill: fillStyle('BFBFBF')
};

const orangeBoxStyle = {
  alignment: {
    ...leftAlignment
  },
  font: {
    ...fontStyles,
    ...blackFont,
    bold: true
  },
  border: borderStyles,
  fill: fillStyle('F8C491'),
  hpt: 40
};
const yellowBoxStyle = {
  alignment: {
    ...leftAlignment,
    vertical: 'center'
  },
  font: {
    ...fontStyles,
    ...blackFont
  },
  border: borderStyles,
  hpt: 40,
  wpx: 430,
  fill: fillStyle('FFF0C5')
};

export const DEFAULT_STYLES_PAGE1: IDefaultSheet[] = [
  {
    ref: 'A1',
    style: redBoxStyle
  },
  {
    ref: 'A2',
    style: redBoxStyle
  },
  {
    ref: 'A3',
    style: redBoxStyle
  },

  {
    ref: 'B1',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'B2',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'B3',
    style: {
      border: borderStyles
    }
  },

  {
    ref: 'D2',
    style: {
      algment: {
        vertical: 'top'
      },
      font: {
        bold: true
      }
    }
  },
  {
    ref: 'D8',
    style: {
      font: {
        bold: true
      }
    }
  },
  {
    ref: 'B10',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'C10',
    style: {
      alignment: centerAlignment,
      font: {
        ...fontStyles,
        ...whiteFont
      },
      border: borderStyles,
      fill: fillStyle('757575')
    }
  },
  {
    ref: 'D10',
    style: blueBoxStyle
  },
  {
    ref: 'E10',
    style: blueBoxStyle
  },
  {
    ref: 'F10',
    style: blueBoxStyle
  },
  {
    ref: 'G10',
    style: blueBoxStyle
  },
  {
    ref: 'H10',
    style: blueBoxStyle
  },
  {
    ref: 'I10',
    style: blueBoxStyle
  },
  {
    ref: 'J10',
    style: blueBoxStyle
  },
  {
    ref: 'B11',
    style: {
      alignment: leftAlignment,
      font: {
        ...fontStyles,
        ...blackFont,
        bold: true
      },
      border: borderStyles,
      fill: fillStyle('DDEBf7')
    }
  },
  {
    ref: 'C11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'D11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'E11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'F11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'G11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'H11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'I11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'J11',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'B12',
    style: {
      font: {
        ...fontStyles,
        ...blackFont,
        bold: true
      },
      border: borderStyles
    }
  },
  {
    ref: 'C12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'D12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'E12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'F12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'G12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'H12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'I12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'J12',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'B13',
    style: {
      font: {
        ...fontStyles,
        ...blackFont,
        bold: true
      },
      border: borderStyles
    }
  },
  {
    ref: 'C13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'D13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'E13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'F13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'G13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'H13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'I13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'J13',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'B14',
    style: {
      font: {
        ...fontStyles,
        ...blackFont,
        bold: true
      },
      border: borderStyles
    }
  },
  {
    ref: 'C14',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'D14',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'E14',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'F14',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'G14',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'H14',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'I14',
    style: {
      border: borderStyles
    }
  },
  {
    ref: 'J14',
    style: {
      border: borderStyles
    }
  }
];

const createOrangeBoxStyle = () => {
  const organgeCellRefs = [
    'C3',
    'C4',
    'C5',
    'C6',
    'C8',
    'C9',
    'C10',
    'C11',
    'C13',
    'C14',
    'C15',
    'C16',
    'C17',
    'C18',
    'C19',
    'C20',
    'C21',
    'C23',
    'C24',
    'C25',
    'C26',
    'C29',
    'C30',
    'E3',
    'E4',
    'E5',
    'E6',
    'E8',
    'E9',
    'E10',
    'E11',
    'E13',
    'E14',
    'E15',
    'E16',
    'E17',
    'E18',
    'E19',
    'E20',
    'E21',
    'E23',
    'E24',
    'E25',
    'E26',
    'E29',
    'E30'
  ];
  return organgeCellRefs.map((ref) => ({
    ref,
    style: orangeBoxStyle
  }));
};

const createYellowBoxStyle = () => {
  const yellowCellRefs = [
    'D3',
    'D4',
    'D5',
    'D6',
    'D8',
    'D9',
    'D10',
    'D11',
    'D13',
    'D14',
    'D15',
    'D16',
    'D17',
    'D18',
    'D19',
    'D20',
    'D21',
    'D23',
    'D24',
    'D25',
    'D26',
    'D29',
    'D30',
    'F3',
    'F4',
    'F5',
    'F6',
    'F8',
    'F9',
    'F10',
    'F11',
    'F13',
    'F14',
    'F15',
    'F16',
    'F17',
    'F18',
    'F19',
    'F20',
    'F21',
    'F23',
    'F24',
    'F25',
    'F26',
    'F29',
    'F30'
  ];
  return yellowCellRefs.map((ref) => ({ ref, style: yellowBoxStyle }));
};

const createBlueBoxStyle = () => {
  const blueCellRefs = [
    'B3',
    'B4',
    'B5',
    'B6',
    'B8',
    'B9',
    'B10',
    'B11',
    'B13',
    'B14',
    'B15',
    'B16',
    'B17',
    'B18',
    'B19',
    'B20',
    'B21',
    'B23',
    'B24',
    'B25',
    'B26',
    'B29',
    'B30'
  ];
  return blueCellRefs.map((ref) => ({
    ref,
    style: blueMarineBoxStyle
  }));
};

const createOnlyBorderStyle = () => {
  const GColumnsRefs = [
    'G3',
    'G4',
    'G5',
    'G6',
    'G8',
    'G9',
    'G10',
    'G11',
    'G13',
    'G14',
    'G15',
    'G16',
    'G17',
    'G18',
    'G19',
    'G20',
    'G21',
    'G23',
    'G24',
    'G25',
    'G26',
    'G29',
    'G30'
  ];
  const HColumnsRefs = [
    'H3',
    'H4',
    'H5',
    'H6',
    'H8',
    'H9',
    'H10',
    'H11',
    'H13',
    'H14',
    'H15',
    'H16',
    'H17',
    'H18',
    'H19',
    'H20',
    'H21',
    'H23',
    'H24',
    'H25',
    'H26',
    'H29',
    'H30'
  ];
  const IColumnsRefs = [
    'I3',
    'I4',
    'I5',
    'I6',
    'I8',
    'I9',
    'I10',
    'I11',
    'I13',
    'I14',
    'I15',
    'I16',
    'I17',
    'I18',
    'I19',
    'I20',
    'I21',
    'I23',
    'I24',
    'I25',
    'I26',
    'I29',
    'I30'
  ];
  const JColumnsRefs = [
    'J3',
    'J4',
    'J5',
    'J6',
    'J8',
    'J9',
    'J10',
    'J11',
    'J13',
    'J14',
    'J15',
    'J16',
    'J17',
    'J18',
    'J19',
    'J20',
    'J21',
    'J23',
    'J24',
    'J25',
    'J26',
    'J29',
    'J30'
  ];
  const KColumnsRefs = [
    'K3',
    'K4',
    'K5',
    'K6',
    'K8',
    'K9',
    'K10',
    'K11',
    'K13',
    'K14',
    'K15',
    'K16',
    'K17',
    'K18',
    'K19',
    'K20',
    'K21',
    'K23',
    'K24',
    'K25',
    'K26',
    'K29',
    'K30'
  ];
  const LColumnsRefs = [
    'L3',
    'L4',
    'L5',
    'L6',
    'L8',
    'L9',
    'L10',
    'L11',
    'L13',
    'L14',
    'L15',
    'L16',
    'L17',
    'L18',
    'L19',
    'L20',
    'L21',
    'L23',
    'L24',
    'L25',
    'L26',
    'L29',
    'L30'
  ];
  const MColumnsRefs = [
    'M3',
    'M4',
    'M5',
    'M6',
    'M8',
    'M9',
    'M10',
    'M11',
    'M13',
    'M14',
    'M15',
    'M16',
    'M17',
    'M18',
    'M19',
    'M20',
    'M21',
    'M23',
    'M24',
    'M25',
    'M26',
    'M29',
    'M30'
  ];
  const NColumnsRefs = [
    'N3',
    'N4',
    'N5',
    'N6',
    'N8',
    'N9',
    'N10',
    'N11',
    'N13',
    'N14',
    'N15',
    'N16',
    'N17',
    'N18',
    'N19',
    'N20',
    'N21',
    'N23',
    'N24',
    'N25',
    'N26',
    'N29',
    'N30'
  ];

  const ColumnsRefs = [
    ...GColumnsRefs,
    ...HColumnsRefs,
    ...IColumnsRefs,
    ...JColumnsRefs,
    ...KColumnsRefs,
    ...LColumnsRefs,
    ...MColumnsRefs,
    ...NColumnsRefs
  ];

  return ColumnsRefs.map((ref) => ({
    ref,
    style: {
      border: borderStyles
    }
  }));
};

export const DEFAULT_STYLES_PAGE2: IDefaultSheet[] = [
  {
    ref: 'A3',
    style: {
      font: redFont,
      border: borderStyles,
      alignment: {
        textRotation: 90
      }
    }
  },
  {
    ref: 'A6',
    style: {
      font: redFont,
      border: borderStyles,
      alignment: {
        textRotation: 90
      }
    }
  },
  {
    ref: 'A8',
    style: {
      font: redFont,
      border: borderStyles
    }
  },
  {
    ref: 'A13',
    style: {
      font: redFont,
      border: borderStyles
    }
  },
  {
    ref: 'A23',
    style: {
      font: redFont,
      border: borderStyles
    }
  },
  {
    ref: 'A29',
    style: {
      font: redFont,
      border: borderStyles
    }
  },
  {
    ref: 'C1',
    style: gray700BoxStyle
  },
  {
    ref: 'E1',
    style: gray700BoxStyle
  },
  {
    ref: 'C2',
    style: gray300BoxStyle
  },
  {
    ref: 'D2',
    style: gray300BoxStyle
  },
  {
    ref: 'E2',
    style: gray300BoxStyle
  },
  {
    ref: 'F2',
    style: gray300BoxStyle
  },
  {
    ref: 'G1',
    style: redBoxStyle
  },
  {
    ref: 'G2',
    style: blueMarineBoxStyleBlackFont
  },
  {
    ref: 'H2',
    style: blueMarineBoxStyleBlackFont
  },
  {
    ref: 'I2',
    style: blueMarineBoxStyleBlackFont
  },
  {
    ref: 'J2',
    style: blueMarineBoxStyleBlackFont
  },
  {
    ref: 'K2',
    style: blueMarineBoxStyleBlackFont
  },
  {
    ref: 'L2',
    style: blueMarineBoxStyleBlackFont
  },
  {
    ref: 'M2',
    style: blueMarineBoxStyleBlackFont
  },
  {
    ref: 'N2',
    style: blueMarineBoxStyleBlackFont
  },
  ...createOrangeBoxStyle(),
  ...createYellowBoxStyle(),
  ...createBlueBoxStyle(),
  ...createOnlyBorderStyle()
];

export const customWidths: ColInfo[] = [
  { wpx: 30 },
  { wpx: 160 },
  { wpx: 80 },
  { wpx: 180 },
  { wpx: 80 },
  { wpx: 160 },
  { wpx: 80 },
  { wpx: 80 },
  { wpx: 80 },
  { wpx: 80 },
  { wpx: 80 },
  { wpx: 80 },
  { wpx: 80 },
  { wpx: 80 }
];

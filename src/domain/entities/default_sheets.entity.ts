export interface IDefaultSheet {
  ref: string;
  style: object;
}
const fontStyles = {
  name: 'Arial',
  sz: 12
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
  weight: 'bold'
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
  alignment: leftAlignment,
  font: {
    ...fontStyles,
    ...whiteFont
  },
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
        weight: 'bold'
      }
    }
  },
  {
    ref: 'D8',
    style: {
      font: {
        weight: 'bold'
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
        weight: '700'
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
        weight: '700'
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
        weight: '700'
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
        weight: '700'
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

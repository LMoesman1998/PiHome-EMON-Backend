import moment from 'moment';

const fn = ({number, min, max, tag}, value) => {
  const val = parseFloat(value.slice(1, -1), 10);
  return val.toFixed(max);
};

const ln = ({number, tag}, value) => {
  const val = value.slice(1, -1);
};

const sn = ({number, tag}, value) => {
  const val = value.slice(1, -1);
  return val;
};

const tst = ({}, value) => {
  const val = value.slice(1, -1);
  const DST = val.slice(-1);
  let date = moment(val.slice(0, -1), 'YYMMDDhhmmss');
 
  if (DST == 'W') date = date.subtract(1, 'h');
  return date.toISOString(true);
};

const customPowerFailure = ({number, min, max, tag}, value) => {
  //1-0:99.97.0(1)(0-0:96.7.19)(180416085946S)(0000000346*s)\
  const hasFailure = value.slice(1, 2);
  value = value.slice(4);
  const values = value.split('(');
  for(let index = 0; index < 3; index++) {
    values[index] = values[index].slice(0, -1);
  };
  const timestamp = tst({}, `(${values[1]})`);
  const failureTime = fn({number, min, max, tag}, `(${values[2].slice(0, -2)})`)
  return `${timestamp},${failureTime}`; 
};

const obis = {
  '1-3:0.2.8': {
    name: "version",
    function: sn,
    functionInfo: {
      number: 2,
      tag: 9
    }
  },
  '0-0:1.0.0': {
    name: "timestamp",
    function: tst,
    functionInfo: {}
  },
  '0-0:96.1.1': {
    name: "identifier",
    function: sn,
    functionInfo: {
      number: 0,
      tag: 9
    }
  },
  '1-0:1.8.1': {
    name: "energy delivered tariff1",
    function: fn,
    functionInfo: {
      number: 9,
      min: 3,
      max: 3,
      tag: 6
    }
  },
  '1-0:1.8.2': {
    name: "energy delivered tariff2",
    function: fn,
    functionInfo: {
      number: 9,
      min: 3,
      max: 3,
      tag: 6
    }
  },
  '1-0:2.8.1': {
    name: "energy returned tariff1",
    function: fn,
    functionInfo: {
      number: 9,
      min: 3,
      max: 3,
      tag: 6
    }
  },
  '1-0:2.8.2': {
    name: "energy returned tariff2",
    function: fn,
    functionInfo: {
      number: 9,
      min: 3,
      max: 3,
      tag: 6
    }
  },
  '0-0:96.14.0': {
    name: "tariff",
    function: sn,
    functionInfo: {
      number: 4,
      tag: 9
    }
  },
  '1-0:1.7.0': {
    name: "power delivered",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '1-0:2.7.0': {
    name: "power returned",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '0-0:96.7.21': {
    name: "power failures",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '0-0:96.7.9': {
    name: "long power failures",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:99.97.0': {
    name: "power failure log",
    function: customPowerFailure,
    functionInfo: {
      number: 10,
      min: 0,
      max: 0,
      tag: 6
    }
  },
  '1-0:32.32.0': {
    name: "voltage sags l1",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:52.32.0': {
    name: "voltage sags l2",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:72.32.0': {
    name: "voltage sags l3",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:32.36.0': {
    name: "voltage swells l1",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:52.36.0': {
    name: "voltage swells l2",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:72.36.0': {
    name: "voltage swells l3",
    function: fn,
    functionInfo: {
      number: 5,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '0-0:96.13.0': {
    name: "message",
    function: sn,
    functionInfo: {
      number: 0,
      tag: 9
    }
  },
  '1-0:32.7.0': {
    name: "instantaneous voltage l1",
    function: fn,
    functionInfo: {
      number: 4,
      min: 1,
      max: 1,
      tag: 18
    }
  },
  '1-0:52.7.0': {
    name: "instantaneous voltage l2",
    function: fn,
    functionInfo: {
      number: 4,
      min: 1,
      max: 1,
      tag: 18
    }
  },
  '1-0:72.7.0': {
    name: "instantaneous voltage l3",
    function: fn,
    functionInfo: {
      number: 4,
      min: 1,
      max: 1,
      tag: 18
    }
  },
  '1-0:31.7.0': {
    name: "instantaneous current l1",
    function: fn,
    functionInfo: {
      number: 3,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:51.7.0': {
    name: "instantaneous current l2",
    function: fn,
    functionInfo: {
      number: 3,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:71.7.0': {
    name: "instantaneous current l3",
    function: fn,
    functionInfo: {
      number: 3,
      min: 0,
      max: 0,
      tag: 18
    }
  },
  '1-0:21.7.0': {
    name: "instantaneous power l1 p",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '1-0:41.7.0': {
    name: "instantaneous power l2 p",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '1-0:61.7.0': {
    name: "instantaneous power l3 p",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '1-0:22.7.0': {
    name: "instantaneous power l1 n",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '1-0:42.7.0': {
    name: "instantaneous power l2 n",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '1-0:62.7.0': {
    name: "instantaneous power l3 n",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },


  '0-1:24.1.0': {
    name: "device type",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '0-1:96.1.0': {
    name: "identifier gas",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },
  '0-1:24.2.1': {
    name: "value",
    function: fn,
    functionInfo: {
      number: 5,
      min: 3,
      max: 3,
      tag: 18
    }
  },

}

module.exports = {
  obis
}

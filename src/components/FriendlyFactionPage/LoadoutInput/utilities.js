import { LOADOUT_COMMANDS } from '../constants';

const getLoadoutCommandRegex = loadoutCommand =>
  new RegExp(
    `(?:for "_i" from (?<start>\\d+) to (?<end>\\d+) do \\{)?this (?<command>${loadoutCommand}) "(?<item>\\w+)"`,
    'gm',
  );

export const isStringLoadoutFromArsenal = str =>
  Object.keys(LOADOUT_COMMANDS).some(key => getLoadoutCommandRegex(key).test(str));

export const parseLoadoutFromArsenal = str =>
  Object.keys(LOADOUT_COMMANDS).reduce(
    (acc, key) => ({
      ...acc,
      [key]: [...str.matchAll(getLoadoutCommandRegex(key))]
        .map(match => match.groups)
        .reduce((str, { end, item }) => {
          if (end && isNaN(parseInt(end))) {
            str = `${str}${str.length ? ',' : ''}${Array.from(Array(parseInt(end)), () => item).join(',')}`;
          } else {
            str = `${str}${str.length ? ',' : ''}${item}`;
          }
          return str;
        }, ''),
    }),
    {},
  );

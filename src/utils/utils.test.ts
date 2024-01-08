import { chunk } from './chunk';
import { convertTimeToString } from './convert-time-to-string';
import { formatDate } from './format-date';
import { getRatingText } from './get-rating-text';
import { getStarringText } from './get-starring-text';
import { getTimeLeft } from './get-time-left';

describe('utils functions', () => {
  describe('function: chunk', () => {
    const dataTest = [
      {input: { sourceArray: [1, 2, 3, 4, 5, 6, 7, 8], chunkSize: 3 }, expected: [[1, 2, 3],[4, 5, 6],[7, 8]]},
      {input: { sourceArray: [], chunkSize: 2 }, expected: []},
      {input: { sourceArray: [], chunkSize: 0 }, expected: [[]]},
      {input: { sourceArray: [1, 2, 3], chunkSize: 5 }, expected: [[1, 2, 3]]},
      {input: { sourceArray: [1, 2, 3], chunkSize: 3 }, expected: [[1, 2, 3]]},
      {input: { sourceArray: [1, 2, 3, 4, 5], chunkSize: 0 }, expected: [[1, 2, 3, 4, 5]]},
    ];

    it.each(dataTest)(
      'should chunk $input.sourceArray into subarrays of size $input.chunkSize',
      ({input, expected}) =>{
        const result = chunk(input.sourceArray, input.chunkSize);

        expect(result).toEqual(expected);
      }
    );
  });

  describe('function: convertTimeToString', () => {
    const dataTest = [
      {input: 45, expected: '45m'},
      {input: 75, expected: '1h 15m'},
      {input: 120, expected: '2h 0m'},
      {input: 180, expected: '3h 0m'},
      {input: 0, expected: '0m'},
    ];

    it.each(dataTest)(
      'should return $expected for $input',
      ({input, expected}) =>{
        const result = convertTimeToString(input);

        expect(result).toBe(expected);
      }
    );
  });

  describe('function: formatDate', () => {
    const dataTest = [
      {input: '2023-12-15T12:30:00', expected: 'December 15, 2023'},
      {input: '2023-01-05T08:45:00', expected: 'January 5, 2023'},
      {input: '2023-10-20T18:15:00', expected: 'October 20, 2023'},
    ];

    it.each(dataTest)(
      'should return $expected for $input',
      ({input, expected}) =>{
        const result = formatDate(input);

        expect(result).toBe(expected);
      }
    );
  });

  describe('function: getRatingText', () => {
    const dataTest = [
      {input: 2, expected: 'Bad'},
      {input: 4, expected: 'Normal'},
      {input: 7, expected: 'Good'},
      {input: 9, expected: 'Very good'},
      {input: 10, expected: 'Awesome'},
      {input: 11, expected: ''},
    ];

    it.each(dataTest)(
      'should return $expected for $input',
      ({input, expected}) =>{
        const result = getRatingText(input);

        expect(result).toBe(expected);
      }
    );
  });

  describe('function: getStarringText', () => {
    const dataTest = [
      {input: ['Actor1'], expected: 'Actor1'},
      {input: ['Actor1', 'Actor2'], expected: 'Actor1 and Actor2'},
      {input: ['Actor1', 'Actor2', 'Actor3'], expected: 'Actor1, Actor2, Actor3'},
      {input: ['Actor1', 'Actor2', 'Actor3', 'Actor4', 'Actor5'], expected: 'Actor1, Actor2, Actor3 and other'},
      {input: [], expected: ''},
    ];

    it.each(dataTest)(
      'should return $expected for $input',
      ({input, expected}) =>{
        const result = getStarringText(input);

        expect(result).toBe(expected);
      }
    );
  });

  describe('function: getTimeLeft', () => {
    const dataTest = [
      {input: 3665, expected: '-01:01:05'},
      {input: 7325, expected: '-02:02:05'},
      {input: 0, expected: '-00:00'},
      {input: 120, expected: '-02:00'},
      {input: 1500, expected: '-25:00'},
      {input: 3600, expected: '-01:00:00'},
    ];

    it.each(dataTest)(
      'should return $expected for $input',
      ({input, expected}) =>{
        const result = getTimeLeft(input);

        expect(result).toBe(expected);
      }
    );
  });
});

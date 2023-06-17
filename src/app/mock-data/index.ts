export const mockResponse = {
  message: 'ok',
  total_records: 82,
  total_pages: 9,
  previous: null,
  next: 'https://www.swapi.tech/api/people?page=2&limit=10',
  results: [
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://www.swapi.tech/api/people/1',
    },
    {
      uid: '2',
      name: 'C-3PO',
      url: 'https://www.swapi.tech/api/people/2',
    },
    {
      uid: '3',
      name: 'R2-D2',
      url: 'https://www.swapi.tech/api/people/3',
    },
    {
      uid: '4',
      name: 'Darth Vader',
      url: 'https://www.swapi.tech/api/people/4',
    },
    {
      uid: '5',
      name: 'Leia Organa',
      url: 'https://www.swapi.tech/api/people/5',
    },
    {
      uid: '6',
      name: 'Owen Lars',
      url: 'https://www.swapi.tech/api/people/6',
    },
    {
      uid: '7',
      name: 'Beru Whitesun lars',
      url: 'https://www.swapi.tech/api/people/7',
    },
    {
      uid: '8',
      name: 'R5-D4',
      url: 'https://www.swapi.tech/api/people/8',
    },
    {
      uid: '9',
      name: 'Biggs Darklighter',
      url: 'https://www.swapi.tech/api/people/9',
    },
    {
      uid: '10',
      name: 'Obi-Wan Kenobi',
      url: 'https://www.swapi.tech/api/people/10',
    },
  ],
};
export const mockCharacterResponse = {
  message: 'ok',
  result: {
    properties: {
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      created: '2023-06-17T04:17:11.162Z',
      edited: '2023-06-17T04:17:11.162Z',
      name: 'Luke Skywalker',
      homeworld: 'https://www.swapi.tech/api/planets/1',
      url: 'https://www.swapi.tech/api/people/1',
    },
    description: 'A person within the Star Wars univers',
    _id: '5f63a36eee9fd7000499be42',
    uid: '1',
    __v: 0,
  },
};
export const mockPlanetResponse = {
  message: 'ok',
  result: {
    properties: {
      diameter: '10465',
      rotation_period: '23',
      orbital_period: '304',
      gravity: '1 standard',
      population: '200000',
      climate: 'arid',
      terrain: 'desert',
      surface_water: '1',
      created: '2023-06-17T04:17:11.165Z',
      edited: '2023-06-17T04:17:11.165Z',
      name: 'Tatooine',
      url: 'https://www.swapi.tech/api/planets/1',
    },
    description: 'A planet.',
    _id: '5f7254c11b7dfa00041c6fae',
    uid: '1',
    __v: 0,
  },
};

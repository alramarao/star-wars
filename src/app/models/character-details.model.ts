export interface CharacterDetailsResponse {
    message: string;
    result: CharacterDetails;
  }
  
  export interface CharacterDetails {
    properties: CharacterProperties;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  }
  
  export interface CharacterProperties {
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    created: string;
    edited: string;
    name: string;
    homeworld: string;
    url: string;
  }
  
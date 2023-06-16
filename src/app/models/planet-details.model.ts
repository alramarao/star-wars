export interface PlanetDetailsResponse {
    message: string;
    result: PlanetDetails;
  }
  
  export interface PlanetDetails {
    properties: PlanetProperties;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  }
  
  export interface PlanetProperties {
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surface_water: string;
    created: string;
    edited: string;
    name: string;
    url: string;
  }
  
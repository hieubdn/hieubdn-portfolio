export type GlobeMarker = {
  location: [number, number];
  size: number;
};

const MARKER_SIZE = 0.045;

export const VIETNAM_MARKER: GlobeMarker = {
  location: [16.0544, 108.2022],
  size: MARKER_SIZE,
};

export const TESTIMONIAL_GLOBE_MARKERS: GlobeMarker[] = [
  VIETNAM_MARKER,
  { location: [40.7128, -74.006], size: MARKER_SIZE }, // New York, USA
  { location: [34.0522, -118.2437], size: MARKER_SIZE }, // Los Angeles, USA
  { location: [19.4326, -99.1332], size: MARKER_SIZE }, // Mexico City, Mexico
  { location: [-23.5505, -46.6333], size: MARKER_SIZE }, // Sao Paulo, Brazil
  { location: [51.5072, -0.1276], size: MARKER_SIZE }, // London, UK
  { location: [25.2048, 55.2708], size: MARKER_SIZE }, // Dubai, UAE
  { location: [35.6762, 139.6503], size: MARKER_SIZE }, // Tokyo, Japan
  { location: [1.3521, 103.8198], size: MARKER_SIZE }, // Singapore
  { location: [-33.8688, 151.2093], size: MARKER_SIZE }, // Sydney, Australia
];

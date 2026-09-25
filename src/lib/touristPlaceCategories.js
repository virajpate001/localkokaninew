// src/lib/touristPlaceCategories.js
import {
  GiBeachBucket, GiTempleGate, GiMountainCave, GiWaterfall,
  GiCastle, GiForest, GiBoatFishing, GiHiking, GiIsland,
} from "react-icons/gi";
import { FiMapPin } from "react-icons/fi";

export const CATEGORY_OPTIONS = [
  "Beach", "Religious", "Historical", "Fort", "Waterfall",
  "Nature", "Adventure", "Island", "Boating", "Other",
];
 
const CATEGORY_ICONS = {
  Beach: GiBeachBucket,
  Religious: GiTempleGate,
  Historical: GiCastle,
  Fort: GiCastle,
  Waterfall: GiWaterfall,
  Nature: GiForest,
  Adventure: GiHiking,
  Island: GiIsland,
  Boating: GiBoatFishing,
};

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || FiMapPin;
}

const CATEGORY_COLORS = {
  Beach: "bg-secondary/10 text-secondary",
  Religious: "bg-accent/10 text-accent-dark",
  Historical: "bg-primary/10 text-primary",
  Fort: "bg-primary/10 text-primary",
  Waterfall: "bg-secondary/10 text-secondary",
  Nature: "bg-accent/10 text-accent-dark",
  Adventure: "bg-orange-50 text-orange-500",
  Island: "bg-secondary/10 text-secondary",
  Boating: "bg-secondary/10 text-secondary",
  Other: "bg-gray-100 text-gray-500",
};

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
}
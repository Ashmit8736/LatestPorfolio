import {
  Globe, Smartphone, TestTube2, Database, PenTool, Code2, Layout, Server, Wrench, Shield,
  ShoppingCart, HeartPulse, Building2, GraduationCap, Landmark, Hotel, Dumbbell, Trophy, Plane, Utensils,
} from 'lucide-react';

export const SERVICE_ICONS = {
  Globe, Smartphone, TestTube2, Database, PenTool, Code2, Layout, Server, Wrench, Shield,
};

export const INDUSTRY_ICONS = {
  ShoppingCart, HeartPulse, Building2, GraduationCap, Landmark, Hotel, Dumbbell, Trophy, Plane, Utensils,
};

export function getServiceIcon(name) {
  return SERVICE_ICONS[name] || Globe;
}

export function getIndustryIcon(name) {
  return INDUSTRY_ICONS[name] || Building2;
}

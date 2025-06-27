// Design System Tokens
export const colors = {
  primary: {
    main: 'blue-600',
    hover: 'blue-700',
    light: 'blue-50',
    dark: 'blue-800',
  },
  secondary: {
    main: 'purple-600',
    hover: 'purple-700',
    light: 'purple-50',
    dark: 'purple-800',
  },
  text: {
    primary: 'gray-800',
    secondary: 'gray-600',
    light: 'gray-400',
    white: 'white',
  },
  background: {
    primary: 'white',
    secondary: 'gray-50',
    dark: 'gray-900',
  },
} as const;

export const spacing = {
  container: 'container mx-auto px-4',
  section: 'py-20',
  card: 'p-8',
} as const;

export const typography = {
  h1: 'text-4xl md:text-5xl font-bold',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-bold',
  h4: 'text-xl md:text-2xl font-semibold',
  body: 'text-base md:text-lg',
  small: 'text-sm',
} as const;

export const components = {
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300',
  },
  input: 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300',
  card: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
  link: 'text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200',
} as const;

export const animations = {
  fadeIn: 'transition-opacity duration-300 ease-in-out',
  slideIn: 'transition-transform duration-300 ease-in-out',
  scale: 'transition-transform duration-300 ease-in-out hover:scale-105',
  hover: 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:text-gray-400',
} as const;

export const gradients = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
  secondary: 'bg-gradient-to-r from-purple-600 to-blue-600',
  dark: 'bg-gradient-to-r from-gray-800 to-gray-900',
} as const;

// Type definitions for design tokens
export type ColorToken = typeof colors;
export type SpacingToken = typeof spacing;
export type TypographyToken = typeof typography;
export type ComponentToken = typeof components;
export type AnimationToken = typeof animations;
export type GradientToken = typeof gradients; 
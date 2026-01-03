export const bangaloreLocations = [
  { value: 'whitefield', label: 'Whitefield' },
  { value: 'indiranagar', label: 'Indiranagar' },
  { value: 'yelahanka', label: 'Yelahanka' },
  { value: 'electronic-city', label: 'Electronic City' },
  { value: 'btm', label: 'BTM Layout' },
  { value: 'kr-puram', label: 'KR Puram' },
  { value: 'marathahalli', label: 'Marathahalli' },
  { value: 'hsr-layout', label: 'HSR Layout' }
]

export const getLocationLabel = (value: string): string => {
  const location = bangaloreLocations.find(loc => loc.value === value)
  return location ? location.label : value
}
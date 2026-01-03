export const ensureValidSelectValue = (value: string | undefined, options: Array<{value: string, label: string}>): string => {
  if (!value) return options[0]?.value || ''
  const isValid = options.some(option => option.value === value)
  return isValid ? value : options[0]?.value || ''
}

export const createSelectOptions = (items: string[], includeAll = false): Array<{value: string, label: string}> => {
  const options = items.map(item => ({
    value: item.toLowerCase().replace(/\s+/g, '-'),
    label: item
  }))
  
  if (includeAll) {
    options.unshift({ value: 'all', label: 'All' })
  }
  
  return options
}
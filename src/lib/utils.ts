export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const randomId = () => Math.random().toString(36).substring(2, 5);

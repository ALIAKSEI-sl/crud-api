export function getArguments() {
  const arg = process.argv[2];
  const obj: { horizontalScaling: string } = {
    horizontalScaling: 'disable',
  };
  if (arg) {
    const [key, value] = arg.split('=');
    const property = key.startsWith('--') ? key.slice(2) : key;
    obj[property] = value;
    return obj;
  } else {
    return obj;
  }
}
export function getArguments() {
  const arg = process.argv[2];
  const obj = {};
  const [key, value] = arg.split('=');
  const property = key.startsWith('--') ? key.slice(2) : key;
  obj[property] = value;
  return obj;
}
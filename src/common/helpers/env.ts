export function isSSR(): boolean {
  let result = false;
  try {
    result = Boolean(JSON.parse(process.env.SSR));
  } catch (e) {}
  return result;
}



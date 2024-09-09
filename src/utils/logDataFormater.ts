export const getDifferencesWithNewValues = (newObj: any, oldObj: any) => {
  const differences = {} as { [key: string]: any };

  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (typeof newObj[key] !== 'object' || newObj[key] === null) {
        if (oldObj.hasOwnProperty(key)) {
          if (newObj[key] !== oldObj[key]) {
            differences[key] = {
              old: oldObj[key],
              new: newObj[key]
            };
          }
        } else {
          differences[key] = {
            old: undefined,
            new: newObj[key]
          };
        }
      }
    }
  }

  for (const key in oldObj) {
    if (oldObj.hasOwnProperty(key) && !newObj.hasOwnProperty(key)) {
      // Property exists in oldObj but not in newObj
      if (typeof oldObj[key] !== 'object' || oldObj[key] === null) {
        differences[key] = {
          old: oldObj[key],
          new: undefined
        };
      }
    }
  }

  return differences;
};
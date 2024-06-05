interface ISorter<T> {
  property: keyof T
  isDescending?: boolean
}

const genericSort = <T>(a: T, b: T, propertyType: ISorter<T>) => {
  const { property, isDescending = false } = propertyType

  const result = () => {
    const valueA = String(a[property]).toLowerCase()
    const valueB = String(b[property]).toLowerCase()

    if (valueA > valueB) {
      return 1
    }

    if (valueA < valueB) {
      return -1
    }

    return 0
  }

  return isDescending ? result() * -1 : result()
}

export default genericSort

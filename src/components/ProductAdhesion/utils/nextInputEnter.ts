export const handleEnter = (event: any) => {
  if (event.key.toLowerCase() === "enter") {
    const form = event.target.form
    const index = [...form].indexOf(event.target)
    form.elements[index + 1].focus()
    event.preventDefault()
  }
}

export const copyContent = (text) => {
    navigator.clipboard.writeText(text).then(() => {
    }, (error) => {
      console.error('could not copy', error)
    })
  }
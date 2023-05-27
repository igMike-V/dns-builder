export const copyContent = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('copied to clipboard')
    }, (error) => {
      console.error('could not copy', error)
    })
  }
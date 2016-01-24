export function capitalize(word){
  let words = word.toLowerCase().split(' ')
  words = words.map((word) =>
    word.slice(0, 1).toUpperCase() + word.slice(1)
  )
  return words.join(" ")
}

var currentId = 0
export function uniqueId(){
  currentId++
  return currentId
}

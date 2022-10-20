const stories = document.querySelector('.stories')
const median = stories.offsetLeft + stories.clientWidth / 2

const state = {
  current_story: stories.firstElementChild.lastElementChild,
}

const setCurrentStory = (el) => {
  state.current_story = el
}

const smoothlyScrollToElement = (el) => {
  if (!el || !el.scrollIntoView) {
    return
  }
  el.scrollIntoView({
    behavior: 'smooth',
  })
}

const navigateStories = (direction) => {
  const story = state.current_story
  const isLastItemInUserStory = story.parentNode.firstElementChild === story
  const isFirstItemInUserStory = story.parentNode.lastElementChild === story
  const hasNextUserStory = !!story.parentElement.nextElementSibling
  const hasPrevUserStory = !!story.parentElement.previousElementSibling

  if (direction === 'next') {
    if (isLastItemInUserStory) {
      if (!hasNextUserStory) {
        return
      }
      setCurrentStory(story.parentElement.nextElementSibling.lastElementChild)
      smoothlyScrollToElement(story.parentElement.nextElementSibling)
    } else {
      story.classList.add('seen')
      setCurrentStory(story.previousElementSibling)
    }
  } else if (direction === 'prev') {
    if (isFirstItemInUserStory) {
      if (!hasPrevUserStory) {
        return
      }
      setCurrentStory(
        story.parentElement.previousElementSibling.firstElementChild
      )
      smoothlyScrollToElement(story.parentElement.previousElementSibling)
    } else {
      story.nextElementSibling.classList.remove('seen')
      setCurrentStory(story.nextElementSibling)
    }
  }
}

stories.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'ARTICLE') return

  navigateStories(e.clientX > median ? 'next' : 'prev')
})

// left & right are free with snap points 👍
document.addEventListener('keydown', ({ key }) => {
  if (key !== 'ArrowDown' || key !== 'ArrowUp')
    navigateStories(key === 'ArrowDown' ? 'next' : 'prev')
})

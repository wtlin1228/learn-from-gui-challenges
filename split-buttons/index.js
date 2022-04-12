/* -------------------------------------------------------------------------- */
/*                              Split Buttons                                 */
/* -------------------------------------------------------------------------- */

const splitButtons = document.querySelectorAll('.gui-split-button')

splitButtons.forEach((splitButton) => {
  splitButton.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'BUTTON') return
    console.info(e.target.innerText)
  })
})

/* -------------------------------------------------------------------------- */
/*                              Popup Buttons                                 */
/* -------------------------------------------------------------------------- */

const popupButtons = document.querySelectorAll('.gui-popup-button')

const state = new Map()
const isRtl =
  window.getComputedStyle(document.documentElement).direction === 'rtl'

const KEYCODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

// when container or children get focus
const onFocusin = (e) => {
  const { currentTarget: rover } = e
  if (state.get('last_active_rover') == rover) return
  if (state.has(rover)) {
    rover.setAttribute('aria-expanded', true)
    activate(rover, state.get(rover).active)
    state.set('last_active_rover', rover)
  }
}

const onFocusout = (e) => {
  const { currentTarget: rover } = e
  rover.setAttribute('aria-expanded', false)
}

const onKeydown = (e) => {
  const { currentTarget: rover } = e

  switch (e.keyCode) {
    case KEYCODE[isRtl ? 'LEFT' : 'RIGHT']:
    case KEYCODE.DOWN:
      e.preventDefault()
      focusNextItem(rover)
      break
    case KEYCODE[isRtl ? 'RIGHT' : 'LEFT']:
    case KEYCODE.UP:
      e.preventDefault()
      focusPreviousItem(rover)
      break
  }
}

const onKeyup = (e) => {
  if (e.code === 'Escape') e.target.blur()
}

const mo = new MutationObserver((mutationList, observer) => {
  mutationList
    .filter((x) => x.removedNodes.length > 0)
    .forEach((mutation) =>
      [...mutation.removedNodes]
        .filter((x) => x.nodeType === 1)
        .forEach((removedEl) => {
          state.forEach((val, key) => {
            if (key === 'last_rover') return
            if (removedEl.contains(key)) {
              key.removeEventListener('focusin', onFocusin)
              key.removeEventListener('focusin', onFocusout)
              key.removeEventListener('keydown', onKeydown)
              key.removeEventListener('keyup', onKeyup)

              state.delete(key)
              val.targets.forEach((a) => (a.tabIndex = ''))

              if (
                state.size === 0 ||
                (state.size === 1 && state.has('last_rover'))
              ) {
                state.clear()
                mo.disconnect()
              }
            }
          })
        })
    )
})

// (roving tabindex) control the tabIndex of popupButtons and their inner buttons
popupButtons.forEach((rover) => {
  const targets = rover.querySelectorAll('button')
  const startingPoint = targets[0]

  // take container out of the focus flow
  rover.tabIndex = -1
  // and all the children
  targets.forEach((a) => (a.tabIndex = -1))
  // except the first target, that accepts focus
  startingPoint.tabIndex = 0

  // with the roving container as the key
  // save some state and handy references
  state.set(rover, {
    targets,
    active: startingPoint,
    index: 0,
  })

  rover.addEventListener('focusin', onFocusin)
  rover.addEventListener('focusout', onFocusout)
  // watch for arrow keys
  rover.addEventListener('keydown', onKeydown)
  rover.addEventListener('keyup', onKeyup)

  mo.observe(document, {
    childList: true,
    subtree: true,
  })
})

const focusNextItem = (rover) => {
  const rx = state.get(rover)

  // increment state index
  rx.index += 1

  // clamp navigation to target bounds
  if (rx.index > rx.targets.length - 1) rx.index = rx.targets.length - 1

  // use rover index state to find next
  let next = rx.targets[rx.index]

  // found something, activate it
  next && activate(rover, next)
}

const focusPreviousItem = (rover) => {
  const rx = state.get(rover)

  // decrement from the state index
  rx.index -= 1

  // clamp to 0 and above only
  if (rx.index < 1) rx.index = 0

  // use rover index state to find next
  let prev = rx.targets[rx.index]

  // found something, activate it
  prev && activate(rover, prev)
}

const activate = (rover, item) => {
  const rx = state.get(rover)

  // remove old tab index item
  rx.active.tabIndex = -1

  // set new active item and focus it
  rx.active = item
  rx.active.tabIndex = 0
  rx.active.focus()
}

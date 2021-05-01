const events = {}
const Event = {
  on(name, fn, path) {
    if (path) name = `${name}-${path}`
    if (events[name]) {
      events[name].push(fn)
    } else {
      events[name] = [fn]
    }
  },
  off(name, path) {
    const keys = Object.keys(events).filter(item => {
      return item.split('-')[0] === name
    })
    if (!path) {
      keys.map(key => (events[key] = []))
      return
    }
    events[`${name}-${path}`] = []
  },
  emit(name, params) {
    const keys = Object.keys(events).filter(item => {
      return item.split('-')[0] === name
    })
    params = JSON.parse(JSON.stringify(params))
    keys.map(key => {
      events[key].map(fn => fn(params))
    })
  },
  get() {
    return events
  }
}
module.exports = Event

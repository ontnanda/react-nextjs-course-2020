import { observable, action, computed } from 'mobx'
import { convertSecondsToMinutes } from './utilities'
export default class PlayerStore {
  @observable
  nowPlaying = {
    id: '',
    playing: false,
    title: '',
    subTitle: '',
    progress: 0,
    image: '',
    playedSeconds: 0,
    loadedSeconds: 0,
    url: '',
  }

  @action
  play(track) {
    const { previewUrl, name, artist, image, playing, id = '' } = track
    if (!previewUrl) return

    this.nowPlaying.id = id
    this.nowPlaying.playing = playing
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
  }

  @action
  playCurrent(track) {
    const { previewUrl } = track
    if (!previewUrl) return
    this.nowPlaying = track
  }

  @observable
  playState = {
    currentPlaying: 0,
    loop: false,
    random: false,
    queue: [],
    muted: false,
    volumn: 0.8,
  }
  @action
  nextPlay() {
    if (this.nowPlaying.id === '') return
    let nextPlaying = this.playState.currentPlaying + 1
    if (nextPlaying >= this.playState.queue.length) nextPlaying = 0
    if (this.playState.loop === false && nextPlaying === 0) {
      return
    }
    this.playState.currentPlaying = nextPlaying
    let track = this.playState.queue[nextPlaying]
    track.playing = true
    this.play(track)
  }

  @action
  backPlay() {
    if (this.nowPlaying.id === '') return

    let nextPlaying = this.playState.currentPlaying - 1
    if (nextPlaying < 0) nextPlaying = this.playState.queue.length - 1
    if (
      this.playState.loop === false &&
      nextPlaying == this.playState.queue.length - 1
    ) {
      return
    }
    this.playState.currentPlaying = nextPlaying
    let track = this.playState.queue[nextPlaying]
    track.playing = true
    this.play(track)
  }

  @action
  initQueue(tracks) {
    tracks = tracks.map((v, k) => {
      v.order = k
      return v
    })
    this.playState.queue = tracks
  }
  @action
  queue(tracks) {
    let playList = []
    if (this.playState.random) {
      playList = this.shuffle(tracks)
      if (this.nowPlaying.id != '') {
        let nowPlaying = playList.filter(v => {
          return v.id === this.nowPlaying.id
        })
        playList = playList.filter(v => {
          return v.id !== this.nowPlaying.id
        })
        playList = nowPlaying.concat(playList)
      }
    } else {
      playList = tracks.sort((a, b) => (a.order > b.order ? 1 : -1))
    }
    this.playState.queue = playList
  }
  @action
  random() {
    this.playState.random = !this.playState.random
    if (this.playState.random === false) {
      for (let i in this.playState.queue) {
        if (this.playState.queue[i].id === this.nowPlaying.id) {
          this.playState.currentPlaying = this.playState.queue[i].order
          break
        }
      }
    } else {
      this.playState.currentPlaying = 0
    }
    this.queue(this.playState.queue)
  }
  @action
  loop() {
    this.playState.loop = !this.playState.loop
  }

  @observable
  progressBar = {
    loadedSecondsRaw: 0,
    playedSeconds: 0,
    loadedSeconds: 0,
    timeElapsed: 0,
    progress: 0,
  }

  @action
  updateProgress(track) {
    const { playedSeconds = 0, loadedSeconds = 0, progress = 0 } = track
    this.progressBar.playedSeconds = playedSeconds
    this.progressBar.loadedSecondsRaw = loadedSeconds
    this.progressBar.loadedSeconds = convertSecondsToMinutes(loadedSeconds)
    this.progressBar.timeElapsed = convertSecondsToMinutes(
      this.progressBar.playedSeconds,
    )
    this.progressBar.progress = parseFloat(playedSeconds / loadedSeconds)
  }

  @observable
  seekFunction = {}

  @action
  seek(seekFunction) {
    this.seekFunction = seekFunction
  }

  @action
  playAll() {
    this.playState.currentPlaing = 0
    console.log('Play All')
  }

  @action
  muted() {
    this.playState.muted = !this.playState.muted
  }

  @action
  adjustSoundLevel(volumn) {
    this.playState.volumn = volumn
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
}

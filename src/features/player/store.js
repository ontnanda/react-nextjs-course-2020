import { observable, action, computed } from 'mobx'
import { convertSecondsToMinutes } from './utilities'
export default class PlayerStore {
  @observable
  nowPlaying = {
    id: '',
    playing: false,
    title: '',
    subTitle: '',
    progress: 0.0,
    image: '',
    playedSeconds: 0.0,
    loadedSeconds: 0.0,
    url: '',
  }

  @action
  play(track) {
    const {
      previewUrl,
      name,
      artist,
      image,
      playing,
      playedSeconds = 0,
      loadedSeconds = 0,
      id = '',
    } = track
    if (!previewUrl) return
    this.nowPlaying.id = id
    this.nowPlaying.playing = playing
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    this.nowPlaying.playedSeconds = playedSeconds
    this.nowPlaying.loadedSeconds = convertSecondsToMinutes(loadedSeconds)
    this.nowPlaying.timeElapsed = convertSecondsToMinutes(
      this.nowPlaying.playedSeconds,
    )
    this.nowPlaying.progress = parseFloat(playedSeconds / loadedSeconds)
  }

  @action
  reset() {
    const url = this.nowPlaying.url
    this.nowPlaying.url = this.nowPlaying.url + '#'
    this.nowPlaying.playedSeconds = 0
    this.nowPlaying.loadedSeconds = 0
    this.nowPlaying.timeElapsed = 0
    this.nowPlaying.progress = 0

    this.tempUrl = url
  }
}

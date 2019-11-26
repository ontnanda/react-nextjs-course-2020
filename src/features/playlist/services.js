import * as API from './repository'

export function getPlaylistById(id, { token }) {
  return API.getPlaylistById(id, { token }).then(response => {
    let playListDetail = {
      title: response.name,
      subTitle: response.description,
      bottomLine: `${response.tracks.items.length} Tracks`,
      image: response.images[0].url,
      tracks: [],
    }
    playListDetail.tracks = response.tracks.items.map(item => {
      return {
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: 'name' in item.track.album ? item.track.album.name : '',
        image:
          'images' in item.track.album
            ? item.track.album.images[0].url
            : response.images[0].url,
        previewUrl: item.track.preview_url,
        durationMs: item.track.duration_ms,
      }
    })
    return playListDetail
  })
}

export function getMyPlaylist({ token }) {
  return API.getMyPlaylist({ token })
}

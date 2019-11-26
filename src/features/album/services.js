import * as API from './repository'

export function getNewReleases({ token, limit }) {
  return API.getNewReleases({ token, limit })
}

export function getAlbumById(id, { token, page }) {
  return API.getAlbumById(id, { token, page }).then(data => {
    let alabumDetail
    if (page == 'alabumDetail') {
      alabumDetail = {
        title: data.name,
        subTitle: data.artists[0].name,
        bottomLine: `${data.copyrights[0].text} • ${data.tracks.items.length} Tracks`,
        image: data.images[0].url,
        tracks: data.tracks.items.map(value => {
          value.artist = value.artists[0].name
          value.album = value.album ? value.album : value.artists[0].name
          value.durationMs = value.duration_ms
          value.image = data.images[0].url
          value.previewUrl = value.preview_url
          return value
        }),
      }
    } else {
    }
    return alabumDetail
  })
}

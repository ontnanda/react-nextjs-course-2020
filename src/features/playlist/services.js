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
    playListDetail.tracks = response.tracks.items
      .filter(value => {
        return value.preview_url !== null
      })
      .map(item => {
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

export function getSearchResult({ token, limit = 10, q = '' }) {
  return API.getSearchResult({ token, limit, q }).then(response => {
    let r = {}

    r.albums = response.albums.items.map(item => {
      return {
        id: item.id,
        name: item.name,
        images: [
          {
            url: item.images[0].url,
          },
        ],
      }
    })
    r.playlists = response.playlists.items.map(item => {
      return {
        id: item.id,
        name: item.name,
        images: [
          {
            url: item.images[0].url,
          },
        ],
      }
    })
    return r
  })
}

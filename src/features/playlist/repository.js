import { fetchAPI } from '@lib/api'

export function getPlaylistById(id, { token }) {
  return fetchAPI({
    path: `/playlists/${id}`,
    token,
  })
}

export function getMyPlaylist({ token }) {
  return fetchAPI({
    path: `/me/playlists`,
    token,
  })
}

export function getSearchResult({ token, limit = 18, q = '' } = {}) {
  return fetchAPI({
    path: '/search/',
    token,
    params: {
      q,
      limit,
      type: 'album,playlist',
    },
  })
}
